import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import pFinancial from "@/assets/program-financial.jpg";
import pHome from "@/assets/program-home.jpg";
import pMentor from "@/assets/program-mentor.jpg";
import pFamily from "@/assets/program-family.jpg";

const programs = [
  {
    title: "Financial Literacy Workshops",
    copy: "Budgeting, credit, and wealth-building for real life.",
    img: pFinancial,
    tag: "Education",
  },
  {
    title: "Homeownership Education",
    copy: "From first savings to signed keys — a guided path.",
    img: pHome,
    tag: "Housing",
  },
  {
    title: "Mentorship Program",
    copy: "One-to-one guidance from women who have been there.",
    img: pMentor,
    tag: "Support",
  },
  {
    title: "Family Support Services",
    copy: "Wraparound care for mothers, children, and families.",
    img: pFamily,
    tag: "Community",
  },
];

export function ProgramsSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-[30%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#D4AF37]/5 to-[#5E2B97]/5 blur-[70px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5E2B97]">
              Core Programs
            </span>
            <h2 className="mt-[10px] -mb-[20px] font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-foreground font-extrabold capitalize">
              Real programs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] font-extrabold">Real transformation.</span>
            </h2>
          </div>
          <Link 
            to="/programs" 
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5E2B97] to-[#481E7A] text-white font-bold px-8 py-3.5 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            View all programs 
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* Programs Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {programs.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-[10px] border border-border/70 bg-card/70 backdrop-blur-sm shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-elegant flex flex-col h-full"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border/40">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 via-transparent to-transparent opacity-60 transition-opacity duration-500" />
                
                {/* Category Pill Tag */}
                <span className="absolute left-5 top-5 rounded-full bg-white/90 backdrop-blur border border-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#5E2B97] shadow-soft">
                  {p.tag}
                </span>
              </div>
              
              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-display text-2xl font-bold text-[#3A0A63] transition-colors duration-300 group-hover:text-[#5E2B97]">
                  {p.title}
                </h3>
                
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground font-medium flex-grow">
                  {p.copy}
                </p>
                
                <Link
                  to="/programs"
                  className="group/btn mt-6 self-start inline-flex items-center gap-1 text-sm font-bold text-[#5E2B97] hover:text-[#3A0A63] transition duration-200"
                >
                  Learn more 
                  <ChevronRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>


        
      </div>
    </section>
  );
}

