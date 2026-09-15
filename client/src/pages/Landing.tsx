import { Hero } from "../components/block/Hero";
import { ScrollFrame } from "../components/block/ScrollFrame";
import { Features } from "../components/block/Features";
import { CTA } from "../components/block/CTA";

export const Landing = () => {
  return (
    <div className="relative">
      <ScrollFrame />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
};
