import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowRight, Sparkles, Compass, Target, Heart, Shield, Landmark, BookOpen, UserCheck, Users, Quote } from "lucide-react";
import programFamilyImg from "@/assets/program-family.jpg";
import story1 from "@/assets/story-1.jpg";
import secretaryBettyImg from "@/assets/team/Arhelo Betty (Secretary).png";
import vpBettyImg from "@/assets/team/Betty Arhelo (vice president ).jpg";
import presMyrtleImg from "@/assets/team/Dixon, Myrtle ( President ).png";
import founderMyrtleImg from "@/assets/team/Myrtle Dixon ( Founder & President ).jpeg";
import presTerryImg from "@/assets/team/Terry-Ann Taylor-Beckford (president).jpg";
import dirTamaraImg from "@/assets/team/tamara girly (director).JPG";
import { useTeam } from "@/lib/cms";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story — SOAR Global Foundation" },
      { name: "description", content: "Learn about Sisters Of Adversity Rise (SOAR) Global Foundation — established in 2014 to build pathways from survival to sovereignty." },
      { property: "og:title", content: "Our Story — SOAR Global Foundation" },
      { property: "og:url", content: "/our-story" },
    ],
    links: [{ rel: "canonical", href: "/our-story" }],
  }),
  component: OurStory,
});

const timeline = [
  { year: "2014", title: "A sisterhood begins", copy: "Established with a singular purpose — to empower women to rediscover their dreams through homeownership." },
  { year: "2022", title: "First workshops", copy: "Financial literacy and mentorship programs launch." },
  { year: "2024", title: "Homeownership pathway", copy: "SOAR partners open the first homeownership education track." },
  { year: "2026", title: "100 women goal", copy: "Expanding to three states with a bold new impact target." },
];

const fallbackTeam = [
  { name: "Myrtle Dixon", role: "President", bio: "A visionary leader championing women's empowerment for over 20 years, Myrtle provides strategic direction and ensures the Foundation remains steadfast in its mission.", img: founderMyrtleImg },
  { name: "Dixon, Myrtle", role: "President", bio: "Leading strategic direction and advocacy for sustainable housing across communities.", img: presMyrtleImg },
  { name: "Terry-Ann Taylor-Beckford", role: "President", bio: "The architect behind SOAR's mentorship and financial literacy curriculum, Terry-Ann designs programs that equip women with practical skills for lifelong success.", img: presTerryImg },
  { name: "Betty Arhelo", role: "Vice President", bio: "Cultivating community support, designing outreach initiatives, and managing program coordination.", img: vpBettyImg },
  { name: "Arhelo Betty", role: "Secretary", bio: "The heart of our sisterhood, Betty maintains accurate records and cultivates community through events and volunteer care.", img: secretaryBettyImg },
  { name: "Tamara Girly", role: "Director", bio: "Tamara builds bridges with sponsors and strategic partners, advancing our mission through meaningful collaborations.", img: dirTamaraImg },
];

const pillars = [
  { icon: Shield, title: "Empowerment", copy: "Unlocking confidence, agency, and lasting personal power." },
  { icon: BookOpen, title: "Education", copy: "Providing practical knowledge and vocational training for economic independence." },
  { icon: Landmark, title: "Affordable Housing", copy: "Creating clear pathways to safe, dignified, and permanent homeownership." },
  { icon: Heart, title: "Financial Literacy", copy: "Teaching budgeting, saving, credit building, and investing for generational wealth." },
  { icon: UserCheck, title: "Mentorship", copy: "Establishing lifelong relationships and support networks." },
  { icon: Users, title: "Community", copy: "Fostering a supportive sisterhood that rises together." },
];

const testimonials = [
  { quote: "SOAR walked with me from a shelter to my very own front door. I finally have a home for my daughters — and a future.", author: "Amara J.", location: "Atlanta, GA" },
  { quote: "The mentorship changed everything. I launched my business, rebuilt my credit, and I'm about to close on my first house.", author: "Isabela R.", location: "Orlando, FL" },
  { quote: "I dreamed again for the first time in years. SOAR gave me tools, sisters, and hope I can pass down.", author: "Denise M.", location: "Charlotte, NC" },
];

function OurStory() {
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
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Our Story"
          title={<>A Sisterhood Built to <span className="text-gradient-brand italic font-extrabold">Rise Together</span>.</>}
          subtitle="Every woman deserves a place to call home — not just a roof over her head, but a foundation upon which to build her dreams."
          bgImage={programFamilyImg}
        />

        {/* Content Section 1: Intro */}
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 lg:grid-cols-2 lg:px-10 mt-[50px]">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-r from-primary/10 to-accent/10 opacity-20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] shadow-elegant border border-white/40">
              <img src={story1} alt="Sisters rising together" loading="lazy" className="aspect-[4/3] size-full object-cover" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Sisters Of Adversity Rise
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              At SOAR Global Foundation Inc., we believe that homeownership is more than a financial milestone; it is a pathway to dignity, stability, and lasting independence.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground font-semibold border-l-4 border-accent pl-4 italic">
              "Our story begins with a simple yet profound truth: no woman should have to walk her hardest road alone."
            </p>
            <p className="text-base leading-relaxed text-[#3A0A63] font-medium">
              Established in 2014 with a singular purpose, we walk side-by-side with women, helping them rediscover their dreams through structured education, caring mentorship, and a clear, real path to owning their own homes.
            </p>
          </div>
        </section>

        {/* Board of Directors Section */}
        <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-3.5 text-primary" /> Board of Directors
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Our Founders & <span className="text-gradient-brand">Leadership</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              Our journey is guided by a dedicated Board of Directors, each bringing unique expertise and an unwavering commitment to our mission.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="group glass rounded-3xl p-6 shadow-soft hover:shadow-elegant hover:border-primary/20 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="relative size-24 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="size-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  <div className="text-center mt-5">
                    <h3 className="font-display text-xl font-extrabold text-foreground">{member.name}</h3>
                    <span className="inline-block mt-1 text-xs font-bold uppercase tracking-wider text-primary">{member.role}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-center">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8 font-semibold tracking-wider uppercase">
            Together, our leadership team embodies the values of empowerment, education, community, dignity, and sustainability.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="glass rounded-[28px] p-8 shadow-soft border border-primary/5 hover:border-primary/20 transition-all duration-300">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Target className="size-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#3A0A63] tracking-tight">Our Mission</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Empowering women to find their dreams by owning their own home. We believe every woman deserves a stable and unshakeable starting point for generational success.
              </p>
            </div>
            <div className="glass rounded-[28px] p-8 shadow-soft border border-accent/5 hover:border-accent/20 transition-all duration-300">
              <div className="size-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                <Compass className="size-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight">Our Vision</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                A world where every woman has access to stable, permanent housing and the resources to achieve homeownership, building lasting community assets.
              </p>
            </div>
          </div>
        </section>

        {/* Six Pillars Section */}
        <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
              Six Pillars
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground">
              Our <span className="text-gradient-gold">Approach</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              We don't just offer handouts — we offer hand-ups. Our work is built on Six Pillars that form the foundation of everything we do:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="glass rounded-[24px] p-6 shadow-soft border border-white/40 hover:-translate-y-0.5 transition duration-300">
                <div className="size-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 mb-5">
                  <pillar.icon className="size-5" />
                </div>
                <h4 className="text-lg font-bold text-foreground tracking-tight">{pillar.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.copy}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#3A0A63] mt-10 font-bold max-w-2xl mx-auto leading-relaxed">
            Through our Core Programs — Financial Literacy Workshops, Homeownership Education, Mentorship Program, Family Support Services, and Affordable Housing Access — we provide comprehensive support that addresses the whole woman.
          </p>
        </section>

        {/* Impact Testimonials Section */}
        <section className="bg-gradient-to-r from-primary to-[#3A0A63] text-white py-20 overflow-hidden relative">
          <div className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent/10 blur-[80px]" />
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-5 items-center">
              <div className="lg:col-span-2 space-y-4">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Our Impact</span>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">Sisters Rising Across States</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Established in Orlando, Florida, we empowered over <strong className="text-white">100 women in Year 1 alone</strong>. We are expanding to <strong className="text-white">3 additional states in Year 2</strong>, aiming for national presence by Year 3.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="border-l-2 border-[#D4AF37] pl-3">
                    <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Year 1</span>
                    <div className="text-2xl font-extrabold text-white">100+ Women</div>
                  </div>
                  <div className="border-l-2 border-[#D4AF37] pl-3">
                    <span className="text-[10px] text-white/50 uppercase font-bold tracking-widest">Expansion</span>
                    <div className="text-2xl font-extrabold text-[#D4AF37]">3 States</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-6">
                {testimonials.map((test, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative shadow-md">
                    <Quote className="absolute right-4 top-4 size-10 text-[#D4AF37]/10" />
                    <p className="text-sm italic text-white/90 leading-relaxed font-medium">
                      "{test.quote}"
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-xs font-bold text-white">{test.author}</span>
                      <span className="text-[10px] text-white/50">— {test.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Join Section */}
        <section className="mx-auto max-w-5xl px-6 py-24 lg:px-10 text-center">
          <div className="glass rounded-[32px] p-8 md:p-12 shadow-elegant border border-primary/15 relative overflow-hidden">
            <div className="absolute left-[-10%] top-[-30%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
            <h3 className="text-3xl font-extrabold text-foreground tracking-tight">Join Our Story</h3>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our story is still being written, and we invite you to be part of it. Whether you are a woman seeking support, a professional ready to volunteer, a corporation looking to partner, or a donor hoping to make a difference — your chapter matters.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/programs" className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/5 transition shadow-sm">
                Learn About Programs <ArrowRight className="size-3.5" />
              </Link>
              <Link to="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition shadow-soft">
                Get Involved
              </Link>
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full border border-border bg-[#3A0A63] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#3A0A63]/90 transition shadow-sm">
                Donate Now
              </Link>
            </div>

            <div className="mt-12 pt-6 border-t border-border/40">
              <p className="text-xl text-accent font-display italic font-semibold leading-relaxed">
                "Let's build a bridge from survival to sovereignty — one woman, one home, one dream at a time."
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
