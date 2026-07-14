import { Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import footerLogo from "@/assets/footer-logo.png";

export function DonateCTASection() {
  return (
    <section className="relative py-0 bg-background overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#5E2B97]/10 to-[#D4AF37]/5 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-11xl px-6 lg:px-10 z-10">

        {/* Double-bordered Luxury Gold Poster Frame */}
        <div className="relative overflow-hidden rounded-[10px] border-2 border-[#D4AF37]/80 p-1 bg-[#120224] shadow-elegant">
          <div className="relative overflow-hidden rounded-[8px] border border-[#D4AF37]/30 bg-gradient-to-b from-[#1E043B] via-[#120224] to-[#0A0115] py-16 px-8 md:py-20 md:px-16 flex flex-col items-center justify-center">
            
            {/* SVG Cascading Hanging Lights / Beaded Strings (Flyer Style) */}
            <svg className="absolute top-0 inset-x-0 h-40 w-full text-[#D4AF37]/30 pointer-events-none z-0" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 200">
              <line x1="80" y1="0" x2="80" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="80" cy="120" r="3" fill="#D4AF37" className="animate-pulse" />
              
              <line x1="200" y1="0" x2="200" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="200" cy="70" r="2.5" fill="#D4AF37" />

              <line x1="380" y1="0" x2="380" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="380" cy="150" r="3" fill="#D4AF37" className="animate-pulse" />

              <line x1="520" y1="0" x2="520" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="520" cy="90" r="2.5" fill="#D4AF37" />

              <line x1="680" y1="0" x2="680" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="680" cy="130" r="3" fill="#D4AF37" className="animate-pulse" />

              <line x1="820" y1="0" x2="820" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="820" cy="60" r="2" fill="#D4AF37" />

              <line x1="980" y1="0" x2="980" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="980" cy="160" r="3" fill="#D4AF37" className="animate-pulse" />

              <line x1="1120" y1="0" x2="1120" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="1120" cy="110" r="2.5" fill="#D4AF37" />
            </svg>

            {/* Glowing crystal heart back blur */}
            <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#5E2B97]/25 blur-[50px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              {/* Logo Badge */}
              <div className="flex justify-center mb-6 animate-float-slow">
                <img
                  src={footerLogo}
                  alt="SOAR Global Foundation"
                  className="h-24 w-auto object-contain mx-auto drop-shadow-[0_4px_24px_rgba(212,175,55,0.25)]"
                />
              </div>

              {/* Headline */}
              <h2 className="font-display text-4xl leading-tight md:text-5xl font-bold tracking-tight text-white">
                Help a Woman <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] font-extrabold">Dream Again</span>.
              </h2>

              {/* Description Copy */}
              <p className="mx-auto mt-6 max-w-2xl text-[16px] md:text-lg text-white/80 leading-relaxed font-medium">
                Your gift plants a seed of possibility — a workshop attended, a mentor met, a key placed in
                her hand. Let's build a bridge from survival to sovereignty.
              </p>

              {/* Buttons Capsules */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/donate"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-bold px-8 py-4 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97]"
                >
                  <Heart className="size-4 fill-current text-[#0C1220]/75" />
                  Donate Now
                </Link>
                <Link
                  to="/partners"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition duration-200 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.97]"
                >
                  Become a Sponsor
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

