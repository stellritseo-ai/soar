import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowRight, Sparkles, Compass, Target, Heart, Linkedin, Mail } from "lucide-react";
import aboutImg from "@/assets/program-family.jpg";
import founderMyrtleImg from "@/assets/team/Myrtle Dixon (Founder).jpeg";
import presTerryImg from "@/assets/team/Terry-Ann Taylor-Beckford (president).jpg";
import vpBettyImg from "@/assets/team/Betty Arhelo (vice president ).jpg";
import secretaryBettyImg from "@/assets/team/Arhelo Betty ( Secretary ).png";
import dirTamaraImg from "@/assets/team/Tamara Girly (director).JPG";
import dirTamarImg from "@/assets/team/Tamar Raby (director).png";

import { useTeam } from "@/lib/cms";

const fallbackTeam = [
  {
    name: "Myrtle Dixon",
    role: "Founder",
    bio: "Visionary leader championing women's empowerment for over 20 years.",
    img: founderMyrtleImg,
  },
  {
    name: "Terry-Ann Taylor-Beckford",
    role: "President",
    bio: "Architect of SOAR's mentorship and financial literacy curriculum.",
    img: presTerryImg,
  },
  {
    name: "Betty Arhelo",
    role: "Vice President",
    bio: "Cultivating community support and organizing outreach programs.",
    img: vpBettyImg,
  },
  {
    name: "Arhelo Betty",
    role: "Secretary",
    bio: "Builds the sisterhood — events, outreach, and volunteer care.",
    img: secretaryBettyImg,
  },
  {
    name: "Tamara Girly",
    role: "Director",
    bio: "Cultivates sponsors and strategic partners advancing our mission.",
    img: dirTamaraImg,
  },
  {
    name: "Tamar Raby",
    role: "Director",
    bio: "Cultivates community relations and local sponsorships.",
    img: dirTamarImg,
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SOAR Global Foundation" },
      { name: "description", content: "The story, mission, and vision behind SOAR Global Foundation — Sisters Of Adversity Rise." },
      { property: "og:title", content: "About — SOAR Global Foundation" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  { year: "2014", title: "A sisterhood begins", copy: "Founded to walk beside women rebuilding after adversity." },
  { year: "2022", title: "First workshops", copy: "Financial literacy and mentorship programs launch." },
  { year: "2024", title: "Homeownership pathway", copy: "SOAR partners open the first homeownership education track." },
  { year: "2026", title: "100 women goal", copy: "Expanding to three states with a bold new impact target." },
];

function About() {
  const { data: dbTeam } = useTeam();
  const team = dbTeam && dbTeam.length > 0
    ? dbTeam.map(member => ({
        name: member.name,
        role: member.role,
        bio: member.bio || "",
        img: member.image_url || fallbackTeam.find(t => t.name === member.name)?.img || ""
      }))
    : fallbackTeam;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About SOAR"
        title={<>Sisters Of Adversity <span className="text-gradient-brand italic">Rise</span>.</>}
        subtitle="We exist so no woman has to walk her hardest road alone. SOAR is a global sisterhood building bridges from survival to sovereignty."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 lg:grid-cols-2 lg:px-10 mt-[50px]">
        <div className="relative">
          <div className="absolute -inset-6 rounded-[36px] gradient-brand opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] shadow-elegant">
            <img src={aboutImg} alt="Women in community" loading="lazy" width={1200} height={1400} className="aspect-[4/5] size-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="font-display text-4xl md:text-5xl">Our Story</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            SOAR Global Foundation Inc. was born from lived experience — the knowledge that adversity does
            not have to be the end of a woman's story. It can be the beginning of an unshakeable one.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Today, we combine education, mentorship, financial literacy, and a real pathway to
            homeownership so women can build futures they design themselves.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Target className="size-6 text-primary" />
              <div className="mt-4 text-xs uppercase tracking-widest text-primary/70">Mission</div>
              <p className="mt-2 text-sm text-foreground/80">Empowering women through education, mentorship, financial literacy, and pathways to homeownership.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Compass className="size-6 text-primary" />
              <div className="mt-4 text-xs uppercase tracking-widest text-primary/70">Vision</div>
              <p className="mt-2 text-sm text-foreground/80">A world where every woman has safe housing, opportunity, dignity, and the resources to thrive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-6 pb-28 lg:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Our Journey
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">Milestones of <span className="text-gradient-brand">hope</span></h2>
        </div>

        <ol className="mt-14 relative border-l-2 border-dashed border-primary/25 pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="mb-10 last:mb-0">
              <div className="absolute -left-[11px] grid size-5 place-items-center rounded-full gradient-brand shadow-glow">
                <Sparkles className="size-2.5 text-primary-foreground" />
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t.year}</div>
                <h3 className="mt-1 font-display text-2xl">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Our Team
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">Led by <span className="text-gradient-brand">women of purpose</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A team of leaders, mentors, and builders devoted to helping every sister rise.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <article key={m.name} className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" width={800} height={1000} className="aspect-[4/5] size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <a href="#" aria-label={`${m.name} on LinkedIn`} className="grid size-9 place-items-center rounded-full glass text-primary-deep hover:text-primary"><Linkedin className="size-4" /></a>
                  <a href="#" aria-label={`Email ${m.name}`} className="grid size-9 place-items-center rounded-full glass text-primary-deep hover:text-primary"><Mail className="size-4" /></a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl">{m.name}</h3>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{m.role}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-24 max-w-6xl overflow-hidden rounded-[32px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] gradient-brand p-12 text-center text-primary-foreground shadow-elegant">
          <Heart className="mx-auto size-10 text-accent-soft" />
          <h3 className="mt-4 font-display text-3xl md:text-4xl">Join the sisterhood.</h3>
          <p className="mx-auto mt-3 max-w-xl text-white/80">Volunteer, mentor, sponsor, or partner — every hand matters.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/volunteer" className="rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-primary-deep">Get Involved</Link>
            <Link to="/donate" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white">Donate <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}

