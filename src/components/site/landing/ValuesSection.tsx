import { Link } from "@tanstack/react-router";
import { Sparkles, GraduationCap, Home, Wallet, HeartHandshake, Users } from "lucide-react";
import imgEmpowerment from "@/assets/value-empowerment.png";
import imgEducation from "@/assets/value-education.png";
import imgHousing from "@/assets/value-housing.png";
import imgFinance from "@/assets/value-finance.png";
import imgMentorship from "@/assets/value-mentorship.png";
import imgCommunity from "@/assets/value-community.png";

const values = [
  {
    icon: Sparkles,
    image: imgEmpowerment,
    title: "Empowerment",
    copy: "Unlocking confidence, agency, and lasting personal power by equipping women with the resources, voice, and self-belief to overcome life's greatest adversities and lead their communities."
  },
  {
    icon: GraduationCap,
    image: imgEducation,
    title: "Education",
    copy: "Providing practical knowledge, skills, and vocational training that builds long-term economic independence, opens doors to new careers, and breaks generational cycles."
  },
  {
    icon: Home,
    image: imgHousing,
    title: "Affordable Housing",
    copy: "Creating clear, realistic pathways to safe, dignified, and permanent homeownership, helping families establish stability, build equity, and anchor their futures."
  },
  {
    icon: Wallet,
    image: imgFinance,
    title: "Financial Literacy",
    copy: "Practical money mastery classes covering budgeting, saving, credit building, and investing, designed to foster economic sovereignty and create generational wealth."
  },
  {
    icon: HeartHandshake,
    image: imgMentorship,
    title: "Mentorship",
    copy: "Establishing real, lifelong relationships and support networks that guide women through their personal development, career goals, and home buying journeys."
  },
  {
    icon: Users,
    image: imgCommunity,
    title: "Community",
    copy: "Fostering a supportive sisterhood and supportive ecosystem that rises together, sharing experiences, celebrating successes, and lifting one another up every single day."
  }
];


export function ValuesSection() {
  return (
    <section className="relative py-[60px] bg-background">

      {/* Soft gradient backgrounds contained to prevent horizontal scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 gradient-soft opacity-70" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-[#D4AF37]/5 to-[#5E2B97]/5 blur-[90px]" />
      </div>


      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white/80 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5E2B97] backdrop-blur-sm">
            Why SOAR
          </span>
          <h2 className="mt-[9px] font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-foreground font-extrabold">
            Six Pillars. One <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] font-extrabold">Rising</span> Sisterhood.
          </h2>
          <p className="mt-0 text-[17px] text-muted-foreground font-medium max-w-3xl mx-auto">
            Every program we build stands on the values that shape our promise to the women we serve.
          </p>
        </div>

        {/* Values Stack (Alternating horizontal cards matching the user's mockup) */}
        <div className="mt-16 flex flex-col gap-8">
          {values.map((v, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={v.title}
                className={`sticky group relative overflow-hidden rounded-[10px] border border-border/70 bg-card/95 backdrop-blur-xl p-6 md:p-8 lg:p-10 shadow-soft transition-all duration-500 hover:shadow-elegant hover:border-primary/20 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-6 md:gap-12 ${index === 0 ? "-mt-[40px]" : ""}`}

                style={{
                  top: `${80 + index * 20}px`,
                  zIndex: index + 10
                }}
              >
                {/* Premium hover gradient glow */}
                <div className="absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5E2B97] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10 pointer-events-none" />

                {/* Left/Right Side Image Container */}
                <div className="w-full md:w-[42%] aspect-[16/9] rounded-[10px] overflow-hidden border border-border/40 shadow-soft shrink-0 z-0 max-h-48 md:max-h-none">
                  <img
                    src={v.image}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Content Side Container */}
                <div className="flex-grow flex flex-col items-start text-left relative z-10">
                  {/* Category Pill and Icon badge */}
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] text-white shadow-glow transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 shrink-0">
                      <v.icon className="size-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5E2B97]">
                      Pillar 0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-2xl md:text-3xl font-extrabold text-[#3A0A63] tracking-tight transition-colors duration-300 group-hover:text-[#5E2B97]">
                    {v.title}
                  </h3>



                  {/* Description copy */}
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground font-medium">
                    {v.copy}
                  </p>

                  {/* Capsule READ MORE button */}
                  <Link
                    to="#"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] text-white font-bold px-7 py-3 text-xs tracking-wider uppercase shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97]"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


