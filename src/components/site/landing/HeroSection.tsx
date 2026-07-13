import { Link } from "@tanstack/react-router";
import heroVideo from "@/assets/hero.mp4";

const stats = [
  { value: "100+", label: "Women Empowered" },
  { value: "25+", label: "Community Partners" },
  { value: "5", label: "Core Programs" },
  { value: "100%", label: "Hope Driven" },
];

export function HeroSection() {

  // Helper to dynamically inject premium gradient styling into key phrases
  const formatHeadline = (text: string) => {
    if (text.toLowerCase().includes("dream again")) {
      const parts = text.split(/dream again/i);
      return (
        <>
          {parts[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)] font-extrabold">
            Dream Again
          </span>
          {parts[1]}
        </>
      );
    }
    if (text.toLowerCase().includes("one life at a time")) {
      const parts = text.split(/one life at a time/i);
      return (
        <>
          {parts[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)] font-extrabold">
            one life at a time
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      {/* Background Video with Dark Overlays */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
      <div className="absolute inset-0 bg-[#0B1220]/15 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/70 z-0" />

      <div className="relative mx-auto max-w-5xl w-full px-6 lg:px-10 z-10 flex flex-col items-center text-center pt-40 sm:pt-52 md:pt-64 lg:pt-[285px]">
        {/* Top Live Pill Badge with Pulsing Status Indicator */}
        <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full py-1.5 px-4 text-xs text-white/90 hover:bg-black/65 transition-all duration-300 hover:shadow-glow/10 cursor-pointer mb-[10px] animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span>Now live –</span>
          <span className="text-[#D4AF37] font-semibold">A future where everyone can soar</span>
          <span className="text-white/50 text-[10px] ml-0.5">&gt;</span>
        </div>

        {/* Centered Heading */}
        <h1 className="font-sans font-bold text-[28px] sm:text-[34px] md:text-[40px] text-white tracking-tight leading-tight max-w-4xl animate-fade-up mb-[-20px] capitalize">
          {formatHeadline("Empowering Women to Dream Again.")}
        </h1>

        {/* Centered Subheadline */}
        <p className="mt-6 text-sm sm:text-base lg:text-lg text-white max-w-3xl leading-relaxed font-medium animate-fade-up px-2">
          SOAR Global Foundation Inc. helps women overcome adversity through education, mentorship, financial literacy, family support, and pathways to homeownership.
        </p>

        {/* Buttons side-by-side */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-fade-up">
          <Link
            to="#"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full gradient-brand text-white font-bold px-7 py-3.5 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            Donate Now
          </Link>
          <Link
            to="#"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full gradient-gold text-[#0C1220] font-bold px-7 py-3.5 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>

      {/* Full-width Stats row spanning bottom (Infinite Marquee layout with premium Glass Cards) */}
      <div className="mt-[33px] pt-8 border-t border-white/10 w-full relative overflow-hidden z-10">
        {/* Edge fading masks for premium visual effect */}
        <div className="absolute left-0 top-8 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-8 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-12">
          {/* First copy */}
          <div className="flex gap-12 shrink-0">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-[5px] px-6 py-3.5 shadow-elegant shrink-0">
                <span className="font-sans font-extrabold text-2xl text-[#D4AF37] tracking-tight">{s.value}</span>
                <div className="w-[1px] h-6 bg-white/15" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{s.label}</span>
              </div>
            ))}
          </div>
          {/* Second copy for seamless looping */}
          <div className="flex gap-12 shrink-0" aria-hidden="true">
            {stats.map((s) => (
              <div key={s.label + "-dup"} className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-[5px] px-6 py-3.5 shadow-elegant shrink-0">
                <span className="font-sans font-extrabold text-2xl text-[#D4AF37] tracking-tight">{s.value}</span>
                <div className="w-[1px] h-6 bg-white/15" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
