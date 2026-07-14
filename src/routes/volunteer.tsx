import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Sparkles, Heart, Award, Users, BookOpen, Clock, CheckCircle2, ChevronDown, UserCheck, MessageSquare, ClipboardList, HelpingHand, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import programMentorImg from "@/assets/program-mentor.jpg";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — SOAR Global Foundation" },
      { name: "description", content: "Join the sisterhood of SOAR Global Foundation. Become a mentor, workshop facilitator, event planner, or ambassador." },
      { property: "og:title", content: "Volunteer — SOAR Global Foundation" },
      { property: "og:url", content: "/volunteer" },
    ],
    links: [{ rel: "canonical", href: "/volunteer" }],
  }),
  component: Volunteer,
});

const gains = {
  you: [
    { title: "Purpose", desc: "Contribute to a mission that changes lives" },
    { title: "Community", desc: "Join a supportive sisterhood of like-minded individuals" },
    { title: "Skills", desc: "Develop leadership, mentoring, and professional abilities" },
    { title: "Connection", desc: "Build meaningful relationships with women and families" },
    { title: "Impact", desc: "Witness the transformation you help create" }
  ],
  we: [
    { title: "Expertise", desc: "Access to diverse skills and perspectives" },
    { title: "Capacity", desc: "Ability to serve more women and families" },
    { title: "Energy", desc: "Fresh ideas and enthusiasm" },
    { title: "Community", desc: "Deeper roots in the neighborhoods we serve" }
  ]
};

const opportunities = [
  {
    num: "1",
    icon: UserCheck,
    title: "Mentor",
    category: "Support & Guidance",
    desc: "Mentors are the heart of our Mentorship Program. You will be matched with a woman who is working toward homeownership, providing one-to-one guidance, encouragement, and accountability.",
    bullets: [
      "Meet regularly with your mentee (in-person or virtual)",
      "Provide emotional support and practical advice",
      "Share your experience and resources",
      "Celebrate milestones and navigate challenges together"
    ],
    ideal: "Women who have navigated challenges and want to guide others; professionals with expertise in housing, finance, or career development",
    time: "2-4 hours per month"
  },
  {
    num: "2",
    icon: BookOpen,
    title: "Workshop Facilitator",
    category: "Education",
    desc: "Help women build critical skills in financial literacy, homeownership, and personal development.",
    bullets: [
      "Facilitate workshops on budgeting and credit building",
      "Guide home buying and mortgage readiness",
      "Lead career development and entrepreneurship classes",
      "Prepare materials and engage participants"
    ],
    ideal: "Professionals in finance, real estate, education, or counseling; experienced trainers and facilitators",
    time: "2-4 hours per workshop (varies by schedule)"
  },
  {
    num: "3",
    icon: Calendar,
    title: "Event Volunteer",
    category: "Community Engagement",
    desc: "Help us host events that connect, educate, and celebrate the women we serve.",
    bullets: [
      "Assist with event setup and breakdown",
      "Welcome and register attendees",
      "Manage activity stations and info tables",
      "Support speakers and presenters"
    ],
    ideal: "Energetic, organized individuals who enjoy community engagement",
    time: "2-6 hours per event (varies by schedule)"
  },
  {
    num: "4",
    icon: ClipboardList,
    title: "Administrative Support",
    category: "Behind the Scenes",
    desc: "Help keep our organization running smoothly with essential administrative support.",
    bullets: [
      "Assist with data entry and record keeping",
      "Help with donor communications and acknowledgments",
      "Support social media and content creation",
      "Organize materials and resources"
    ],
    ideal: "Detail-oriented individuals with administrative skills; remote and hybrid options available",
    time: "2-4 hours per week (flexible)"
  },
  {
    num: "5",
    icon: Sparkles,
    title: "Communications & Marketing",
    category: "Storytelling",
    desc: "Help us share the stories of the women we serve and the impact of our programs.",
    bullets: [
      "Write blog posts and success stories",
      "Manage social media accounts and graphics",
      "Assist with email newsletters and design",
      "Capture photos and videos at events"
    ],
    ideal: "Writers, designers, photographers, and marketing professionals",
    time: "2-5 hours per week (remote options available)"
  },
  {
    num: "6",
    icon: Heart,
    title: "Family Support Volunteer",
    category: "Community Care",
    desc: "Support our Family Support Services by helping families access resources and feel welcomed.",
    bullets: [
      "Assist with childcare during workshops and events",
      "Connect families to community resources",
      "Help with family engagement activities",
      "Provide friendly, welcoming support to parents and children"
    ],
    ideal: "Individuals with experience in childcare, social work, or family services; warm, compassionate volunteers",
    time: "2-4 hours per month"
  },
  {
    num: "7",
    icon: Users,
    title: "Community Ambassador",
    category: "Outreach & Advocacy",
    desc: "Help us expand our reach by connecting SOAR to new communities, partners, and supporters.",
    bullets: [
      "Represent SOAR at community events and meetings",
      "Share information about our programs",
      "Build relationships with potential partners",
      "Recruit volunteers and donors"
    ],
    ideal: "Well-connected, passionate individuals who love networking and community building",
    time: "2-5 hours per month (flexible)"
  },
  {
    num: "8",
    icon: HelpingHand,
    title: "Professional Services",
    category: "Pro Bono Support",
    desc: "Share your professional expertise to strengthen our organization.",
    bullets: [
      "Legal services (nonprofit, real estate, employment law)",
      "Accounting, bookkeeping, and strategic consulting",
      "Human resources support and strategic planning",
      "Grant writing and research"
    ],
    ideal: "Professionals who want to contribute their specialized skills",
    time: "Varies based on project"
  }
];

const requirements = [
  "Complete a volunteer application",
  "Pass a background check",
  "Attend a volunteer orientation",
  "Sign a confidentiality agreement",
  "Adhere to our Code of Conduct and Conflict of Interest Policy"
];

const testimonials = [
  { quote: "Volunteering with SOAR has been one of the most rewarding experiences of my life. Seeing the women I mentor gain confidence and achieve their goals reminds me why this work matters.", author: "Sarah M.", role: "Mentor" },
  { quote: "I came to SOAR to give back, but I received so much more. The sisterhood, the purpose, the joy of watching a woman close on her first home — it's indescribable.", author: "Lisa R.", role: "Workshop Facilitator" },
  { quote: "As a corporate volunteer, my team and I were able to facilitate a financial literacy workshop for 20 women. Watching them engage, ask questions, and leave with actionable plans was incredible.", author: "James T.", role: "Corporate Volunteer" }
];

const faqs = [
  { q: "Do I need experience to volunteer?", a: "Not at all. We welcome volunteers of all backgrounds and experience levels. We provide training and support for every role." },
  { q: "How much time do I need to commit?", a: "Volunteer roles range from one-time event support to ongoing commitments. We will work with you to find a schedule that fits your life." },
  { q: "Are there remote volunteer opportunities?", a: "Yes. Many of our communications, marketing, and administrative roles can be performed remotely." },
  { q: "Can I volunteer as a group?", a: "Absolutely. We welcome corporate teams, community groups, and organizations." },
  { q: "Is there an age requirement?", a: "Volunteers must be at least 18 years old. Some roles (like childcare/mentorship) may have additional requirements." },
  { q: "Do you offer volunteer hours verification?", a: "Yes. We are happy to provide documentation for service hours, community service requirements, and professional development." }
];

function Volunteer() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Volunteer"
          title={<>Join the Sisterhood. <span className="text-gradient-brand italic font-extrabold">Help Women Rise</span>.</>}
          subtitle="At SOAR Global Foundation Inc., we believe that every woman has something to give — and something to gain — through the power of service."
          bgImage={programMentorImg}
        />

        {/* Content Layout Wrapper: 95% Width Cohesive Style */}
        <section className="mx-auto max-w-[95%] px-6 pb-24 lg:px-10 mt-[50px] space-y-20 relative">
          <div className="absolute top-[8%] left-5 w-[650px] h-[650px] rounded-full bg-primary/5 blur-[125px] pointer-events-none" />

          {/* Intro Card */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft text-center max-w-4xl mx-auto">
            <p className="text-sm md:text-base leading-relaxed text-[#3A0A63] font-semibold">
              "When you volunteer with SOAR, you are not just giving your time. You are joining a movement of women and allies who believe that no woman should walk her hardest road alone."
            </p>
          </div>

          {/* Why Volunteer Gain/Loss Deck */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* What You Gain */}
            <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-soft">
              <div className="border-b border-border/40 pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Purposeful Value</span>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight mt-1">What You Gain</h3>
              </div>
              <ul className="space-y-3">
                {gains.you.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs text-muted-foreground">
                    <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block">{item.title}</strong>
                      <span className="text-[11px] text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Gain */}
            <div className="glass rounded-[28px] p-6 md:p-8 border border-[#D4AF37]/20 shadow-soft">
              <div className="border-b border-border/40 pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Multiplier Effect</span>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight mt-1">What We Gain</h3>
              </div>
              <ul className="space-y-3">
                {gains.we.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs text-muted-foreground">
                    <CheckCircle2 className="size-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block">{item.title}</strong>
                      <span className="text-[11px] text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Volunteer Opportunities Grid */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Volunteer Opportunities</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2">Available Roles</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                We offer a variety of volunteer roles to accommodate different interests, skills, and time commitments.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {opportunities.map((role, idx) => (
                <div key={idx} className="glass rounded-[32px] p-6 md:p-8 border border-white/50 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/15">
                        {role.category}
                      </span>
                      <span className="font-display text-4xl font-extrabold text-[#D4AF37]/20">0{role.num}</span>
                    </div>
                    
                    <h3 className="text-lg font-extrabold text-foreground tracking-tight flex items-center gap-2">
                      <role.icon className="size-5 text-primary shrink-0" />
                      <span>{role.title}</span>
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{role.desc}</p>
                    
                    <ul className="space-y-2 mt-4">
                      {role.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start text-[11px] text-muted-foreground">
                          <span className="text-primary mt-0.5">✔</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-border/40 text-[10px] text-muted-foreground space-y-1">
                      <div>💡 <strong>Ideal For:</strong> {role.ideal}</div>
                      <div>⏰ <strong>Time Commitment:</strong> {role.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements, Training, Recognition Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Requirements */}
            <div className="glass rounded-[28px] p-6 border border-white/60 shadow-soft">
              <h4 className="text-sm font-extrabold text-foreground tracking-tight mb-4 flex items-center gap-1.5">
                🔒 Requirements
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                {requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex gap-2 items-start">
                    <span className="text-primary">✔</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border/40 text-[9px] text-muted-foreground">
                * Background checks andOrientation completions are mandatory.
              </div>
            </div>

            {/* Training */}
            <div className="glass rounded-[28px] p-6 border border-white/60 shadow-soft">
              <h4 className="text-sm font-extrabold text-foreground tracking-tight mb-4 flex items-center gap-1.5">
                🎓 Volunteer Training
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                {[
                  "Comprehensive Orientation — Learn about SOAR's mission, programs, and values",
                  "Role-Specific Training — Gain the skills and knowledge needed for your role",
                  "Ongoing Support — Check-ins with our volunteer coordinator",
                  "Appreciation Events — Celebrate your contributions with our community"
                ].map((t, tIdx) => (
                  <li key={tIdx} className="flex gap-2 items-start">
                    <span className="text-primary">✔</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recognition */}
            <div className="glass rounded-[28px] p-6 border border-[#D4AF37]/20 shadow-soft">
              <h4 className="text-sm font-extrabold text-foreground tracking-tight mb-4 flex items-center gap-1.5">
                ⭐ Volunteer Recognition
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                {[
                  "Certificate of Service — Documenting your hours and impact",
                  "Annual Volunteer Appreciation Event — Celebrating our volunteers",
                  "Social Media Spotlight — Featuring our dedicated volunteers",
                  "Newsletter Recognition — Sharing your story with our community",
                  "Referral Opportunities — Connecting you to professional networks"
                ].map((rec, recIdx) => (
                  <li key={recIdx} className="flex gap-2 items-start">
                    <span className="text-[#D4AF37]">✔</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Group and Internships Split Panel */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Group Volunteering */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-foreground tracking-tight">Group Volunteering</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  We welcome corporate teams, community organizations, and faith-based groups for group volunteering opportunities.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 text-[10px]">
                  {["Workshop assistance", "Event support", "Resource drives", "Facility beautification", "Family engagement"].map((act, aIdx) => (
                    <span key={aIdx} className="inline-block px-2.5 py-1 rounded-full bg-slate-50 border border-border/60 text-muted-foreground font-semibold">
                      🤝 {act}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link to="/contact" className="text-xs font-bold text-primary hover:text-accent transition">
                  Contact Us About Group Volunteering →
                </Link>
              </div>
            </div>

            {/* Internships */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-foreground tracking-tight">Internships</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  SOAR offers internship opportunities for students and recent graduates interested in nonprofit management, social work, community development, and related fields.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 text-[10px]">
                  {["Program coordination", "Communications and marketing", "Development and fundraising", "Research and evaluation"].map((intern, iIdx) => (
                    <span key={iIdx} className="inline-block px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold">
                      🎓 {intern}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link to="/contact" className="text-xs font-bold text-primary hover:text-accent transition">
                  Learn About Internships →
                </Link>
              </div>
            </div>
          </div>

          {/* Step process Timeline */}
          <div className="space-y-8">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Join Us</span>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Apply to Volunteer</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-4 text-center">
              {[
                { step: "Step 1", title: "Complete Application", desc: "Fill out the volunteer form online." },
                { step: "Step 2", title: "Attend Orientation", desc: "Schedule and join our volunteer orientation." },
                { step: "Step 3", title: "Get Matched", desc: "We match your skills to available roles." },
                { step: "Step 4", title: "Make an Impact", desc: "Begin your journey helping women rise." }
              ].map((item, idx) => (
                <div key={idx} className="bg-primary/5 border border-primary/10 rounded-2xl p-5 shadow-sm">
                  <span className="text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-wider block mb-1">{item.step}</span>
                  <span className="text-xs font-extrabold text-foreground block">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground block mt-1 leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer">
                Apply to Volunteer Now <HelpingHand className="size-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Volunteer Testimonials */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Testimonials</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground">
                Volunteer Experiences
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((test, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 border border-white/50 shadow-soft hover:-translate-y-0.5 transition duration-300 flex flex-col justify-between">
                  <p className="text-xs italic text-[#3A0A63] font-medium leading-relaxed">
                    "{test.quote}"
                  </p>
                  <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-4">
                    <div className="size-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-bold text-foreground">{test.author}</span>
                    <span className="text-[10px] text-muted-foreground">— {test.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-6">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">FAQ</span>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Frequently Asked Questions</h3>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="glass rounded-2xl border border-white/60 shadow-soft overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-xs text-foreground hover:bg-slate-50 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground border-t border-border/20 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contacts Coordinator deck */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-primary shrink-0" />
              <div className="text-xs">
                <strong className="text-foreground block">Location</strong>
                <span className="text-muted-foreground">3311 N Powers Dr, Orlando, FL 32818</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-primary shrink-0" />
              <div className="text-xs">
                <strong className="text-foreground block">Phone</strong>
                <span className="text-muted-foreground">(321) 710-7145</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-primary shrink-0" />
              <div className="text-xs">
                <strong className="text-foreground block">Email</strong>
                <span className="text-muted-foreground">sistersoar14@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Footer Quick Links */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-6">
            <Link to="/donate" className="hover:text-primary transition">Donate Now</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/volunteer" className="hover:text-primary transition">Get Involved</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/programs" className="hover:text-primary transition">Our Programs</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/contact" className="hover:text-primary transition">Contact Us</Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
