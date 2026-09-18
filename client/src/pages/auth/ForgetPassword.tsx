import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  BrainCircuit,
  KeyRound,
} from "lucide-react";

export const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Enter your email to continue.");
      return;
    }

    setIsSubmitting(true);

    // No API call — dummy submit only.
    console.log("Forget password submitted:", { email });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/reset-password", { state: { email } });
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080c14] text-white">
      {/* Ambient background glow, consistent with landing page */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-105 w-105 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-95 w-95 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.035)_1px,transparent_0)] bg-size-[32px_32px]" />
      </div>

      {/* Top brand bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link to="/" className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-cyan-400" />
          <span className="text-lg font-semibold tracking-tight">
            Interview <span className="text-cyan-400">Platform</span>
          </span>
        </Link>
        <p className="hidden text-sm text-slate-400 sm:block">
          Remembered it?{" "}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
            Sign in
          </Link>
        </p>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-10">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10">
              <KeyRound className="h-5 w-5 text-cyan-400" />
            </div>

            <h2 className="mt-5 text-2xl font-semibold">Forgot password?</h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter the email linked to your account and we'll send you a code
              to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm text-slate-300"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-lg border border-white/10 bg-black/30 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 [&:-webkit-autofill]:shadow-[0_0_0_1000px_rgba(2,6,15,0.9)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:caret-white"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer group flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-2.5 text-sm font-semibold text-[#062028] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send reset code"}
                {!isSubmitting && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </form>

            <Link
              to="/login"
              className="mt-6 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
