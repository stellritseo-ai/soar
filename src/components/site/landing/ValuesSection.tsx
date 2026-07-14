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
    <section
      className="relative pt-16 pb-20"
      style={{
        background: "linear-gradient(160deg, #0D001A 0%, #1A0035 50%, #0A0015 100%)",
      }}
    >
      {/* Background ambient orbs */}
      <div className="absolute inset-0 overflow-clip pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#5E2B97] opacity-10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D4AF37] opacity-[0.06] blur-[140px]" />
        {/* Glitter dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#D4AF37] animate-pulse"
            style={{
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
              opacity: 0.15 + (i % 4) * 0.07,
              top: `${(i * 17 + 5) % 95}%`,
              left: `${(i * 23 + 3) % 95}%`,
              animationDelay: `${(i * 0.4) % 2.5}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Why SOAR
          </span>
          <h2 className="mt-3 font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-white font-extrabold">
            Six Pillars. One{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] font-extrabold">
              Rising
            </span>{" "}
            Sisterhood.
          </h2>
          <p className="mt-2 text-[16px] text-white/55 font-medium">
            Every program we build stands on the values that shape our promise to the women we serve.
          </p>
        </div>

        {/* Sticky stacking cards */}
        <div className="flex flex-col gap-4">
          {values.map((v, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={v.title}
                className={`sticky group relative overflow-hidden rounded-2xl flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-stretch gap-0 transition-all duration-500`}
                style={{
                  top: `${56 + index * 14}px`,
                  zIndex: index + 10,
                  background: "rgba(30, 5, 60, 0.92)",
                  border: "1px solid rgba(212,175,55,0.22)",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.12)",
                  backdropFilter: "blur(24px)",
                }}
              >
                {/* Gold shimmer top edge */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent pointer-events-none" />

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
                />

                {/* ── Image ── */}
                <div
                  className="relative w-full md:w-[38%] shrink-0 overflow-hidden"
                  style={{
                    minHeight: "220px",
                    borderRadius: isEven ? "16px 0 0 16px" : "0 16px 16px 0",
                  }}
                >
                  <img
                    src={v.image}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Subtle inner shadow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: isEven
                        ? "inset -20px 0 40px rgba(30,5,60,0.5)"
                        : "inset 20px 0 40px rgba(30,5,60,0.5)",
                    }}
                  />
                </div>

                {/* ── Content ── */}
                <div className="flex-grow flex flex-col justify-center px-8 py-8 md:py-10 relative z-10">

                  {/* Icon + Pillar label row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="grid size-10 place-items-center rounded-full text-white shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(94,43,151,0.7)",
                        border: "1.5px solid rgba(212,175,55,0.5)",
                        boxShadow: "0 0 14px rgba(212,175,55,0.3)",
                      }}
                    >
                      <v.icon className="size-4.5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D4AF37]">
                      Pillar 0{index + 1}
                    </span>
                  </div>

                  {/* Title — gold on odd cards, white on even */}
                  <h3
                    className="font-display text-2xl md:text-[28px] font-extrabold tracking-tight mb-3 transition-colors duration-300"
                    style={{ color: isEven ? "#ffffff" : "#D4AF37" }}
                  >
                    {v.title}
                  </h3>

                  {/* Gold underline bar */}
                  <div
                    className="h-[2px] w-12 rounded-full mb-4"
                    style={{ background: "linear-gradient(90deg, #D4AF37, #5E2B97)" }}
                  />

                  {/* Body copy */}
                  <p className="text-[14.5px] leading-[1.75] text-white/65 font-medium mb-7 max-w-md">
                    {v.copy}
                  </p>

                  {/* READ MORE button — filled gold on even, outlined on odd */}
                  <Link
                    to="/how-we-work"
                    className="self-start inline-flex items-center justify-center font-bold text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={
                      isEven
                        ? {
                            background: "linear-gradient(135deg, #D4AF37, #F2D27C)",
                            color: "#1A0035",
                            boxShadow: "0 4px 18px rgba(212,175,55,0.35)",
                          }
                        : {
                            background: "transparent",
                            color: "#D4AF37",
                            border: "1.5px solid #D4AF37",
                            boxShadow: "0 0 12px rgba(212,175,55,0.15)",
                          }
                    }
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
