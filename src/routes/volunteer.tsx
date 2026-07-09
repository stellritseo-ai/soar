import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { HandHeart, Users, Award, HeartHandshake, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — SOAR Global Foundation" },
      { name: "description", content: "Volunteer, mentor, partner, or sponsor with SOAR. Join a global sisterhood on the rise." },
      { property: "og:title", content: "Volunteer — SOAR Global Foundation" },
      { property: "og:url", content: "/volunteer" },
    ],
    links: [{ rel: "canonical", href: "/volunteer" }],
  }),
  component: Volunteer,
});

const roles = [
  { icon: HandHeart, title: "Volunteer", copy: "Give your time to events, workshops, and community outreach." },
  { icon: HeartHandshake, title: "Mentor", copy: "Walk beside a woman for a season — your story becomes her map." },
  { icon: Users, title: "Partner", copy: "Bring your organization alongside our mission to multiply impact." },
  { icon: Award, title: "Sponsor", copy: "Fund a program, a workshop, or a woman's homeownership journey." },
];

function Volunteer() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get Involved"
        title={<>Rise with <span className="text-gradient-brand italic">us</span>.</>}
        subtitle="There are many ways to join the SOAR movement. Choose the one that matches your season."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {roles.map((r) => (
            <div key={r.title} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="absolute -right-16 -top-16 size-52 rounded-full gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-25" />
              <div className="relative">
                <div className="grid size-14 place-items-center rounded-2xl gradient-brand text-primary-foreground shadow-glow">
                  <r.icon className="size-6" />
                </div>
                <h3 className="mt-6 font-display text-3xl">{r.title}</h3>
                <p className="mt-3 text-muted-foreground">{r.copy}</p>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Apply now <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
