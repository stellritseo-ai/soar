import { useEffect, useState, useRef } from "react";
import heroVideo from "@/assets/hero.mp4";

// Interactive Count-Up component with viewport intersection triggers
function Counter({ end, duration = 1500, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animationStarted.current) {
          animationStarted.current = true;
          let startTime: number | null = null;
          let animationFrameId: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  // Premium formatting for larger values (e.g. 1000 -> 1k)
  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(0)}k`;
    }
    return val.toString();
  };

  return (
    <span ref={elementRef}>
      {formatValue(count)}
      {suffix}
    </span>
  );
}

const stats = [
  { end: 100, suffix: "", label: "Women Target" },
  { end: 3, suffix: "", label: "States Expanding" },
  { end: 1000, suffix: "+", label: "Lives Impacted" },
  { end: 25, suffix: "+", label: "Community Partners" },
];

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-[#0B1220]">
      {/* Background Video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-45"
      />
      {/* Background Gradient & Premium Color Blurs */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/80 via-[#0B1220]/60 to-[#0B1220]/85 pointer-events-none" />
      <div className="absolute -left-40 top-10 size-96 rounded-full bg-[#5E2B97]/25 blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 bottom-10 size-96 rounded-full bg-[#D4AF37]/15 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 text-white lg:px-10 z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm shadow-soft">
            Our Impact
          </span>
          <h2 className="mt-6 font-display text-[28px] sm:text-[34px] md:text-4xl lg:text-5xl leading-tight font-bold">
            A movement <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] font-extrabold">measured in lives changed</span>.
          </h2>
        </div>

        {/* Impact Cards Grid (Unified 10px rounded styling) */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-[10px] border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10 hover:shadow-elegant"
            >
              {/* Premium hover gradient glow */}
              <div className="absolute -right-16 -top-16 size-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5E2B97] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Metric value with hover pop and smooth count-up trigger */}
                <div className="font-display text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] transition-transform duration-300 group-hover:scale-105 inline-block">
                  <Counter end={s.end} suffix={s.suffix} />
                </div>
                
                {/* Label */}
                <div className="mt-3 text-[11px] font-bold uppercase tracking-widest text-white/70">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}


