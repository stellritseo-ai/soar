import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Play,
  GraduationCap,
  Home,
  Users,
  Wallet,
  HeartHandshake,
  Sprout,
  Sparkles,
  Quote,
  Star,
  ChevronRight,
  Linkedin,
  Mail,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import heroImg from "@/assets/hero.jpg";
import storyImg from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import pFinancial from "@/assets/program-financial.jpg";
import pHome from "@/assets/program-home.jpg";
import pMentor from "@/assets/program-mentor.jpg";
import pFamily from "@/assets/program-family.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import { useTeam, useSetting, type HeroSettings } from "@/lib/cms";

const fallbackTeam = [
  { id: "1", name: "Dr. Amara Johnson", role: "Founder & Executive Director", bio: "Visionary leader championing women's empowerment for over 20 years.", image_url: team1 },
  { id: "2", name: "Sofia Ramirez", role: "Director of Programs", bio: "Architect of SOAR's mentorship and financial literacy curriculum.", image_url: team2 },
  { id: "3", name: "Zara Okonkwo", role: "Head of Community", bio: "Builds the sisterhood — events, outreach, and volunteer care.", image_url: team3 },
  { id: "4", name: "Elena Whitfield", role: "Chief Partnerships Officer", bio: "Cultivates sponsors and strategic partners advancing our mission.", image_url: team4 },
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOAR Global Foundation — Helping Women Dream Again" },
      {
        name: "description",
        content:
          "Empowering women through education, mentorship, financial literacy, and pathways to homeownership. Donate, volunteer, or partner with SOAR.",
      },
    ],
  }),
  component: Home1,
});

const stats = [
  { value: "100+", label: "Women Empowered" },
  { value: "25+", label: "Community Partners" },
  { value: "5", label: "Core Programs" },
  { value: "100%", label: "Hope Driven" },
];

const values = [
  { icon: Sparkles, title: "Empowerment", copy: "Unlocking confidence, agency, and lasting personal power." },
  { icon: GraduationCap, title: "Education", copy: "Knowledge that builds independence and opens doors." },
  { icon: Home, title: "Affordable Housing", copy: "Pathways to safe, dignified, and permanent homes." },
  { icon: Wallet, title: "Financial Literacy", copy: "Practical money mastery for generational impact." },
  { icon: HeartHandshake, title: "Mentorship", copy: "Real relationships that guide the whole journey." },
  { icon: Users, title: "Community", copy: "A sisterhood that rises together, every single day." },
];

const programs = [
  { title: "Financial Literacy Workshops", copy: "Budgeting, credit, and wealth-building for real life.", img: pFinancial, tag: "Education" },
  { title: "Homeownership Education", copy: "From first savings to signed keys — a guided path.", img: pHome, tag: "Housing" },
  { title: "Mentorship Program", copy: "One-to-one guidance from women who have been there.", img: pMentor, tag: "Support" },
  { title: "Family Support Services", copy: "Wraparound care for mothers, children, and families.", img: pFamily, tag: "Community" },
];

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

function Home1() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate min-h-dvh overflow-hidden pt-24">
        <img
          src={heroImg}
          alt="Confident women in community, golden hour"
          width={1600}
          height={1200}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/85 via-primary/55 to-accent/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* floating glass shapes */}
        <div className="pointer-events-none absolute right-10 top-40 hidden animate-float-slow lg:block">
          <div className="glass w-64 rounded-3xl p-5 shadow-glow">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full gradient-gold">
                <Sparkles className="size-5 text-primary-deep" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-deep/70">Impact</div>
                <div className="font-display text-lg text-primary-deep">100+ women empowered</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute left-8 bottom-32 hidden animate-float-slow lg:block"
          style={{ animationDelay: "-3s" }}
        >
          <div className="glass w-56 rounded-3xl p-5 shadow-glow">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full gradient-brand">
                <Home className="size-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary-deep/70">Pathways</div>
                <div className="font-display text-lg text-primary-deep">Home ownership</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-16 lg:px-10 lg:pt-28">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-accent-soft" /> Sisters Of Adversity Rise
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
              Empowering Women <br />
              to <span className="text-gradient-gold italic">Dream Again</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              SOAR Global Foundation Inc. helps women overcome adversity through education, mentorship,
              financial literacy, family support, and pathways to homeownership.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-sm font-semibold text-primary-deep shadow-elegant transition-transform hover:scale-[1.03]"
              >
                <Heart className="size-4" /> Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Become a Volunteer <ArrowRight className="size-4" />
              </Link>
              <button className="group inline-flex items-center gap-3 text-sm font-medium text-white/90">
                <span className="grid size-11 place-items-center rounded-full border border-white/40 backdrop-blur transition group-hover:bg-white/15">
                  <Play className="size-4 translate-x-0.5" />
                </span>
                Watch Our Story
              </button>
            </div>
          </div>

          {/* stat bar */}
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-5 text-primary-deep backdrop-blur-xl"
              >
                <div className="font-display text-3xl md:text-4xl text-gradient-brand">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-primary-deep/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] gradient-brand opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] shadow-elegant">
              <img
                src={pFamily}
                alt="A circle of women in warm sunset light"
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/5] size-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-8 -right-6 hidden w-64 rounded-2xl p-5 shadow-soft md:block">
              <div className="text-xs uppercase tracking-widest text-primary/70">Est. 2020</div>
              <div className="mt-1 font-display text-xl text-primary-deep">A sisterhood built to rise together.</div>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Who We Are
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
              Turning adversity into <span className="text-gradient-brand">opportunity</span>.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              SOAR — Sisters Of Adversity Rise — exists so no woman has to walk her hardest road alone.
              We build a bridge from survival to sovereignty through education, mentorship, and a real
              path to homeownership.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-widest text-primary/70">Our Mission</div>
                <p className="mt-2 text-sm text-foreground/80">
                  Empowering women to rediscover their dreams through education, mentorship, and pathways to
                  homeownership.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-widest text-primary/70">Our Vision</div>
                <p className="mt-2 text-sm text-foreground/80">
                  A world where every woman has access to safe housing, opportunity, dignity, and the
                  resources to thrive.
                </p>
              </div>
            </div>

            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep"
            >
              Discover our story <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative py-28">
        <div className="absolute inset-0 gradient-soft" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
              Why SOAR
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
              Six pillars. One <span className="text-gradient-brand">rising</span> sisterhood.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every program we build stands on the values that shape our promise to the women we serve.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="absolute -right-16 -top-16 size-40 rounded-full gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
                <div className="relative">
                  <div className="grid size-14 place-items-center rounded-2xl gradient-brand text-primary-foreground shadow-glow">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Core Programs
              </span>
              <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                Real programs. <span className="text-gradient-brand">Real transformation.</span>
              </h2>
            </div>
            <Link to="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View all programs <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {programs.map((p) => (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                  <Link
                    to="/programs"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-deep"
                  >
                    Learn more <ChevronRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -left-40 top-10 size-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -right-40 bottom-10 size-96 rounded-full bg-primary/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 text-primary-foreground lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
              Our Impact
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              A movement <span className="italic text-gradient-gold">measured in lives changed</span>.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { v: "100", l: "Women Target" },
              { v: "3", l: "States Expanding" },
              { v: "1k+", l: "Lives Impacted" },
              { v: "25+", l: "Community Partners" },
            ].map((s) => (
              <div key={s.l} className="glass-dark rounded-3xl p-8 text-center">
                <div className="font-display text-5xl text-gradient-gold">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/75">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Success Stories
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              The women who <span className="text-gradient-brand">rose</span>.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {stories.map((s) => (
              <figure
                key={s.name}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    width={1000}
                    height={1200}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-7">
                  <Quote className="size-6 text-accent" />
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{s.quote}"</p>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <div className="font-display text-lg">{s.name}</div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.where}</div>
                    </div>
                    <div className="flex gap-0.5 text-accent">
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

      {/* TEAM */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Meet The Team
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              Led by <span className="text-gradient-brand">women of purpose</span>.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
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

          <div className="mt-10 text-center">
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep">
              Learn more about our story <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 gradient-brand" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(242,210,124,0.4),transparent_50%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 text-center lg:px-10">
          <div className="mx-auto max-w-3xl text-primary-foreground">
            <Sprout className="mx-auto size-10 text-accent-soft" />
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              Help a woman <span className="italic text-gradient-gold">dream again</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
              Your gift plants a seed of possibility — a workshop attended, a mentor met, a key placed in
              her hand.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-full gradient-gold px-8 py-3.5 text-sm font-semibold text-primary-deep shadow-elegant transition-transform hover:scale-[1.03]"
              >
                <Heart className="size-4" /> Donate Now
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Become a Sponsor <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
