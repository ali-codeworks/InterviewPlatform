import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";

export const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !password) {
      setError("Fill in all fields to continue.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    // No API call — dummy submit only.
    console.log("Register submitted:", {
      firstName,
      lastName,
      email,
      password,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/verify-otp", { state: { email } });
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
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
            Sign in
          </Link>
        </p>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-4xl items-center gap-12 lg:grid-cols-2">
          {/* Left: framing copy, hidden on small screens */}
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-cyan-400">Get started</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Create your account.
            </h1>
            <p className="mt-4 max-w-sm text-slate-400">
              Set up your profile to start practicing AI-driven mock interviews
              built for your role.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <p className="text-sm text-slate-400">
                  Realistic, role-specific interview simulations.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <p className="text-sm text-slate-400">
                  Built-in sign language support for deaf and mute users.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <p className="text-sm text-slate-400">
                  Instant feedback on your answers, tone, and body language.
                </p>
              </div>
            </div>
          </div>

          {/* Right: register card */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/3 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold">Create account</h2>
              <p className="mt-1 text-sm text-slate-400">
                Fill in your details to get started.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* First name + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-sm text-slate-300"
                    >
                      First name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        autoComplete="given-name"
                        className="w-full rounded-lg border border-white/10 bg-black/30 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 [&:-webkit-autofill]:shadow-[0_0_0_1000px_rgba(2,6,15,0.9)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:caret-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-sm text-slate-300"
                    >
                      Last name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        autoComplete="family-name"
                        className="w-full rounded-lg border border-white/10 bg-black/30 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 [&:-webkit-autofill]:shadow-[0_0_0_1000px_rgba(2,6,15,0.9)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:caret-white"
                      />
                    </div>
                  </div>
                </div>

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

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm text-slate-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-white/10 bg-black/30 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40 [&:-webkit-autofill]:shadow-[0_0_0_1000px_rgba(2,6,15,0.9)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:caret-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
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
                  {isSubmitting ? "Creating account..." : "Create account"}
                  {!isSubmitting && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400 lg:hidden">
                Already have an account?{" "}
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
