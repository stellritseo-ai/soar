import { Quote, Star } from "lucide-react";
import storyImg from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";

const stories = [
  {
    name: "Amara J.",
    where: "Atlanta, GA",
    quote:
      "SOAR walked with me from a shelter to my very own front door. I finally have a home for my daughters — and a future.",
    img: storyImg,
  },
  {
    name: "Isabela R.",
    where: "Orlando, FL",
    quote:
      "The mentorship changed everything. I launched my business, rebuilt my credit, and I'm about to close on my first house.",
    img: story2,
  },
  {
    name: "Denise M.",
    where: "Charlotte, NC",
    quote:
      "I dreamed again for the first time in years. SOAR gave me tools, sisters, and hope I can pass down.",
    img: story3,
  },
];

export function StoriesSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute bottom-[20%] left-[-10%] w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-[#5E2B97]/5 to-[#D4AF37]/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5E2B97]">
            Success Stories
          </span>
          <h2 className="mt-[10px] -mb-[15px] font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-foreground font-extrabold capitalize">
            The women who <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] font-extrabold">rose</span>.
          </h2>
        </div>

        {/* Stories Cards Grid (Unified 10px rounded design system) */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {stories.map((s) => (
            <figure
              key={s.name}
              className="group relative overflow-hidden rounded-[10px] border border-border/70 bg-card/70 backdrop-blur-sm shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-elegant flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden border-b border-border/40">

                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  width={1000}
                  height={1200}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Details */}
              <figcaption className="p-7 flex flex-col flex-grow">
                <Quote className="size-6 text-[#D4AF37] opacity-80 shrink-0" />
                
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground font-medium flex-grow">
                  "{s.quote}"
                </p>
                
                <div className="mt-6 flex items-end justify-between border-t border-border/40 pt-5 shrink-0">
                  <div>
                    <div className="font-display text-lg font-bold text-[#3A0A63] transition-colors duration-300 group-hover:text-[#5E2B97]">
                      {s.name}
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mt-0.5">
                      {s.where}
                    </div>
                  </div>


                  
                  {/* Luxury Star Rating */}
                  <div className="flex gap-0.5 text-[#D4AF37]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        
      </div>
    </section>
  );
}

