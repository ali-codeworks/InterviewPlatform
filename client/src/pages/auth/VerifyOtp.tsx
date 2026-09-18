import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, BrainCircuit, MailCheck } from "lucide-react";

const OTP_LENGTH = 6;

export const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setIsResending(true);

    // No API call — dummy resend only.
    console.log("Resend OTP requested:", { email });

    setTimeout(() => setIsResending(false), 800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Enter the full 6-digit code.");
      return;
    }

    setIsSubmitting(true);

    // No API call — dummy submit only.
    console.log("Verify OTP submitted:", { email, otp: code });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard");
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
          Wrong email?{" "}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300">
            Go back
          </Link>
        </p>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-10">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10">
              <MailCheck className="h-5 w-5 text-cyan-400" />
            </div>

            <h2 className="mt-5 text-2xl font-semibold">Verify your email</h2>
            <p className="mt-1 text-sm text-slate-400">
              We sent a 6-digit code to{" "}
              <span className="text-slate-200">{email || "your email"}</span>.
              Enter it below to activate your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* OTP boxes */}
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-12 w-11 rounded-lg border border-white/10 bg-black/30 text-center text-lg font-semibold text-white outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40"
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 py-2.5 text-sm font-semibold text-[#062028] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Verifying..." : "Verify account"}
                {!isSubmitting && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Didn't get a code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-cyan-400 hover:text-cyan-300 disabled:opacity-60"
              >
                {isResending ? "Resending..." : "Resend code"}
              </button>
            </p>

            <Link
              to="/login"
              className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-300"
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
