import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;
const BATCH_SIZE = 15;
const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

const getFramePath = (index: number) => {
  const num = index.toString().padStart(3, "0");
  return `/frames/frame_${num}.jpg`;
};

export const ScrollFrame = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const img = imagesRef.current[index - 1];
    if (img && context && canvas && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    const loadBatch = (startIndex: number) => {
      const end = Math.min(startIndex + BATCH_SIZE, FRAME_COUNT);
      let batchLoaded = 0;
      const batchCount = end - startIndex;

      for (let i = startIndex + 1; i <= end; i++) {
        const img = new Image();
        img.src = getFramePath(i);

        const onDone = () => {
          if (i === 1) drawFrame(1);
          batchLoaded++;
          if (batchLoaded === batchCount) {
            if (startIndex === 0) setLoaded(true);
            if (end < FRAME_COUNT) loadBatch(end);
          }
        };

        img.onload = onDone;
        img.onerror = onDone;

        images[i - 1] = img;
      }
    };

    loadBatch(0);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const wrapper = wrapperRef.current;
    const pinEl = pinRef.current;
    if (!wrapper || !pinEl) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());
    window.scrollTo(0, 0);

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      pin: pinEl,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (FRAME_COUNT - 1)) + 1;
        drawFrame(frame);
      },
    });

    const id = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(id);
      trigger.kill();
    };
  }, [loaded]);

  return (
    <div ref={wrapperRef} className="relative h-[700vh] bg-black">
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
