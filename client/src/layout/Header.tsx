import logo from "../assets/logo.png";

export const Header = () => {
  return (
    <header className="absolute top-4 sm:top-6 left-0 w-full flex justify-center px-3 sm:px-4 z-50">
      <div className="w-full max-w-6xl flex items-center justify-between px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Interview Platform"
            className="h-6 sm:h-8 w-auto"
          />
          <h1 className="text-white text-base sm:text-xl font-semibold tracking-tight">
            Interview{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-cyan-500">
              Platform
            </span>
          </h1>
        </div>
        <button className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-medium hover:bg-cyan-400/20 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
          Login
        </button>
      </div>
    </header>
  );
};
