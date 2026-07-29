import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Lock,
  User,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  Sparkles,
  KeyRound,
  AlertTriangle
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { verifyAdminLoginFn, getAdminLockoutStatusFn } from "@/lib/cms";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Admin Portal Sign In — SOAR Global Foundation Inc." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function safePath(p: string | undefined): string {
  if (!p) return "/dashboard";
  try {
    const url = new URL(p, "http://x");
    return url.pathname + url.search;
  } catch {
    return "/dashboard";
  }
}

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLocked, setIsLocked] = useState(false);
  const [lockoutSecs, setLockoutSecs] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  // Check initial authentication and rate-limit lockout status
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true") {
      navigate({ to: safePath(redirect), replace: true });
      return;
    }

    async function checkLockout() {
      try {
        const res = await getAdminLockoutStatusFn();
        if (res.locked) {
          setIsLocked(true);
          setLockoutSecs(res.remainingSeconds || 3600);
          setError(`SECURITY LOCKOUT: Account is locked due to 3 failed attempts. Try again in ${res.remainingMinutes} minute(s).`);
        } else {
          setIsLocked(false);
          setRemainingAttempts(res.remainingAttempts ?? 3);
        }
      } catch (err) {
        // Safe fallback
      }
    }
    checkLockout();
  }, [navigate, redirect]);

  // Live lockout countdown timer
  useEffect(() => {
    if (!isLocked || lockoutSecs <= 0) return;
    const timer = setInterval(() => {
      setLockoutSecs((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          setError(null);
          setRemainingAttempts(3);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked, lockoutSecs]);

  const formatLockoutTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isLocked) return;

    setBusy(true);
    setError(null);

    try {
      const res = await verifyAdminLoginFn({ data: { username, password } });

      if (res.success) {
        localStorage.setItem("admin_auth", "true");
        if (typeof document !== "undefined") {
          document.cookie = "admin_auth=true; path=/; max-age=86400; SameSite=Strict";
        }
        navigate({ to: safePath(redirect), replace: true });
      } else {
        if (res.locked) {
          setIsLocked(true);
          setLockoutSecs((res.remainingMinutes || 60) * 60);
        }
        if (res.remainingAttempts !== undefined) {
          setRemainingAttempts(res.remainingAttempts);
        }
        setError(res.error || "Invalid username or password");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong during verification.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center bg-[#080214] text-white px-6 py-12 overflow-hidden selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Background Ambient Glow Spheres & Lighting Grid */}
      <div className="absolute top-[-10%] left-[-10%] size-[600px] rounded-full bg-[#5E2B97]/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] size-[600px] rounded-full bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Container Deck */}
      <div className="relative z-10 w-full max-w-md space-y-8 animate-fade-in">
        
        {/* Brand Crest Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] opacity-80 blur-xs group-hover:opacity-100 transition" />
              <img src={logoImg} alt="SOAR Logo" className="relative h-12 w-auto object-contain rounded-xl" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-display text-2xl font-extrabold tracking-tight text-white">SOAR Global</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mt-1">Management Portal</span>
            </div>
          </Link>
        </div>

        {/* Auth Glassmorphism Card */}
        <div className="rounded-[32px] border border-[#D4AF37]/30 bg-[#120526]/85 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden space-y-6">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />

          {/* Card Header Title */}
          <div className="space-y-1.5 border-b border-white/10 pb-5">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">
                Admin Sign In
              </h1>
              {isLocked ? (
                <span className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Lock className="size-3" /> Account Locked
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="size-3" /> SSL Secured
                </span>
              )}
            </div>
            <p className="text-xs text-white/60">
              Enter your authorized credentials to access the foundation dashboard.
            </p>
          </div>

          {/* Lockout Security Warning Banner */}
          {isLocked && (
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-red-400 text-sm">
                <ShieldAlert className="size-5 shrink-0 text-red-400" />
                1-Hour Security Lockout Active
              </div>
              <p className="text-white/80 text-[11px] leading-relaxed">
                Account access has been suspended due to 3 consecutive failed login attempts.
              </p>
              <div className="p-2.5 rounded-xl bg-black/40 border border-red-500/20 flex items-center justify-between font-mono text-xs">
                <span className="text-white/60">Unlock In:</span>
                <span className="font-extrabold text-red-400 text-sm">{formatLockoutTimer(lockoutSecs)}</span>
              </div>
            </div>
          )}

          {/* Error Callout Banner */}
          {!isLocked && error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
              <AlertTriangle className="size-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username or Email Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Username or Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 size-4 text-[#D4AF37]" />
                <input
                  type="text"
                  required
                  disabled={isLocked || busy}
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or shoutgospelworship@gmail.com"
                  className="w-full rounded-xl border border-white/15 bg-black/50 pl-10 pr-4 py-3 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 disabled:opacity-50 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80">
                  Password
                </label>
                {remainingAttempts !== null && !isLocked && (
                  <span className="text-[10px] text-amber-400 font-semibold">
                    {remainingAttempts} / 3 Attempts Left
                  </span>
                )}
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 size-4 text-[#D4AF37]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLocked || busy}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-black/50 pl-10 pr-12 py-3 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 disabled:opacity-50 transition font-mono"
                />
                <button
                  type="button"
                  disabled={isLocked || busy}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition disabled:opacity-50"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLocked || busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] py-3.5 text-xs font-black uppercase tracking-wider text-[#0C1220] shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Authenticating...
                </>
              ) : isLocked ? (
                <>
                  <Lock className="size-4" /> Account Locked (1-Hour Rate Limit)
                </>
              ) : (
                <>
                  <Shield className="size-4" /> Sign In to Portal
                </>
              )}
            </button>
          </form>

          {/* Security Notice Footer */}
          <div className="pt-2 text-center text-[10px] text-white/40 space-y-1">
            <p className="flex items-center justify-center gap-1">
              <Lock className="size-3 text-[#D4AF37]" /> Protected by SOAR Rate-Limit & Database Security
            </p>
            <p>3 failed attempts will trigger a 60-minute automated account lockout.</p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-[#D4AF37] transition"
          >
            <ArrowLeft className="size-3.5" /> Return to Main Website
          </Link>
        </div>

      </div>
    </div>
  );
}
