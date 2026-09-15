export const CTA = () => {
  return (
    <section className="absolute top-[200vh] left-0 w-full min-h-screen flex items-center px-4 z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight">
          Ready To{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-cyan-500">
            Ace
          </span>{" "}
          Your Next Interview?
        </h2>
        <p className="text-white/60 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 max-w-xs sm:max-w-xl mx-auto">
          Join thousands of users practicing smarter, inclusive interviews —
          built for everyone.
        </p>
        <button className="cursor-pointer mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-medium hover:bg-cyan-400/20 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
          Get Started Free
        </button>
      </div>
    </section>
  );
};
