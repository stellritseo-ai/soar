import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Ticket, Sparkles, Clock, ArrowRight } from "lucide-react";

const otherEvents = [
  {
    id: "2",
    title: "Financial Freedom Workshop",
    date: "Nov 15, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual (Interactive Zoom)",
    tag: "Education",
  },
  {
    id: "3",
    title: "Community Sisterhood Circle",
    date: "Dec 05, 2026",
    time: "6:00 PM - 8:30 PM",
    location: "SOAR HQ, Orlando, FL",
    tag: "Mentorship",
  },
];

export function EventsSection() {
  return (
    <section className="relative py-20 bg-background overflow-hidden border-t border-border/40">
      {/* Soft background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-[#5E2B97]/5 to-[#D4AF37]/5 blur-[90px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5E2B97]">
              Community Gatherings
            </span>
            <h2 className="mt-5 -mb-[22px] font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-foreground font-bold capitalize">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] font-extrabold">events</span> & forums.
            </h2>
          </div>
          <Link
            to="#"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5E2B97] to-[#481E7A] text-white font-bold px-8 py-3.5 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97] shrink-0"
          >
            View calendar 
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Lg: 7/12): Main Featured Event (Purple Hearts Gala) */}
          <div className="lg:col-span-7 group relative overflow-hidden rounded-[10px] border border-white/10 bg-gradient-to-br from-[#5E2B97] via-[#3E1A68] to-[#9E7A28] p-8 md:p-10 shadow-elegant text-white flex flex-col min-h-[500px]">
            {/* Mesh overlay inside featured card */}
            <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_50%)] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                {/* Featured Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                    Featured Event
                  </span>
                </div>

                {/* Event Name */}
                <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Purple Hearts Gala
                </h3>
                
                {/* Event Tagline */}
                <div className="mt-2 text-sm text-[#D4AF37] font-semibold tracking-wider uppercase">
                  A Night of Honor, Inspiration & Celebration
                </div>

                {/* Event Description */}
                <p className="mt-5 text-sm md:text-[15px] leading-relaxed text-white/80 font-medium max-w-xl">
                  Join us for our signature annual benefit. Honoring outstanding women making a difference in our community. Featuring Keynote Speaker State Representative Lisa Dunkley, Special Guest Psalmist Minister Blessing Chigozie, live entertainment, and fine dining. 
                </p>

                {/* Details List */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-sm text-white/95 font-semibold">
                    <Calendar className="size-4.5 text-[#D4AF37] shrink-0" />
                    <span>Sat, Oct 24, 2026 — 5:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/95 font-semibold">
                    <MapPin className="size-4.5 text-[#D4AF37] shrink-0" />
                    <span>Greater Vision Center, Ocoee, FL</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/95 font-semibold">
                    <Ticket className="size-4.5 text-[#D4AF37] shrink-0" />
                    <span>Contribution: $50</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/95 font-semibold">
                    <Sparkles className="size-4.5 text-[#D4AF37] shrink-0" />
                    <span>Attire: Purple & Gold Formal</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-10 pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-bold px-8 py-3.5 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] active:scale-[0.97]"
                >
                  <Ticket className="size-4 fill-current text-[#0C1220]/75" />
                  Get Tickets
                </Link>
                <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">
                  Benefiting SOAR Pathways Program
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Lg: 5/12): List of Other Events */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h4 className="font-display text-xl font-extrabold text-[#3A0A63] tracking-tight border-b border-border pb-3">
              Other Upcoming Events
            </h4>
            
            <div className="flex flex-col gap-5">
              {otherEvents.map((e) => (
                <div
                  key={e.id}
                  className="group relative overflow-hidden rounded-[10px] border border-border/70 bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                      {e.tag}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {e.date}
                    </span>
                  </div>
                  
                  <h5 className="mt-3 font-display text-xl font-bold text-[#3A0A63] transition-colors duration-200 group-hover:text-[#5E2B97]">
                    {e.title}
                  </h5>
                  
                  <p className="mt-1.5 text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-primary/70" />
                    {e.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="text-xs text-muted-foreground font-medium">
                      {e.time}
                    </span>
                    <Link
                      to="#"
                      className="group/link inline-flex items-center gap-1 text-xs font-bold text-[#5E2B97] hover:text-[#3A0A63]"
                    >
                      Details
                      <ArrowRight className="size-3 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
