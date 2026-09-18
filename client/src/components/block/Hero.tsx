import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
      <p className="text-cyan-300 text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase">
        Practice smarter, perform better.
      </p>
      <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-tight mt-3">
        Ace Your Next{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-cyan-500">
          Interview
        </span>
      </h1>
      <p className="text-white/60 text-xs sm:text-sm md:text-base mt-4 max-w-xs sm:max-w-md">
        Inclusive mock interviews built for everyone — including deaf and mute
        users.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="pointer-events-auto cursor-pointer mt-6 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-medium hover:bg-cyan-400/20 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
      >
        Get Started
      </button>
    </section>
  );
};
