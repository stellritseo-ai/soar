import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, ChevronRight } from "lucide-react";
import { useTeam } from "@/lib/cms";
import founderMyrtleImg from "@/assets/team/Myrtle Dixon (Founder).jpeg";
import presTerryImg from "@/assets/team/Terry-Ann Taylor-Beckford (president).jpg";
import vpBettyImg from "@/assets/team/Betty Arhelo (vice president ).jpg";
import secretaryBettyImg from "@/assets/team/Harrison Kameka ( Secretary ).png";
import dirTamaraImg from "@/assets/team/Tamara Girly (director).JPG";
import dirTamarImg from "@/assets/team/Tamar Raby (director).png";

const fallbackTeam = [
  {
    id: "1",
    name: "Myrtle Dixon",
    role: "Founder",
    bio: "Visionary leader championing women's empowerment for over 20 years.",
    image_url: founderMyrtleImg,
  },
  {
    id: "2",
    name: "Terry-Ann Taylor-Beckford",
    role: "President",
    bio: "Architect of SOAR's mentorship and financial literacy curriculum.",
    image_url: presTerryImg,
  },
  {
    id: "3",
    name: "Betty Arhelo",
    role: "Vice President",
    bio: "Cultivating community support and organizing outreach programs.",
    image_url: vpBettyImg,
  },
  {
    id: "4",
    name: "Harrison Kameka",
    role: "Secretary",
    bio: "Builds the sisterhood — events, outreach, and volunteer care.",
    image_url: secretaryBettyImg,
  },
  {
    id: "5",
    name: "Tamara Girly",
    role: "Director",
    bio: "Cultivates sponsors and strategic partners advancing our mission.",
    image_url: dirTamaraImg,
  },
  {
    id: "6",
    name: "Tamar Raby",
    role: "Director",
    bio: "Tamar builds bridges with community partners and local sponsors.",
    image_url: dirTamarImg,
  },
];

export function TeamSection() {
  const { data: dbTeam } = useTeam();
  const team = dbTeam && dbTeam.length > 0
    ? dbTeam.map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      image_url: member.image_url || fallbackTeam.find(t => t.name === member.name)?.image_url || ""
    }))
    : fallbackTeam;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background light blur */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#5E2B97]/5 to-[#D4AF37]/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5E2B97]">
            Meet The Team
          </span>
          <h2 className="mt-[10px] -mb-[11px] font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-foreground font-extrabold">
            Board of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] font-extrabold">Directors</span>
          </h2>
          <p className="mt-4 text-[17px] text-muted-foreground font-medium">
            A team of leaders, mentors, and builders devoted to helping every sister rise.
          </p>
        </div>

        {/* Infinite Slide Marquee Container */}
        <div className="mt-14 w-full relative overflow-hidden">
          {/* Edge fading masks for premium visual effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Marquee track */}
          <div className="animate-marquee flex gap-8 hover:[animation-play-state:paused] py-4">

            {/* First copy */}
            <div className="flex gap-8 shrink-0">
              {team.map((m) => (
                <article
                  key={m.id}
                  className="w-[280px] group relative overflow-hidden rounded-[10px] border border-border/70 bg-card/70 backdrop-blur-sm shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-elegant flex flex-col h-full shrink-0"
                >
                  <div className="relative overflow-hidden border-b border-border/40 aspect-[4/5] w-full">
                    <img
                      src={m.image_url}
                      alt={m.name}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Custom gradient overlay inside image */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 via-transparent to-transparent opacity-70" />

                    {/* Social media float links */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-300 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 z-20">
                      <a
                        href="#"
                        aria-label={`${m.name} on LinkedIn`}
                        className="grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-[#3A0A63] hover:text-[#5E2B97] hover:scale-105 shadow transition-all duration-200"
                      >
                        <Linkedin className="size-4" />
                      </a>
                      <a
                        href="#"
                        aria-label={`Email ${m.name}`}
                        className="grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-[#3A0A63] hover:text-[#5E2B97] hover:scale-105 shadow transition-all duration-200"
                      >
                        <Mail className="size-4" />
                      </a>
                    </div>
                  </div>

                  {/* Member details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display text-xl font-bold text-[#3A0A63] transition-colors duration-300 group-hover:text-[#5E2B97]">
                      {m.name}
                    </h3>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      {m.role}
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground font-medium flex-grow">
                      {m.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Second copy for seamless loop */}
            <div className="flex gap-8 shrink-0" aria-hidden="true">
              {team.map((m) => (
                <article
                  key={`${m.id}-dup`}
                  className="w-[280px] group relative overflow-hidden rounded-[10px] border border-border/70 bg-card/70 backdrop-blur-sm shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-elegant flex flex-col h-full shrink-0"
                >
                  <div className="relative overflow-hidden border-b border-border/40 aspect-[4/5] w-full">
                    <img
                      src={m.image_url}
                      alt={m.name}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Custom gradient overlay inside image */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 via-transparent to-transparent opacity-70" />

                    {/* Social media float links */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-300 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 z-20">
                      <a
                        href="#"
                        aria-label={`${m.name} on LinkedIn`}
                        className="grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-[#3A0A63] hover:text-[#5E2B97] hover:scale-105 shadow transition-all duration-200"
                      >
                        <Linkedin className="size-4" />
                      </a>
                      <a
                        href="#"
                        aria-label={`Email ${m.name}`}
                        className="grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-[#3A0A63] hover:text-[#5E2B97] hover:scale-105 shadow transition-all duration-200"
                      >
                        <Mail className="size-4" />
                      </a>
                    </div>
                  </div>

                  {/* Member details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-display text-xl font-bold text-[#3A0A63] transition-colors duration-300 group-hover:text-[#5E2B97]">
                      {m.name}
                    </h3>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      {m.role}
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground font-medium flex-grow">
                      {m.bio}
                    </p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/our-story"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#5E2B97] hover:text-[#3A0A63] transition duration-200"
          >
            Learn more about our story
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
