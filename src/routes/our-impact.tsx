import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Award, Compass, Heart, Shield, Landmark, Sparkles, BookOpen, Quote, BarChart, ArrowRight, ArrowLeft } from "lucide-react";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";

export const Route = createFileRoute("/our-impact")({
  head: () => ({
    meta: [
      { title: "Our Impact — SOAR Global Foundation" },
      { name: "description", content: "Explore the quantitative achievements, milestones, program outcomes, and success stories of SOAR." },
      { property: "og:title", content: "Our Impact — SOAR Global Foundation" },
      { property: "og:url", content: "/our-impact" },
    ],
    links: [{ rel: "canonical", href: "/our-impact" }],
  }),
  component: OurImpact,
});

const stats = [
  { value: "100+", label: "Women Empowered", detail: "Empowered in Year 1 alone" },
  { value: "25+", label: "Community Partners", detail: "Aligning sectors to support" },
  { value: "5", label: "Core Programs", detail: "Holistic pathways running live" },
  { value: "100%", label: "Hope Driven", detail: "Aligned to empowerment values" },
  { value: "3 States", label: "Expanding To", detail: "Expansion target in Year 2" },
  { value: "Year 3", label: "National Presence", detail: "Long-term scalability target" },
];

const milestones = [
  {
    year: "Year 1 (Current)",
    title: "Launch & Pilot",
    bullets: [
      "Launch Pilot Program in Orlando, FL",
      "Empower 100 Women through our core programs",
      "Establish 25+ Community Partnerships",
      "Build Infrastructure for scalable growth"
    ]
  },
  {
    year: "Year 2",
    title: "Expansion & Growth",
    bullets: [
      "Expand to 3 Additional States",
      "Deepen Program Offerings based on participant feedback",
      "Strengthen Partnerships with real estate and financial institutions",
      "Increase Corporate Sponsorships and grant funding"
    ]
  },
  {
    year: "Year 3",
    title: "National Sovereignty",
    bullets: [
      "Achieve National Presence",
      "Demonstrate Replicable Model for community-based homeownership support",
      "Build Endowment for long-term sustainability",
      "Advocate for Policy Change in affordable housing"
    ]
  }
];

const programImpacts = [
  {
    title: "Financial Literacy Workshops",
    subtitle: "Empowering Economic Independence",
    metrics: [
      { label: "Women trained in financial skills", value: "100+" },
      { label: "Average credit score improvement", value: "50+ points" },
      { label: "Women who created a savings plan", value: "85%" },
      { label: "Women who reduced debt", value: "70%" }
    ],
    quote: "I never understood credit until I attended SOAR's workshop. Now I know exactly what I need to do to qualify for a mortgage.",
    author: "Workshop Participant"
  },
  {
    title: "Homeownership Education",
    subtitle: "From Dream to Reality",
    metrics: [
      { label: "Completed homeownership education", value: "80+" },
      { label: "Entered the home buying process", value: "45+" },
      { label: "Families placed in energy-efficient homes", value: "25+" },
      { label: "Average home size", value: "3-4 bedrooms" }
    ],
    quote: "SOAR walked with me from a shelter to my very own front door. I finally have a home for my daughters — and a future.",
    author: "Amara J. (Atlanta, GA)"
  },
  {
    title: "Mentorship Program",
    subtitle: "Guidance That Changes Everything",
    metrics: [
      { label: "Women matched with mentors", value: "60+" },
      { label: "Mentor-mentee sessions conducted", value: "500+" },
      { label: "Women who achieved personal goals", value: "85%" },
      { label: "Women who became mentors themselves", value: "20+" }
    ],
    quote: "The mentorship changed everything. I launched my business, rebuilt my credit, and I'm about to close on my first house.",
    author: "Isabela R. (Orlando, FL)"
  },
  {
    title: "Family Support Services",
    subtitle: "Strengthening Families, Building Futures",
    metrics: [
      { label: "Families served through wraparound care", value: "50+" },
      { label: "Children supported through family programs", value: "100+" },
      { label: "Women connected to community resources", value: "90%" },
      { label: "Families reporting improved well-being", value: "95%" }
    ]
  },
  {
    title: "Affordable Housing Access",
    subtitle: "Keys to Independence",
    metrics: [
      { label: "Women who achieved homeownership", value: "25+" },
      { label: "Energy-efficient homes secured", value: "25+" },
      { label: "Down payment assistance provided", value: "$150,000+" },
      { label: "Equity built by families", value: "$500,000+" }
    ]
  }
];

const successStories = [
  {
    name: "Amara J.",
    location: "Atlanta, GA",
    tagline: "From Shelter to Homeowner",
    copy: "Amara came to SOAR after fleeing an unstable living situation with her two daughters. Through our Homeownership Education program, she learned about the real estate market, secured financing, and closed on her first home.",
    quote: "SOAR walked with me from a shelter to my very own front door. I finally have a home for my daughters — and a future. The support I received didn't stop at a workshop; it was a journey. They were with me every step of the way.",
    img: story1
  },
  {
    name: "Isabela R.",
    location: "Orlando, FL",
    tagline: "Rebuilding Credit, Rebuilding Life",
    copy: "Isabela had a dream of owning a business and a home, but her credit history held her back. Through our Financial Literacy Workshops and Mentorship Program, she rebuilt her credit, launched her business, and is now a proud homeowner.",
    quote: "The mentorship changed everything. I launched my business, rebuilt my credit, and I'm about to close on my first house. My mentor showed me what was possible and helped me believe in myself again.",
    img: story2
  },
  {
    name: "Denise M.",
    location: "Charlotte, NC",
    tagline: "Dreaming Again",
    copy: "After years of financial struggle, Denise had stopped believing that homeownership was possible for her. SOAR's comprehensive support — from financial literacy to one-to-one mentoring — gave her the tools and confidence she needed.",
    quote: "I dreamed again for the first time in years. SOAR gave me tools, sisters, and hope I can pass down. My children now see what's possible when you don't give up.",
    img: story3
  }
];

const transparency = [
  { label: "Annual Audits", desc: "Independent review of our financial records to ensure standard compliance." },
  { label: "Program Evaluations", desc: "Ongoing assessment and refinement of workshops and mentors." },
  { label: "Participant Feedback", desc: "Always listening to the women and partners we serve." },
  { label: "Board Oversight", desc: "Strategic governance and compliance by a dedicated Board." }
];

function OurImpact() {
  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Our Impact"
          title={<>A Movement Measured in <span className="text-gradient-brand italic font-extrabold">Lives Changed</span>.</>}
          subtitle="At SOAR Global Foundation Inc., we believe that true impact is measured not in numbers alone, but in the stories of women who have found their way home."
          bgImage={story2}
        />

        {/* Content Layout Wrapper: 95% Width Cohesive Style */}
        <section className="mx-auto max-w-[95%] px-6 pb-24 lg:px-10 mt-[50px] space-y-20 relative">
          <div className="absolute top-[15%] left-5 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          {/* By the Numbers Grid */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <BarChart className="size-3 text-primary" /> Key Results
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                By the Numbers
              </h2>
              <p className="mt-3 text-xs text-muted-foreground">
                Our work is grounded in measurable outcomes that demonstrate the power of our programs and the reach of our sisterhood.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass rounded-[24px] p-6 border border-white/50 shadow-soft text-center hover:border-primary/25 hover:shadow-elegant transition duration-300">
                  <div className="font-display text-4xl md:text-5xl font-extrabold text-gradient-brand leading-none">
                    {stat.value}
                  </div>
                  <h4 className="mt-3 text-sm font-extrabold text-foreground tracking-tight">{stat.label}</h4>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Milestones */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Growth Track</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2 font-display">Our Strategic Milestones</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                We are building a movement with clear, ambitious expansion targets:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {milestones.map((m, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 border border-white/50 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-border/40 pb-3 mb-4 flex justify-between items-center">
                      <span className="text-xs font-extrabold text-[#D4AF37] uppercase">{m.year}</span>
                      <span className="text-[10px] text-white/50 bg-[#3A0A63] font-bold px-2 py-0.5 rounded-full uppercase">Target</span>
                    </div>
                    <h3 className="text-base font-extrabold text-foreground mb-4 tracking-tight">{m.title}</h3>
                    <ul className="space-y-3">
                      {m.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-xs text-muted-foreground">
                          <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Program Impact Columns */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Program Outcomes</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2">Program Impact</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                Each of our five core programs delivers measurable results that change lives.
              </p>
            </div>

            <div className="space-y-8">
              {programImpacts.map((prog, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 md:p-8 border border-white/50 shadow-soft grid gap-8 lg:grid-cols-5 items-start">
                  <div className="lg:col-span-2 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Signature Program</span>
                    <h3 className="text-xl font-extrabold text-foreground tracking-tight">{prog.title}</h3>
                    <p className="text-xs text-[#3A0A63] font-semibold">{prog.subtitle}</p>
                    
                    {prog.quote && (
                      <div className="mt-6 border-l-2 border-[#D4AF37] pl-3 italic text-xs text-muted-foreground relative">
                        <Quote className="absolute right-2 top-0 size-8 text-black/5" />
                        <p>"{prog.quote}"</p>
                        <span className="block mt-2 text-[10px] font-bold text-foreground/80">— {prog.author}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="lg:col-span-3 grid gap-4 sm:grid-cols-2">
                    {prog.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex justify-between items-center shadow-sm">
                        <span className="text-xs text-muted-foreground max-w-[150px]">{m.label}</span>
                        <span className="text-lg font-extrabold text-primary leading-none shrink-0">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="size-3 text-accent" /> Testimonials
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground">
                Success Stories
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {successStories.map((story, idx) => (
                <div key={idx} className="glass rounded-[32px] p-6 border border-white/50 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-border/60 mb-5 shadow-sm">
                      <img src={story.img} alt={story.name} className="size-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{story.tagline}</span>
                    <h3 className="text-base font-extrabold text-foreground mt-1">{story.name}</h3>
                    <span className="text-[10px] text-muted-foreground">— {story.location}</span>
                    <p className="text-xs leading-relaxed text-muted-foreground mt-3">{story.copy}</p>
                  </div>
                  
                  <div className="mt-6 border-t border-border/40 pt-4 italic text-xs leading-relaxed text-[#3A0A63] font-medium">
                    "{story.quote}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners sectors callout */}
          <div className="space-y-6">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Collaborators</span>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Our Community Partners</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-xl mx-auto">
                We are proud to work alongside 25+ mission-aligned organizations that share our commitment:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "Real estate professionals and developers",
                "Financial institutions and credit counselors",
                "Community organizations and faith-based groups",
                "Corporate sponsors and philanthropic foundations"
              ].map((partner, idx) => (
                <span key={idx} className="glass px-4 py-2.5 rounded-full border border-white/50 text-xs font-semibold text-foreground/80">
                  🤝 {partner}
                </span>
              ))}
            </div>
          </div>

          {/* Transparency Panel & Next CTA */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Transparency */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Compliance</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Our Commitment to Transparency</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  We believe in accountability and open communication with all stakeholders:
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {transparency.map((item, idx) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-white/50">
                    <span className="text-xs font-extrabold text-foreground block">✔ {item.label}</span>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next CTA Deck */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-primary/15 flex flex-col justify-between relative overflow-hidden text-center">
              <div className="absolute right-[-10%] top-[-30%] w-[250px] h-[250px] rounded-full bg-accent/5 blur-[80px]" />
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Looking Forward</span>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight mt-1">What's Next?</h3>
                <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                  Expanding our reach to more states, deepening programs, and championing policy changes to make homeownership accessible.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 text-center max-w-sm mx-auto w-full">
                <Link to="/volunteer" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] transition shadow-sm cursor-pointer">
                  Volunteer
                </Link>
                <Link to="/donate" className="inline-flex items-center justify-center rounded-full border border-border bg-[#3A0A63] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#3A0A63]/90 transition shadow-sm">
                  Donate Now
                </Link>
              </div>

              <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed">
                Every statistic tells a story of courage, resilience, and hope. Thank you for being part of this movement.
              </p>
            </div>
          </div>

          {/* Quick Footer Links Deck */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-6">
            <Link to="/about" className="inline-flex items-center gap-1.5 hover:text-primary transition">
              <ArrowLeft className="size-3" /> Back to About Us
            </Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/our-story" className="hover:text-primary transition">Our Story</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/programs" className="hover:text-primary transition">Our Programs</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/meet-our-team" className="hover:text-primary transition">Meet Our Team</Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}
