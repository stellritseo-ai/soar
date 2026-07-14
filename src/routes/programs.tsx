import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { 
  ArrowRight, 
  Check, 
  Clock, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Home, 
  ShieldCheck, 
  Compass, 
  HelpCircle,
  ArrowUpRight
} from "lucide-react";
import pFinancial from "@/assets/program-financial.jpg";
import pHome from "@/assets/program-home.jpg";
import pMentor from "@/assets/program-mentor.jpg";
import pFamily from "@/assets/program-family.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Core Programs — SOAR Global Foundation" },
      { name: "description", content: "Discover our educational pathways: Financial Literacy, Homeownership Education, Mentorship, Family Support, and Housing Access." },
      { property: "og:title", content: "Core Programs — SOAR Global Foundation" },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    title: "Financial Literacy Workshops",
    img: pFinancial,
    copy: "From budgeting basics to credit repair and wealth-building strategies. We provide women with the financial confidence and knowledge needed to break cycles of debt and start saving for their family's future.",
    bullets: [
      { title: "Sustainable Budgeting", desc: "Learn to build sensible household budgets and automate savings." },
      { title: "Credit Restoration", desc: "Surgically resolve debts, dispute credit errors, and elevate scores." },
      { title: "Investment Frameworks", desc: "Demystify investment tools and begin building generational wealth." }
    ],
    meta: {
      duration: "6-Week Course",
      format: "Hybrid (In-Person / Online)",
      focus: "Financial Sovereignty",
      icon: TrendingUp
    }
  },
  {
    title: "Homeownership Education",
    img: pHome,
    copy: "A structured, clear pathway navigating the entire home-buying process. From mortgage pre-approval to working with real estate agents, we ensure you have professional support at every single milestone.",
    bullets: [
      { title: "Mortgage Preparedness", desc: "Ensure debt-to-income ratios are optimized for the best rates." },
      { title: "Down-Payment Matching", desc: "Navigate government grants and matching funds assistance tracks." },
      { title: "Closing Advocacy", desc: "Detailed review of closing paperwork to keys-in-hand delivery." }
    ],
    meta: {
      duration: "Continuous Track",
      format: "In-Person Workshops",
      focus: "Homeowner Placement",
      icon: Home
    }
  },
  {
    title: "Mentorship Program",
    img: pMentor,
    copy: "Connect one-on-one with established women leaders who have successfully navigated homeownership and career growth. Receive professional guidance, strategic advice, and continuous encouragement.",
    bullets: [
      { title: "One-on-One Pairing", desc: "Direct matching based on career targets, lifestyle, and history." },
      { title: "Career Roadmapping", desc: "Optimize professional resumes, build profiles, and interview well." },
      { title: "Sustained Sisterhood", desc: "Continuous monthly meetups and networks for ongoing growth." }
    ],
    meta: {
      duration: "12-Month Match",
      format: "Monthly Meetups",
      focus: "Leadership & Growth",
      icon: Users
    }
  },
  {
    title: "Family Support Services",
    img: pFamily,
    copy: "Providing wraparound care for mothers and families because personal rising is a collective journey. We offer support structures that ensure a secure foundation for you and your children.",
    bullets: [
      { title: "Childcare Coordination", desc: "Partnerships to ensure safe childcare placement during SOAR classes." },
      { title: "Family Wellness", desc: "Mental health guidance, counselors, and supportive circles." },
      { title: "Enrichment Outings", desc: "Family networking events, holiday initiatives, and community dinners." }
    ],
    meta: {
      duration: "Ongoing Care",
      format: "Varies (In-Person/Remote)",
      focus: "Family Integration",
      icon: ShieldCheck
    }
  },
  {
    title: "Affordable Housing Access",
    img: pHome, // Using pHome as fallback image
    copy: "Direct collaborations with developers, community land trusts, and real estate professionals to secure clean, modern, and affordable transitional or permanent housing units for women in transition.",
    bullets: [
      { title: "Partnership Inventory", desc: "Access property inventories reserved exclusively for SOAR graduates." },
      { title: "Rent-to-Own Bridges", desc: "Structured agreements helping transition rent payments into home equity." },
      { title: "Placement Advising", desc: "Assess housing eligibility, complete applications, and secure lease terms." }
    ],
    meta: {
      duration: "Continuous",
      format: "Placement Services",
      focus: "Stable Placements",
      icon: BookOpen
    }
  }
];

function ProgramsPage() {
  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Pathways to Sovereignty"
          title={<>Programs that <span className="text-gradient-brand italic font-extrabold">Transform</span> Lives.</>}
          subtitle="Every SOAR program is designed to meet a woman exactly where she is — and walk side-by-side with her to self-reliance, stability, and secure homeownership."
          bgImage={pHome}
        />

        {/* Core Programs Main Showcase */}
        <section className="mx-auto max-w-[95%] px-6 pb-28 lg:px-10 mt-[60px] space-y-32">
          {programs.map((p, i) => {
            const isOdd = i % 2 !== 0;
            const MetaIcon = p.meta.icon;
            
            return (
              <article 
                key={p.title} 
                className={`grid items-center gap-12 lg:grid-cols-12 relative ${isOdd ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                
                {/* Visual Side (Lg: 5/12) */}
                <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-r from-primary/10 to-accent/15 opacity-30 blur-2xl transition group-hover:opacity-40" />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/60 shadow-elegant aspect-[4/3] w-full">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      loading="lazy" 
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-103" 
                    />
                  </div>
                </div>

                {/* Content Side (Lg: 7/12) */}
                <div className="lg:col-span-7 space-y-6 relative">
                  
                  {/* Floating Large Digit Background */}
                  <div className="absolute -top-10 -left-4 font-display text-[150px] font-black text-primary/[0.03] select-none pointer-events-none z-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 space-y-5">
                    {/* Header */}
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary">
                        PROGRAM {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                        {p.title}
                      </h2>
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 border border-primary/10 px-3 py-1 text-xs font-semibold text-primary-deep">
                        <Clock className="size-3.5" /> {p.meta.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/5 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
                        <MapPin className="size-3.5" /> {p.meta.format}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-border/60 px-3 py-1 text-xs font-semibold text-foreground/80">
                        <Sparkles className="size-3.5 text-accent" /> {p.meta.focus}
                      </span>
                    </div>

                    {/* Description Copy */}
                    <p className="text-base leading-relaxed text-muted-foreground font-medium">
                      {p.copy}
                    </p>

                    {/* Rich Bullet Points */}
                    <div className="space-y-4 pt-2">
                      {p.bullets.map((b) => (
                        <div key={b.title} className="flex items-start gap-3.5 group/bullet">
                          <span className="size-6 rounded-lg bg-emerald-100 border border-emerald-200/50 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5 transition duration-300 group-hover/bullet:bg-emerald-600 group-hover/bullet:text-white">
                            <Check className="size-3.5" />
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-foreground transition-colors duration-200 group-hover/bullet:text-primary">
                              {b.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                              {b.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-deep text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer"
                      >
                        Enroll in Program <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>

              </article>
            );
          })}
        </section>

        {/* Not Sure Where to Start - Glassmorphic Callout Section */}
        <section className="mx-auto max-w-[95%] px-6 pb-28 lg:px-10">
          <div className="bg-[#3A0A63] text-white rounded-[32px] p-8 md:p-12 shadow-elegant border border-primary-deep/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
            <div className="absolute right-[-10%] top-[-20%] size-[250px] rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute left-[-5%] bottom-[-5%] size-[150px] rounded-full bg-accent/15 blur-2xl" />
            
            <div className="flex-1 space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <HelpCircle className="size-3.5" /> Help Finding Your Path
              </div>
              <h3 className="font-display text-3xl font-extrabold tracking-tight">
                Not sure which program is right for you?
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Everyone's journey to stability and homeownership looks different. Our team is ready to sit down with you, understand your specific goals, and mapping out a customized educational and financial strategy.
              </p>
            </div>
            
            <div className="shrink-0 w-full md:w-auto relative z-10">
              <Link 
                to="/contact" 
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#F2D27C] text-accent-foreground px-7 py-4 text-xs font-bold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer"
              >
                Connect with an Advisor <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
