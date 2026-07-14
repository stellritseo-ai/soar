import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Shield, BookOpen, Landmark, Heart, UserCheck, Users, TrendingUp, Handshake, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import programFinancialImg from "@/assets/program-financial.jpg";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How We Work — SOAR Global Foundation" },
      { name: "description", content: "Discover SOAR's holistic support model: Six Pillars, Core Programs, Financial Model, and Governance." },
      { property: "og:title", content: "How We Work — SOAR Global Foundation" },
      { property: "og:url", content: "/how-we-work" },
    ],
    links: [{ rel: "canonical", href: "/how-we-work" }],
  }),
  component: HowWeWork,
});

const pillars = [
  { icon: Shield, title: "Empowerment", copy: "Unlocking confidence, agency, and lasting personal power" },
  { icon: BookOpen, title: "Education", copy: "Providing practical knowledge and vocational training for economic independence" },
  { icon: Landmark, title: "Affordable Housing", copy: "Creating clear pathways to safe, dignified, and permanent homeownership" },
  { icon: Heart, title: "Financial Literacy", copy: "Teaching budgeting, saving, credit building, and investing for generational wealth" },
  { icon: UserCheck, title: "Mentorship", copy: "Establishing lifelong relationships and support networks" },
  { icon: Users, title: "Community", copy: "Fostering a supportive sisterhood that rises together" },
];

const programs = [
  {
    num: "1",
    title: "Financial Literacy Workshops",
    category: "Education",
    bullets: [
      "Budgeting and money management",
      "Credit building and repair",
      "Saving strategies for a down payment",
      "Understanding mortgages and loan options",
      "Investing and building generational wealth"
    ],
    summary: "Women leave with a personalized financial action plan and the confidence to take control of their economic future."
  },
  {
    num: "2",
    title: "Homeownership Education",
    category: "Housing",
    bullets: [
      "Understanding the real estate market",
      "Navigating pre-approval and financing",
      "Working with real estate professionals",
      "Home inspections and closing processes",
      "Maintaining homeownership and building equity"
    ],
    summary: "We partner with trusted real estate professionals to ensure women have access to energy-efficient, affordable homes."
  },
  {
    num: "3",
    title: "Mentorship Program",
    category: "Support",
    bullets: [
      "One-to-one guidance and accountability",
      "Career and personal development support",
      "Connection to resources and networks",
      "Encouragement through challenges and celebrations"
    ],
    summary: "Our mentors are women who have overcome adversity themselves and are committed to lifting others."
  },
  {
    num: "4",
    title: "Family Support Services",
    category: "Community",
    bullets: [
      "Wraparound care for mothers and children",
      "Access to childcare and educational resources",
      "Counseling and emotional support",
      "Connection to community services and benefits",
      "Family engagement activities and workshops"
    ],
    summary: "When a woman thrives, her family thrives."
  },
  {
    num: "5",
    title: "Affordable Housing Access",
    category: "Housing",
    bullets: [
      "Partnering with developers and real estate professionals",
      "Identifying energy-efficient 3-4 bedroom homes",
      "Assisting with down payment and closing cost support",
      "Advocating for affordable housing policies",
      "Building a network of housing resources"
    ],
    summary: "Our goal is to make homeownership accessible, not aspirational."
  }
];

const revenues = [
  { source: "Commission-based Real Estate Partnerships", desc: "Ethical collaborations with real estate professionals" },
  { source: "Service Fees for Programs", desc: "Sliding-scale fees for workshops and services" },
  { source: "Corporate Sponsorships and Grants", desc: "Partnerships with mission-aligned organizations" },
  { source: "Individual Donations", desc: "Generous contributions from community supporters" }
];

const boardStructure = [
  { role: "President", desc: "Chief Executive Officer, strategic leadership" },
  { role: "Vice President", desc: "Program oversight, fundraising strategy" },
  { role: "Secretary", desc: "Governance, records, compliance" },
  { role: "Directors", desc: "Strategic partnerships, planning, accountability" }
];

const partnerSectors = [
  "Real estate professionals and developers",
  "Financial institutions and credit counselors",
  "Community organizations and faith-based groups",
  "Corporate sponsors and philanthropic foundations",
  "Government agencies and housing authorities"
];

const commitments = [
  { label: "Transparency", desc: "Open communication with all stakeholders" },
  { label: "Integrity", desc: "Ethical practices in all we do" },
  { label: "Dignity", desc: "Honoring every woman's journey with respect" },
  { label: "Excellence", desc: "Delivering high-quality programs and services" },
  { label: "Impact", desc: "Creating measurable, lasting change" }
];

function HowWeWork() {
  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="How We Work"
          title={<>Bridges from Survival to <span className="text-gradient-brand italic font-extrabold">Sovereignty</span>.</>}
          subtitle="At SOAR Global Foundation Inc., we believe that sustainable change requires more than good intentions — it requires a structured, holistic approach that addresses the whole woman."
          bgImage={programFinancialImg}
        />

        {/* Content Outer Container: 95% Width Cohesive Style */}
        <section className="mx-auto max-w-[95%] px-6 pb-24 lg:px-10 mt-[50px] space-y-20 relative">
          <div className="absolute top-[10%] right-5 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          
          {/* Approach Section */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Pillar Framework</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2">Our Approach</h2>
              <p className="text-sm leading-relaxed text-muted-foreground mt-3 max-w-3xl">
                We don't offer quick fixes. We offer comprehensive, wraparound support that empowers women to build lasting independence. Our approach addresses the interconnected challenges women face — financial, educational, emotional, and social — and provides the tools and resources needed to overcome them.
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="glass rounded-[24px] p-6 border border-white/50 shadow-soft hover:-translate-y-0.5 transition duration-300">
                  <div className="size-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center border border-primary/10 mb-4">
                    <pillar.icon className="size-5" />
                  </div>
                  <h4 className="text-base font-extrabold text-foreground tracking-tight">{pillar.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Programs */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Core Delivery</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2 font-display">Our Core Programs</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                We deliver our mission through five signature programs, each designed to address a critical need in a woman's journey toward homeownership.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((prog, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 border border-white/50 shadow-soft flex flex-col justify-between hover:shadow-elegant transition duration-300">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/15">
                        {prog.category}
                      </span>
                      <span className="font-display text-4xl font-extrabold text-[#D4AF37]/20">0{prog.num}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-foreground tracking-tight mb-4">{prog.title}</h3>
                    
                    <ul className="space-y-2.5 mb-6">
                      {prog.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-xs text-muted-foreground">
                          <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="text-xs leading-relaxed text-[#3A0A63] font-semibold border-t border-border/40 pt-4 mt-2">
                    {prog.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Financial & Impact Section Split */}
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Financial Model */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Sustainability</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Our Financial Model</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  We believe in sustainability and transparency. Our operations are funded through a diversified financial model:
                </p>
              </div>

              <div className="glass rounded-2xl overflow-hidden border border-white/60 shadow-soft">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b border-border/60">
                      <th className="p-4 font-bold text-foreground">Revenue Source</th>
                      <th className="p-4 font-bold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenues.map((rev, idx) => (
                      <tr key={idx} className="border-b border-border/40 last:border-none hover:bg-primary/5 transition-colors">
                        <td className="p-4 font-semibold text-primary">{rev.source}</td>
                        <td className="p-4 text-muted-foreground">{rev.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Impact Framework */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Framework</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">How We Measure Success</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  We are committed to accountability and continuous improvement. Our impact is measured through:
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Quantitative Metrics", desc: "Number of women served, homes purchased, credit scores improved" },
                  { title: "Qualitative Outcomes", desc: "Client testimonials, personal stories of transformation" },
                  { title: "Program Evaluation", desc: "Ongoing assessment and refinement of our curriculum" },
                  { title: "Community Feedback", desc: "Listening to the women and partners we serve" }
                ].map((item, idx) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-white/50">
                    <span className="text-xs font-extrabold text-foreground block">{item.title}</span>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Annual Goals Timeline */}
              <div className="bg-gradient-to-r from-primary to-[#3A0A63] text-white rounded-2xl p-5 shadow-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Annual Goals</span>
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="border-r border-white/15 pr-1">
                    <span className="text-[10px] text-white/50 block font-bold">Year 1</span>
                    <span className="text-sm font-extrabold block mt-1">Orlando</span>
                    <span className="text-[10px] text-white/70 block">100 Women</span>
                  </div>
                  <div className="border-r border-white/15 px-1">
                    <span className="text-[10px] text-white/50 block font-bold">Year 2</span>
                    <span className="text-sm font-extrabold block mt-1">+3 States</span>
                    <span className="text-[10px] text-white/70 block">Expansion</span>
                  </div>
                  <div className="pl-1">
                    <span className="text-[10px] text-white/50 block font-bold">Year 3</span>
                    <span className="text-sm font-extrabold block mt-1">National</span>
                    <span className="text-[10px] text-white/70 block">Presence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Governance & Board Structure */}
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Governance</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">How We Operate</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  SOAR Global Foundation Inc. is governed by a dedicated Board of Directors that oversees all aspects of the organization:
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Strategic Direction", desc: "Setting long-term goals and priorities" },
                  { title: "Financial Oversight", desc: "Approving budgets, reviewing financial statements, ensuring effective resource allocation" },
                  { title: "Program Accountability", desc: "Monitoring program outcomes and impact" },
                  { title: "Compliance", desc: "Ensuring adherence to all statutory and regulatory requirements" }
                ].map((gov, idx) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-white/50">
                    <div className="flex gap-2 items-center">
                      <div className="size-1.5 rounded-full bg-primary" />
                      <span className="text-xs font-extrabold text-foreground">{gov.title}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{gov.desc}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-xl p-4 border border-primary/10 bg-primary/5 text-xs text-primary leading-relaxed font-semibold">
                🔔 Annual Audit: An independent auditor reviews our financial records annually to maintain standard regulatory accountability.
              </div>
            </div>

            {/* Board Structure */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Structure</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Board Roles</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Officer and director layouts serving key operational goals:
                </p>
              </div>

              <div className="glass rounded-2xl overflow-hidden border border-white/60 shadow-soft">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b border-border/60">
                      <th className="p-4 font-bold text-foreground">Officer</th>
                      <th className="p-4 font-bold text-foreground">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boardStructure.map((b, idx) => (
                      <tr key={idx} className="border-b border-border/40 last:border-none hover:bg-primary/5 transition-colors">
                        <td className="p-4 font-semibold text-primary">{b.role}</td>
                        <td className="p-4 text-muted-foreground">{b.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Partnerships Grid */}
          <div className="space-y-6">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Collaborations</span>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Our Partnerships</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-xl mx-auto">
                We cannot do this work alone. We are proud to collaborate with key industry sectors:
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {partnerSectors.map((sector, idx) => (
                <div key={idx} className="glass px-5 py-3.5 rounded-full border border-white/50 text-xs font-semibold text-foreground/80 flex items-center gap-2 shadow-sm hover:border-primary/20 hover:text-primary transition duration-300">
                  <Handshake className="size-4 text-primary shrink-0" />
                  <span>{sector}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs italic text-muted-foreground tracking-wider uppercase mt-4">
              Together, we are building a movement — one woman, one home, one dream at a time.
            </p>
          </div>

          {/* CTA Banner & Commitments */}
          <div className="glass rounded-[32px] p-8 md:p-12 shadow-elegant border border-primary/15 relative overflow-hidden text-center">
            <div className="absolute left-[-10%] top-[-30%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Get Involved</h3>
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Unlock hope. Support can represent financial donations, volunteer hours, partnership alignments, or participant referrals:
            </p>
            
            {/* Get Involved Options List */}
            <div className="grid gap-3 sm:grid-cols-5 max-w-4xl mx-auto mt-6 text-center">
              {[
                { title: "Donate", desc: "Your gift plants seeds of hope" },
                { title: "Volunteer", desc: "Share your time and talents" },
                { title: "Partner", desc: "Align your organization" },
                { title: "Sponsor", desc: "Support programs & events" },
                { title: "Refer", desc: "Connect women in need" }
              ].map((item, idx) => (
                <div key={idx} className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                  <span className="text-xs font-bold text-primary block">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground block mt-1">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Quick Commitments Tags */}
            <div className="mt-10 pt-8 border-t border-border/40">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-4">Our Commitment</span>
              <div className="flex flex-wrap justify-center gap-4">
                {commitments.map((c, idx) => (
                  <div key={idx} className="text-left max-w-[160px] p-1">
                    <span className="text-xs font-bold text-foreground block">{c.label}</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 pt-6">
              <Link to="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer">
                Get Involved
              </Link>
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full border border-border bg-[#3A0A63] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#3A0A63]/90 transition shadow-sm">
                Donate Now
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/5 transition shadow-sm">
                Contact Us <ChevronRight className="size-3.5" />
              </Link>
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
