import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Calendar, MapPin, Clock, Ticket, Award, Sparkles, BookOpen, Heart, Users, HelpCircle, ChevronDown, Landmark, Star, ShieldCheck, Mail, Phone, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useEventsList } from "@/lib/cms";
import programMentorImg from "@/assets/program-mentor.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — SOAR Global Foundation" },
      { name: "description", content: "Explore galas, sisterhood circles, financial literacy workshops, and event volunteer opportunities at SOAR." },
      { property: "og:title", content: "Events — SOAR Global Foundation" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

const timelineEvents = [
  {
    month: "November 2026",
    title: "Financial Freedom Workshop",
    category: "Education",
    desc: "Take control of your financial future in this interactive virtual workshop. Learn practical strategies for budgeting, credit building, and wealth creation from experienced facilitators.",
    bullets: [
      "Creating a realistic budget",
      "Understanding and improving your credit score",
      "Saving strategies for a down payment",
      "Building generational wealth"
    ],
    date: "Saturday, November 15, 2026",
    time: "2:00 PM – 4:00 PM EST",
    loc: "Virtual (Interactive Zoom)",
    cost: "Free",
    audience: "Open to all women",
    btnText: "Register Now"
  },
  {
    month: "December 2026",
    title: "Community Sisterhood Circle",
    category: "Mentorship & Support",
    desc: "Join us for an evening of connection, encouragement, and shared wisdom. Our Sisterhood Circle brings women together to share experiences, celebrate successes, and lift one another up in a safe, supportive environment.",
    bullets: [
      "Welcome circle and introductions",
      "Guided discussion on resilience and goal setting",
      "Small group breakout sessions",
      "Resource sharing and networking",
      "Light refreshments"
    ],
    date: "Thursday, December 5, 2026",
    time: "6:00 PM – 8:30 PM EST",
    loc: "SOAR HQ, 3311 N Powers Dr, Orlando, FL 32818",
    cost: "Free",
    audience: "Open to all women",
    btnText: "Register Now"
  },
  {
    month: "January 2027",
    title: "Homeownership Education Fair",
    category: "Housing",
    desc: "A comprehensive event designed to connect women with the resources, professionals, and information they need to achieve homeownership.",
    bullets: [
      "Educational workshops on the home buying process",
      "Panel discussions with real estate professionals",
      "One-to-one consultations with housing counselors",
      "Information booths from financial institutions"
    ],
    date: "Saturday, January 2027 (Date TBA)",
    time: "10:00 AM – 2:00 PM EST",
    loc: "Orlando, FL (Venue TBA)",
    cost: "Free",
    audience: "Open to all",
    btnText: "Register Now"
  },
  {
    month: "February 2027",
    title: "Volunteer Appreciation Brunch",
    category: "Community",
    desc: "A special event to honor and celebrate the dedicated volunteers who make our work possible. Join us for a morning of fellowship, recognition, and gratitude.",
    bullets: [
      "Welcome remarks from President Myrtle Dixon",
      "Volunteer recognition and awards",
      "Impact stories from program participants",
      "Networking and fellowship",
      "Delicious brunch"
    ],
    date: "Saturday, February 2027 (Date TBA)",
    time: "10:00 AM – 12:30 PM EST",
    loc: "SOAR HQ, 3311 N Powers Dr, Orlando, FL 32818",
    cost: "Invitation Only",
    audience: "SOAR Volunteers",
    btnText: "Invitation Only"
  },
  {
    month: "March 2027",
    title: "Women's Empowerment Summit",
    category: "Empowerment",
    desc: "A half-day summit designed to inspire and equip women with the tools they need to achieve their personal and professional goals.",
    bullets: [
      "Leadership and personal development",
      "Career advancement strategies",
      "Financial independence",
      "Wellness and self-care",
      "Building supportive networks"
    ],
    date: "Saturday, March 2027 (Date TBA)",
    time: "9:00 AM – 2:00 PM EST",
    loc: "Orlando, FL (Venue TBA)",
    cost: "$25 (Scholarships Available)",
    audience: "Open to all women",
    btnText: "Register Now"
  }
];

const recurringEvents = [
  {
    title: "Monthly Financial Literacy Workshops",
    category: "Education",
    desc: "Join us every month for practical, hands-on financial literacy training. Each workshop covers a different topic to help you build a strong financial foundation.",
    topics: ["Budgeting Basics", "Credit Building and Repair", "Saving for a Down Payment", "Understanding Mortgages", "Investing for the Future"],
    date: "Second Saturday of each month",
    time: "2:00 PM – 4:00 PM EST",
    loc: "SOAR HQ, Orlando, FL & Virtual Options Available",
    cost: "Free",
    audience: "Open to all women"
  },
  {
    title: "Monthly Community Sisterhood Circles",
    category: "Support",
    desc: "Our Sisterhood Circles meet monthly to provide ongoing support, encouragement, and connection for women on their journeys.",
    date: "First Thursday of each month",
    time: "6:00 PM – 8:00 PM EST",
    loc: "SOAR HQ, Orlando, FL",
    cost: "Free",
    audience: "Open to all women"
  },
  {
    title: "Quarterly Homeownership Education Series",
    category: "Housing",
    desc: "A comprehensive series of workshops guiding women through every step of the home buying process.",
    topics: ["Session 1: Understanding Your Finances", "Session 2: Navigating the Real Estate Market", "Session 3: Financing and Mortgages", "Session 4: Closing and Moving In"],
    date: "Quarterly (Jan, Apr, Jul, Oct)",
    loc: "SOAR HQ, Orlando, FL",
    cost: "Free",
    audience: "Women preparing for homeownership"
  },
  {
    title: "Annual Board Meeting",
    category: "Governance",
    desc: "SOAR's Annual Board Meeting for reviewing the past year's activities, electing officers, and addressing strategic goals for the upcoming year.",
    date: "September 2027 (Date TBA)",
    loc: "SOAR HQ, Orlando, FL",
    audience: "Board of Directors"
  }
];

const calendarGlance = [
  { date: "Oct 24, 2026", name: "Purple Hearts Gala", loc: "Greater Vision Center, Ocoee, FL" },
  { date: "Nov 15, 2026", name: "Financial Freedom Workshop", loc: "Virtual (Zoom)" },
  { date: "Dec 5, 2026", name: "Community Sisterhood Circle", loc: "SOAR HQ, Orlando, FL" },
  { date: "Jan 2027 (TBA)", name: "Homeownership Education Fair", loc: "Orlando, FL" },
  { date: "Feb 2027 (TBA)", name: "Volunteer Appreciation Brunch", loc: "SOAR HQ, Orlando, FL" },
  { date: "Mar 2027 (TBA)", name: "Women's Empowerment Summit", loc: "Orlando, FL" }
];

function EventsPage() {
  const { data: databaseEvents } = useEventsList();
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
          eyebrow="Events"
          title={<>Connect. Celebrate. <span className="text-gradient-brand italic font-extrabold">Rise Together</span>.</>}
          subtitle="At SOAR Global Foundation Inc., we believe that community is the cornerstone of transformation. Join us at our upcoming events."
          bgImage={programMentorImg}
        />

        {/* Content Outer Container: 95% Width Cohesive Style */}
        <section className="mx-auto max-w-[95%] px-6 pb-24 lg:px-10 mt-[50px] space-y-20 relative">
          <div className="absolute top-[8%] right-10 w-[550px] h-[550px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          {/* Featured Gala Event */}
          <div className="glass rounded-[32px] p-6 md:p-10 border border-[#D4AF37]/35 shadow-elegant relative overflow-hidden max-w-5xl mx-auto">
            <div className="absolute top-[-30%] right-[-10%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#D4AF37] to-primary" />
            
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  💜 Signature Benefit Gala
                </span>
                <h3 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Purple Hearts Gala</h3>
                <p className="text-xs text-[#3A0A63] font-bold uppercase tracking-wider">A Night of Honor, Inspiration & Celebration</p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Our signature annual benefit is the highlight of the SOAR calendar. The Purple Hearts Gala brings together community leaders, supporters, and the women we serve for an unforgettable evening of inspiration and impact.
                </p>
                
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-[11px] text-muted-foreground space-y-2.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary block">What to Expect:</span>
                  <div className="flex gap-1.5"><span>✔</span> <strong>Keynote Address:</strong> State Representative Lisa Dunkley</div>
                  <div className="flex gap-1.5"><span>✔</span> <strong>Special Performance:</strong> Psalmist Minister Blessing Chigozie</div>
                  <div className="flex gap-1.5"><span>✔</span> <strong>Awards & Recognition:</strong> Honoring outstanding community women</div>
                  <div className="flex gap-1.5"><span>✔</span> <strong>Fine Dining:</strong> An elegant dinner experience with live entertainment</div>
                </div>
              </div>

              {/* Gala Coordinates Card */}
              <div className="bg-slate-50 border border-border/80 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Date:</strong> Saturday, October 24, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Time:</strong> 5:00 PM – 9:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Location:</strong> Greater Vision Center, Ocoee, FL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="size-4.5 text-[#D4AF37]" />
                    <span><strong>Contribution:</strong> $50 per person</span>
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

          {/* Dynamic Database Events List (Managed from Admin Dashboard) */}
          {databaseEvents && databaseEvents.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Live Schedule</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Live Workshops & Seminars</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Direct live events populated and managed by administrative team:
                </p>
              </div>

              <ul className="space-y-4 max-w-5xl mx-auto w-full">
                {databaseEvents.map((evt) => {
                  const dateVal = evt.event_date ? new Date(evt.event_date) : null;
                  return (
                    <li key={evt.id} className="glass rounded-2xl p-5 border border-white/50 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/20 transition duration-300">
                      <div className="flex gap-4 items-center">
                        <div className="size-14 rounded-xl bg-primary/5 text-primary border border-primary/10 flex flex-col items-center justify-center shrink-0">
                          <span className="text-base font-extrabold leading-none">{dateVal ? dateVal.getDate() : "TBA"}</span>
                          <span className="text-[9px] uppercase tracking-widest mt-0.5">{dateVal ? dateVal.toLocaleString(undefined, { month: "short" }) : ""}</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-foreground">{evt.title}</h4>
                          <div className="flex flex-wrap gap-3 mt-1.5 text-[10px] text-muted-foreground">
                            {evt.location && <span className="flex items-center gap-1"><MapPin className="size-3" /> {evt.location}</span>}
                            <span>{evt.description}</span>
                          </div>
                        </div>
                      </div>
                      <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-slate-50 transition shadow-sm cursor-pointer shrink-0">
                        Register
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Upcoming Events Calendar timeline Grid */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Calendar Timeline</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2">Upcoming Events Schedule</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                Explore the timeline of our educational, support, and appreciation milestones:
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 border border-white/50 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border/40 pb-3">
                      <span className="text-xs font-extrabold text-[#D4AF37] uppercase">{evt.month}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-primary/5 text-primary">
                        {evt.category}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-extrabold text-foreground tracking-tight">{evt.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{evt.desc}</p>
                    
                    {evt.bullets && (
                      <ul className="space-y-1.5 pt-1">
                        {evt.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2 items-start text-[10px] text-muted-foreground">
                            <span className="text-primary mt-0.5">✔</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="bg-slate-50 border border-border/40 rounded-xl p-3 text-[10px] text-muted-foreground space-y-2 mt-4">
                      <div className="flex items-center gap-1.5"><Calendar className="size-3.5 text-[#D4AF37]" /> {evt.date}</div>
                      {evt.time && <div className="flex items-center gap-1.5"><Clock className="size-3.5 text-[#D4AF37]" /> {evt.time}</div>}
                      <div className="flex items-center gap-1.5"><MapPin className="size-3.5 text-[#D4AF37]" /> {evt.loc}</div>
                      <div className="flex flex-wrap gap-4 pt-1 border-t border-border/20 mt-1.5">
                        {evt.cost && <div><strong>Cost:</strong> {evt.cost}</div>}
                        {evt.audience && <div><strong>Audience:</strong> {evt.audience}</div>}
                      </div>
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

          {/* Recurring Events */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Monthly & Quarterly</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2 font-display">Recurring Programs</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {recurringEvents.map((rec, idx) => (
                <div key={idx} className="glass rounded-[28px] p-6 border border-white/50 shadow-soft flex flex-col justify-between hover:shadow-elegant transition duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border/40 pb-3">
                      <h4 className="text-sm font-extrabold text-foreground tracking-tight">{rec.title}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-primary/5 text-primary">
                        {rec.category}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{rec.desc}</p>
                    
                    {rec.topics && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {rec.topics.map((topic, tIdx) => (
                          <span key={tIdx} className="inline-block px-2.5 py-1 rounded-full bg-slate-50 border border-border/60 text-[10px] text-muted-foreground font-semibold">
                            📌 {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="bg-slate-50 border border-border/40 rounded-xl p-3 text-[10px] text-muted-foreground space-y-2 mt-4">
                      <div className="flex items-center gap-1.5"><Calendar className="size-3.5 text-[#D4AF37]" /> {rec.date}</div>
                      {rec.time && <div className="flex items-center gap-1.5"><Clock className="size-3.5 text-[#D4AF37]" /> {rec.time}</div>}
                      <div className="flex items-center gap-1.5"><MapPin className="size-3.5 text-[#D4AF37]" /> {rec.loc}</div>
                      <div className="flex flex-wrap gap-4 pt-1 border-t border-border/20 mt-1.5">
                        {rec.cost && <div><strong>Cost:</strong> {rec.cost}</div>}
                        {rec.audience && <div><strong>Audience:</strong> {rec.audience}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 mt-6 flex justify-between items-center text-xs">
                    <Link to="/contact" className="font-bold text-primary hover:text-accent transition">
                      View Schedule & Register →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Gallery */}
          <div className="space-y-8">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Photos</span>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Event Gallery</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                Browse photos from our past events and see the sisterhood in action.
              </p>
            </div>

            <div className="grid gap-4 grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto">
              {[story1, story2, story3, heroImg].map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-border/60 shadow-sm group">
                  <img src={img} alt="Past event SOAR" className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#3A0A63]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="size-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-slate-50 transition shadow-sm">
                View Complete Gallery
              </Link>
            </div>
          </div>

          {/* Past Event Highlights List */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft max-w-4xl mx-auto space-y-6">
            <h4 className="text-sm font-extrabold text-foreground tracking-tight border-b border-border/40 pb-3">Past Event Highlights</h4>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: "2025 Purple Hearts Gala", desc: "A sold-out evening celebrating women's empowerment and raising funds for the SOAR Pathways Program." },
                { name: "Inaugural Homeownership Fair", desc: "Connecting 50+ women with resources and professionals to help them achieve homeownership." },
                { name: "First Sisterhood Circle", desc: "Launching our monthly gathering with 30 women sharing stories and building connections." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-xs font-bold text-primary block">⭐ {item.name}</span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Host an Event & Sponsorship Opportunities */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Host an Event */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-base font-extrabold text-foreground tracking-tight">Host an Event with SOAR</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Interested in hosting an event to benefit SOAR Global Foundation Inc.? We welcome partnerships for Dinners, Galas, Workshops, House campaigns, and Seminars.
                </p>
                <div className="mt-4 pt-4 border-t border-border/40 text-[10px] text-muted-foreground space-y-1">
                  <strong>We Provide:</strong>
                  <div>✔ Event planning guidance & marketing support</div>
                  <div>✔ Speaker and facilitator availability</div>
                  <div>✔ Tax receipts for all donors</div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link to="/contact" className="text-xs font-bold text-primary hover:text-accent transition">
                  Contact Us About Hosting →
                </Link>
              </div>
            </div>

            {/* Sponsorship */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-base font-extrabold text-foreground tracking-tight">Event Sponsorship</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Support our events as a sponsor and demonstrate your organization's commitment to women's empowerment:
                </p>
                <div className="rounded-xl overflow-hidden border border-border/40 mt-4 text-[10px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary/5 border-b border-border/40 font-bold text-foreground">
                        <th className="p-2">Level</th>
                        <th className="p-2">Investment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { level: "Sisterhood Sponsor", cost: "$2,500+" },
                        { level: "Empowerment Sponsor", cost: "$5,000+" },
                        { level: "Legacy Sponsor", cost: "$10,000+" }
                      ].map((item, idx) => (
                        <tr key={idx} className="border-b border-border/20 last:border-none">
                          <td className="p-2 font-bold text-primary">{item.level}</td>
                          <td className="p-2 font-bold text-foreground">{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link to="/contact" className="text-xs font-bold text-primary hover:text-accent transition">
                  Become an Event Sponsor →
                </Link>
              </div>
            </div>
          </div>

          {/* Event Calendar Glance Table */}
          <div className="space-y-6">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Summary</span>
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
            
            <div className="flex justify-center gap-4 mt-6">
              <button className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-[#3A0A63] transition cursor-pointer">
                📄 Download Full Calendar PDF
              </button>
            </div>
          </div>

          {/* Event Volunteer Callout & Newsletter Signup */}
          <div className="grid gap-8 lg:grid-cols-5 items-stretch">
            {/* Event Volunteer */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-[#D4AF37]/20 shadow-soft lg:col-span-2 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-foreground tracking-tight">Volunteer at Events</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Events are made possible by dedicated volunteers. Join our event team and help setup, register guests, or manage hospitality.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-border/40">
                <Link to="/volunteer" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white hover:scale-[1.02] transition shadow-soft cursor-pointer">
                  Volunteer for Events
                </Link>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft lg:col-span-3 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute right-[-10%] top-[-30%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Mailing List</span>
                <h3 className="text-lg font-extrabold text-foreground tracking-tight mt-1">Subscribe for Event Updates</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-2">
                  Never miss an opportunity to connect with our community. Sign up for our event notifications.
                </p>
              </div>

              <div className="mt-6">
                {success ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs font-semibold max-w-md mx-auto animate-fadeIn">
                    🎉 Thank you for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSub} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-grow rounded-full border border-border px-5 py-2.5 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition shadow-inner"
                    />
                    <button type="submit" className="rounded-full bg-[#3A0A63] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#3A0A63]/90 transition shadow-sm cursor-pointer shrink-0">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Donor Services coordinates */}
          <div className="glass rounded-[32px] p-6 border border-white/60 shadow-soft max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-primary shrink-0" />
              <div className="text-xs">
                <strong className="text-foreground block">Orlando Branch</strong>
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
            <Link to="/about" className="hover:text-primary transition">About Us</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/contact" className="hover:text-primary transition">Contact Us</Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
