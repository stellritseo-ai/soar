import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Calendar, MapPin, Ticket, Clock, Award, ShieldAlert, Sparkles, BookOpen, Star, Newspaper, Radio, Phone, Mail, FileDown, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import programFamilyImg from "@/assets/program-family.jpg";

export const Route = createFileRoute("/news-and-events")({
  head: () => ({
    meta: [
      { title: "News & Events — SOAR Global Foundation" },
      { name: "description", content: "Stay updated with featured galas, workshops, news coverage, and media resources from SOAR Global Foundation." },
      { property: "og:title", content: "News & Events — SOAR Global Foundation" },
      { property: "og:url", content: "/news-and-events" },
    ],
    links: [{ rel: "canonical", href: "/news-and-events" }],
  }),
  component: NewsAndEvents,
});

const upcomingEvents = [
  {
    title: "Financial Freedom Workshop",
    category: "Education",
    desc: "Learn practical strategies for budgeting, credit building, and wealth creation in this interactive virtual workshop. Perfect for women who are ready to take control of their financial future.",
    date: "November 15, 2026",
    time: "2:00 PM – 4:00 PM",
    loc: "Virtual (Interactive Zoom)",
    cost: "Free",
    btnText: "Register Now"
  },
  {
    title: "Community Sisterhood Circle",
    category: "Mentorship & Support",
    desc: "Join us for an evening of connection, encouragement, and shared wisdom. Our Sisterhood Circle brings women together to share experiences, celebrate successes, and lift one another up.",
    date: "December 5, 2026",
    time: "6:00 PM – 8:30 PM",
    loc: "SOAR HQ, Orlando, FL",
    cost: "Free",
    btnText: "Register Now"
  },
  {
    title: "Homeownership Education Fair",
    category: "Housing",
    desc: "A comprehensive event connecting women with real estate professionals, financial institutions, and housing resources. Learn everything you need to know about buying your first home.",
    date: "January 2027 (Date TBA)",
    loc: "Orlando, FL",
    cost: "Free",
    btnText: "Stay Tuned"
  },
  {
    title: "Volunteer Appreciation Brunch",
    category: "Community",
    desc: "A special event to honor and celebrate the dedicated volunteers who make our work possible. Join us for fellowship, recognition, and gratitude.",
    date: "February 2027 (Date TBA)",
    loc: "SOAR HQ, Orlando, FL",
    cost: "Invitation Only",
    btnText: "Invitation Only"
  },
  {
    title: "Annual Board Meeting",
    category: "Governance",
    desc: "SOAR's Annual Board Meeting for reviewing the past year's activities, electing officers, and addressing strategic goals for the upcoming year.",
    date: "TBA",
    loc: "SOAR HQ, Orlando, FL",
    cost: "Board Members",
    btnText: "Governance Meeting"
  }
];

const newsList = [
  {
    title: "SOAR Global Foundation Inc. Celebrates First Year of Impact",
    date: "January 2026",
    excerpt: "Orlando, FL — SOAR Global Foundation Inc. marked its first anniversary with a celebration of the 100+ women empowered through its programs. President Myrtle Dixon announced the organization's expansion plans for Year 2, including reaching three additional states."
  },
  {
    title: "State Representative Lisa Dunkley to Keynote Purple Hearts Gala",
    date: "December 2025",
    excerpt: "The SOAR community is honored to announce that State Representative Lisa Dunkley will deliver the keynote address at the upcoming Purple Hearts Gala. Representative Dunkley has been a passionate advocate for affordable housing."
  },
  {
    title: "Homeownership Education Program Graduates First Cohort",
    date: "November 2025",
    excerpt: "Fifteen women graduated from SOAR's inaugural Homeownership Education Program, with several already in the process of purchasing their first homes. The program provides comprehensive education on the home buying process."
  },
  {
    title: "SOAR Expands Mentorship Program to Meet Growing Demand",
    date: "October 2025",
    excerpt: "Due to overwhelming demand, SOAR has expanded its Mentorship Program, matching 60 women with dedicated mentors. The program provides one-to-one guidance on personal development, career goals, and home buying journeys."
  },
  {
    title: "Financial Literacy Workshops Reach 100 Women",
    date: "September 2025",
    excerpt: "SOAR's Financial Literacy Workshops have reached a milestone, empowering 100 women with practical skills in budgeting, credit building, and wealth creation. Workshops are offered monthly."
  },
  {
    title: "SOAR Global Foundation Inc. Officially Launches",
    date: "September 2025",
    excerpt: "SOAR Global Foundation Inc. was officially established with a mission to empower women through education, mentorship, and pathways to homeownership. The organization held its inaugural Board meeting."
  }
];

const pressReleases = [
  { title: "SOAR Global Foundation Inc. Announces 2026 Strategic Priorities", date: "January 2026", desc: "SOAR announces its strategic priorities for Year 2, including expansion to three additional states, strengthening community partnerships, and deepening program offerings." },
  { title: "SOAR Global Foundation Inc. Launches Affordable Housing Initiative", date: "October 2025", desc: "In partnership with local real estate professionals and financial institutions, SOAR launched an Affordable Housing Initiative to create clear pathways to homeownership." },
  { title: "SOAR Global Foundation Inc. Receives First Corporate Sponsorship", date: "September 2025", desc: "SOAR is proud to announce its first corporate sponsorship, enabling the organization to expand its programs and reach more women in the Orlando community." }
];

const newsCoverage = [
  { outlet: "Local News Channel", title: "SOAR Global Foundation Empowers Women Through Homeownership", date: "January 2026", type: "Video Broadcast" },
  { outlet: "Community Newspaper", title: "Women Find Hope and Home Through SOAR", date: "December 2025", type: "Feature Story" },
  { outlet: "Radio Interview", title: "Myrtle Dixon Discusses SOAR's Mission on Local Radio", date: "November 2025", type: "Audio Broadcast" }
];

const calendarGlance = [
  { date: "October 24, 2026", name: "Purple Hearts Gala", loc: "Greater Vision Center, Ocoee, FL" },
  { date: "November 15, 2026", name: "Financial Freedom Workshop", loc: "Virtual (Zoom)" },
  { date: "December 5, 2026", name: "Community Sisterhood Circle", loc: "SOAR HQ, Orlando, FL" },
  { date: "January 2027 (TBA)", name: "Homeownership Education Fair", loc: "Orlando, FL" },
  { date: "February 2027 (TBA)", name: "Volunteer Appreciation Brunch", loc: "SOAR HQ, Orlando, FL" }
];

function NewsAndEvents() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="News & Events"
          title={<>Stories of Impact. <span className="text-gradient-brand italic font-extrabold">Moments of Connection</span>.</>}
          subtitle="Stay connected with the latest happenings at SOAR. From inspiring success stories to upcoming events that bring our community together."
          bgImage={programFamilyImg}
        />

        {/* Content Layout: 95% Width Cohesive Style */}
        <section className="mx-auto max-w-[95%] px-6 pb-24 lg:px-10 mt-[50px] space-y-20 relative">
          <div className="absolute top-[8%] left-10 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          {/* Featured Event Card: Purple Hearts Gala */}
          <div className="glass rounded-[32px] p-6 md:p-10 border border-[#D4AF37]/35 shadow-elegant relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#D4AF37] to-primary" />
            
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  🌟 Featured Event
                </span>
                <h3 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Purple Hearts Gala</h3>
                <p className="text-xs text-[#3A0A63] font-bold uppercase tracking-wider">A Night of Honor, Inspiration & Celebration</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Join us for our signature annual benefit — an evening dedicated to honoring outstanding women making a difference in our community. The Purple Hearts Gala is more than an event; it is a celebration of resilience, sisterhood, and the transformative power of homeownership.
                </p>
                
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-[11px] text-muted-foreground space-y-2">
                  <div className="flex gap-2"><strong>Keynote Speaker:</strong> State Representative Lisa Dunkley</div>
                  <div className="flex gap-2"><strong>Special Guest:</strong> Psalmist Minister Blessing Chigozie</div>
                  <div className="flex gap-2"><strong>Benefit:</strong> Benefiting the SOAR Pathways Program</div>
                </div>
              </div>

              {/* Event Coordinates Deck */}
              <div className="bg-slate-50/80 border border-border/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Date:</strong> Saturday, October 24, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Time:</strong> 5:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Location:</strong> Greater Vision Center, Ocoee, FL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Contribution:</strong> $50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Attire:</strong> Purple & Gold Formal</span>
                  </div>
                </div>
                
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-primary to-accent py-3 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] transition shadow-soft cursor-pointer">
                  Get Tickets Now
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Events Grid */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Schedule</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2 font-display">Upcoming Events</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                Gather, learn, and collaborate with the SOAR community through our upcoming events:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((evt, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 border border-white/50 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/15">
                        {evt.category}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-foreground tracking-tight">{evt.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{evt.desc}</p>
                    
                    <div className="bg-slate-50 border border-border/40 rounded-xl p-3 text-[10px] text-muted-foreground space-y-2">
                      <div className="flex items-center gap-1.5"><Calendar className="size-3.5 text-[#D4AF37]" /> {evt.date}</div>
                      {evt.time && <div className="flex items-center gap-1.5"><Clock className="size-3.5 text-[#D4AF37]" /> {evt.time}</div>}
                      <div className="flex items-center gap-1.5"><MapPin className="size-3.5 text-[#D4AF37]" /> {evt.loc}</div>
                      {evt.cost && <div className="flex items-center gap-1.5"><strong>Cost:</strong> {evt.cost}</div>}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 mt-6 flex justify-between items-center text-xs">
                    <Link to="/contact" className="font-bold text-primary hover:text-accent transition">
                      {evt.btnText} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News & Updates Grid */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Journal</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2">News & Updates</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                Stay updated with reports, cohorts milestones, and announcements:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsList.map((news, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 border border-white/50 shadow-soft flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold text-[#D4AF37] uppercase">{news.date}</span>
                    <h3 className="text-sm font-extrabold text-foreground leading-snug">{news.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-4">{news.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-border/40 mt-4">
                    <Link to="/blog" className="text-xs font-bold text-primary hover:text-accent transition">
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Press Releases & In the News split */}
          <div className="grid gap-10 lg:grid-cols-2 items-stretch">
            {/* Press Releases */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Media Room</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Press Releases</h3>
              </div>

              <div className="space-y-4">
                {pressReleases.map((release, idx) => (
                  <div key={idx} className="glass rounded-2xl p-5 border border-white/60 shadow-soft space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-extrabold text-[#D4AF37] uppercase">{release.date}</span>
                      <span className="font-bold text-muted-foreground uppercase">PR Release</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-foreground">{release.title}</h4>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">{release.desc}</p>
                    
                    <button className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:text-accent transition mt-2 cursor-pointer">
                      <FileDown className="size-3.5" /> Download Press Release
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* In the News */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Coverage</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">In the News</h3>
              </div>

              <div className="space-y-4">
                {newsCoverage.map((item, idx) => (
                  <div key={idx} className="glass rounded-2xl p-5 border border-white/60 shadow-soft space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-[#3A0A63] bg-[#3A0A63]/5 px-2 py-0.5 rounded uppercase font-semibold">{item.outlet}</span>
                      <span className="text-muted-foreground uppercase">{item.date}</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-foreground">{item.title}</h4>
                    
                    <div className="pt-2 border-t border-border/20 flex justify-between items-center text-[10px] text-muted-foreground">
                      <span>Format: {item.type}</span>
                      <Link to="/contact" className="font-bold text-primary hover:text-accent transition">
                        {item.outlet === "Radio Interview" ? "Listen Now →" : "Read More →"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Kit & Journalist resource desk */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft max-w-4xl mx-auto grid gap-6 md:grid-cols-[1.5fr_1fr] items-center">
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-foreground tracking-tight">For Journalists & Media</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We welcome inquiries from members of the media. Contact us for interview opportunities, organizational fact sheets, logos, and high-res assets.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-[10px] text-muted-foreground">
                <span>📞 (321) 710-7145</span>
                <span>✉ sistersoar14@gmail.com</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] transition shadow-soft cursor-pointer">
                <FileDown className="size-4" /> Download Media Kit
              </button>
            </div>
          </div>

          {/* Calendar at a Glance Table */}
          <div className="space-y-6">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Roadmap</span>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Calendar at a Glance</h3>
            </div>

            <div className="glass rounded-2xl overflow-hidden border border-white/60 shadow-soft max-w-3xl mx-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-primary/5 border-b border-border/60">
                    <th className="p-4 font-bold text-foreground">Date</th>
                    <th className="p-4 font-bold text-foreground">Event</th>
                    <th className="p-4 font-bold text-foreground">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarGlance.map((cal, idx) => (
                    <tr key={idx} className="border-b border-border/40 last:border-none hover:bg-primary/5 transition-colors">
                      <td className="p-4 font-extrabold text-primary">{cal.date}</td>
                      <td className="p-4 font-bold text-foreground">{cal.name}</td>
                      <td className="p-4 text-muted-foreground">{cal.loc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-[10px] italic text-muted-foreground">
              * Dates and events subject to change. Please check back for updates.
            </p>
          </div>

          {/* Newsletter subscription form */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-primary/15 shadow-soft max-w-3xl mx-auto text-center space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Mailing List</span>
              <h4 className="text-lg font-extrabold text-foreground mt-1">Subscribe to Our Newsletter</h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Stay informed about upcoming events, success stories, and ways to get involved.
              </p>
            </div>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs font-semibold max-w-md mx-auto animate-fadeIn">
                🎉 Thank you for subscribing! You are now added to our updates.
              </div>
            ) : (
              <form onSubmit={handleSub} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-grow rounded-full border border-border px-5 py-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition shadow-inner"
                />
                <button type="submit" className="rounded-full bg-[#3A0A63] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#3A0A63]/90 transition shadow-sm cursor-pointer shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Host an Event & Partner With Us split action cards */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-base font-extrabold text-foreground tracking-tight">Host an Event with SOAR</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Interested in hosting a benefit gala, small house gathering, or corporate campaign for SOAR Global Foundation Inc.? We welcome collaborations:
                </p>
                <div className="flex flex-wrap gap-2 mt-4 text-[10px]">
                  {["Fundraising dinners", "Community fairs", "House gatherings"].map((item, idx) => (
                    <span key={idx} className="inline-block px-2.5 py-1 rounded-full bg-slate-50 border border-border/60 text-muted-foreground">
                      🎉 {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link to="/contact" className="text-xs font-bold text-primary hover:text-accent transition">
                  Contact Us About Hosting →
                </Link>
              </div>
            </div>

            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-base font-extrabold text-foreground tracking-tight">Partner With Us</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  We are always seeking strategic partners (real estate developers, banks, faith-based groups) who share our commitment:
                </p>
                <div className="flex flex-wrap gap-2 mt-4 text-[10px]">
                  {["Real Estate", "Financial counseling", "Sponsorships"].map((item, idx) => (
                    <span key={idx} className="inline-block px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary">
                      🤝 {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link to="/contact" className="text-xs font-bold text-primary hover:text-accent transition">
                  Become a Partner →
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Quick Links */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-6">
            <Link to="/donate" className="hover:text-primary transition">Donate Now</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/volunteer" className="hover:text-primary transition">Get Involved</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/about" className="hover:text-primary transition">About Us</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/contact" className="hover:text-primary transition">Contact Us</Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
