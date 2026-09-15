import { Sparkles, HandMetal, Zap, Repeat } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Mock Interviews",
      desc: "Practice with realistic AI-driven interview simulations tailored to your role.",
    },
    {
      icon: HandMetal,
      title: "Real-Time Sign Language Support",
      desc: "Built-in sign language recognition so deaf and mute users can interview naturally.",
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      desc: "Get detailed analysis on your answers, tone, and body language right after each session.",
    },
    {
      icon: Repeat,
      title: "Practice At Your Own Pace",
      desc: "No pressure, no judgment — repeat sessions until you feel fully confident.",
    },
  ];

  return (
    <section className="absolute top-[100vh] left-0 w-full min-h-screen flex items-center px-4 z-10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-cyan-300 text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase">
          How It Works
        </p>
        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight mt-2 sm:mt-3">
          Everything You Need To{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-cyan-500">
            Succeed
          </span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-6 text-left hover:border-cyan-400/40 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-2 sm:mb-4 group-hover:bg-cyan-400/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>
                <h3 className="text-white text-sm sm:text-lg font-semibold">
                  {f.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-1 sm:mt-2">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
