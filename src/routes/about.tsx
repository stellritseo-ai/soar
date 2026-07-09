import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowRight, Sparkles, Compass, Target, Heart } from "lucide-react";
import aboutImg from "@/assets/program-family.jpg";

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
  { year: "2020", title: "A sisterhood begins", copy: "Founded to walk beside women rebuilding after adversity." },
  { year: "2022", title: "First workshops", copy: "Financial literacy and mentorship programs launch." },
  { year: "2024", title: "Homeownership pathway", copy: "SOAR partners open the first homeownership education track." },
  { year: "2026", title: "100 women goal", copy: "Expanding to three states with a bold new impact target." },
];

function About() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About SOAR"
        title={<>Sisters Of Adversity <span className="text-gradient-brand italic">Rise</span>.</>}
        subtitle="We exist so no woman has to walk her hardest road alone. SOAR is a global sisterhood building bridges from survival to sovereignty."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 lg:grid-cols-2 lg:px-10">
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
