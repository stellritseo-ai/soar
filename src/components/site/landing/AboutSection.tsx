import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import pFamily from "@/assets/program-family.jpg";

export function AboutSection() {
  return (
    <section className="relative py-[60px] overflow-hidden bg-background">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#5E2B97]/10 to-[#D4AF37]/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10 relative z-10">
        
        {/* Left Side: Image Container with Gold Border Accent */}
        <div className="relative">
          {/* Subtle colored glow behind container */}
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#5E2B97]/5 to-transparent blur-2xl z-0" />
          
          {/* Framed Image Container */}
          <div className="relative border border-border/80 bg-background/50 backdrop-blur-md p-3 rounded-[36px] shadow-elegant overflow-hidden z-10">
            <div className="overflow-hidden rounded-[26px]">
              <img
                src={pFamily}
                alt="A circle of women in warm sunset light"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[1/1] size-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Floating glass badge */}
          <div className="bg-background/80 backdrop-blur-xl border border-border/60 shadow-elegant rounded-2xl p-5 w-64 absolute -bottom-6 -right-6 hidden md:block z-20 transition-transform duration-300 hover:scale-[1.03]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Est. 2014</span>
            </div>
            <div className="mt-2 font-display text-lg font-semibold text-[#3A0A63] leading-snug">
              A sisterhood built to rise together.
            </div>
          </div>
        </div>

        {/* Right Side: Copywriting Content */}
        <div className="flex flex-col justify-center">
          <span className="self-start inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5E2B97]">
            Who We Are
          </span>
          
          <h2 className="mt-6 font-display text-[26px] sm:text-[32px] md:text-4xl lg:text-5xl leading-tight text-foreground font-bold">
            Turning adversity into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] font-extrabold">opportunity</span>.
          </h2>
          
          <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground font-medium">
            SOAR — Sisters Of Adversity Rise — exists so no woman has to walk her hardest road alone.
            We build a bridge from survival to sovereignty through education, mentorship, and a real
            path to homeownership.
          </p>

          {/* Mission and Vision Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            
            {/* Mission Card */}
            <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#D4AF37]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">Our Mission</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Empowering women to rediscover their dreams through education, mentorship, and pathways to homeownership.
              </p>
            </div>

            {/* Vision Card */}
            <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#5E2B97]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#5E2B97]">Our Vision</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A world where every woman has access to safe housing, opportunity, dignity, and the resources to thrive.
              </p>
            </div>
            
          </div>

          <Link
            to="/our-story"
            className="group mt-9 self-start inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5E2B97] to-[#481E7A] text-white font-bold px-8 py-3.5 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            Discover our story 
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>


        </div>
      </div>
    </section>
  );
}

