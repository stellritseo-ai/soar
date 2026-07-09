import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — SOAR Global Foundation" },
      { name: "description", content: "Upcoming workshops, galas, and community events with SOAR." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: Events,
});

const events = [
  { date: "Mar 08", title: "International Women's Day Gala", where: "Orlando, FL", copy: "An evening of stories, art, and celebration of the women who rise." },
  { date: "Apr 15", title: "Financial Freedom Workshop", where: "Virtual", copy: "A live, hands-on workshop on budgeting, credit, and first-home savings plans." },
  { date: "May 22", title: "Mentor Match Mixer", where: "Atlanta, GA", copy: "Meet mentors and mentees from across our sisterhood in a beautiful evening setting." },
  { date: "Jun 10", title: "Homeownership Bootcamp", where: "Charlotte, NC", copy: "A weekend intensive on the full path from savings to signed keys." },
];

function Events() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Events"
        title={<>Upcoming <span className="text-gradient-brand italic">events</span>.</>}
        subtitle="Gather, learn, and celebrate with the SOAR community."
      />
      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-10">
        <ul className="space-y-6">
          {events.map((e) => (
            <li key={e.title} className="group grid items-center gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant md:grid-cols-[auto_1fr_auto]">
              <div className="grid size-24 place-items-center rounded-2xl gradient-brand text-primary-foreground shadow-glow">
                <div className="text-center">
                  <div className="font-display text-2xl leading-none">{e.date.split(" ")[1]}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest">{e.date.split(" ")[0]}</div>
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.copy}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-primary/80">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> 2026</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> {e.where}</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 self-center rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant">
                Register <ArrowRight className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
