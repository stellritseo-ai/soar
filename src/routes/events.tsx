import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useEventsList } from "@/lib/cms";

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

const fallback = [
  { id: "1", title: "International Women's Day Gala", location: "Orlando, FL", description: "An evening of stories, art, and celebration of the women who rise.", event_date: "2026-03-08T18:00:00Z", image_url: null },
  { id: "2", title: "Financial Freedom Workshop", location: "Virtual", description: "A live, hands-on workshop on budgeting, credit, and first-home savings plans.", event_date: "2026-04-15T18:00:00Z", image_url: null },
];

function Events() {
  const { data } = useEventsList();
  const events = data && data.length > 0 ? data : fallback;
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Events"
        title={<>Upcoming <span className="text-gradient-brand italic">events</span>.</>}
        subtitle="Gather, learn, and celebrate with the SOAR community."
      />
      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-10">
        <ul className="space-y-6">
          {events.map((e) => {
            const d = e.event_date ? new Date(e.event_date) : null;
            return (
              <li key={e.id} className="group grid items-center gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant md:grid-cols-[auto_1fr_auto]">
                <div className="grid size-24 place-items-center rounded-2xl gradient-brand text-primary-foreground shadow-glow">
                  <div className="text-center">
                    <div className="font-display text-2xl leading-none">{d ? d.getDate() : "—"}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest">{d ? d.toLocaleString(undefined, { month: "short" }) : "TBA"}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-primary/80">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> {d ? d.getFullYear() : "TBA"}</span>
                    {e.location && <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> {e.location}</span>}
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 self-center rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant">
                  Register <ArrowRight className="size-4" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </SiteLayout>
  );
}
