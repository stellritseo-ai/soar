import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — SOAR Global Foundation" },
      { name: "description", content: "Organizations and sponsors partnering with SOAR to multiply impact." },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: Partners,
});

const partners = ["Rise Housing Co.", "Golden Trust Bank", "HerFuture Foundation", "Cornerstone Realty", "Kindred Family Services", "Ascend Credit Union", "Sunrise Legal Aid", "Beacon Mentors"];

function Partners() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Partners & Sponsors"
        title={<>Stronger <span className="text-gradient-brand italic">together</span>.</>}
        subtitle="Our partners are the reason the SOAR sisterhood can reach further, faster."
      />
      <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {partners.map((p) => (
            <div key={p} className="flex aspect-[4/2] items-center justify-center rounded-2xl border border-border bg-card p-6 text-center font-display text-lg shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              {p}
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-28 text-center lg:px-10">
        <div className="rounded-[32px] gradient-hero p-12 text-primary-foreground shadow-elegant">
          <h3 className="font-display text-3xl md:text-4xl">Become a partner</h3>
          <p className="mx-auto mt-3 max-w-lg text-white/85">Corporate sponsorship, in-kind support, or program partnerships — let's design impact together.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-primary-deep">
            Start the conversation <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
