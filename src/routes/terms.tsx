import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — SOAR Global Foundation" },
      { name: "description", content: "The terms that govern use of the SOAR Global Foundation website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" subtitle="Please read these terms carefully before using our website." />
      <section className="mx-auto max-w-3xl space-y-6 px-6 pb-28 text-foreground/80 lg:px-10">
        <p>By accessing this website you agree to these terms. This site is provided by SOAR Global Foundation Inc. for informational purposes.</p>
        <h2 className="font-display text-2xl text-foreground">Use of content</h2>
        <p>Content on this site is owned by SOAR Global Foundation Inc. and may not be reused without written permission.</p>
        <h2 className="font-display text-2xl text-foreground">Donations</h2>
        <p>Donations are processed through secure third-party providers. Tax receipts are provided in accordance with applicable law.</p>
        <h2 className="font-display text-2xl text-foreground">Contact</h2>
        <p>For questions about these terms, email sistersoar14@gmail.com.</p>
      </section>
    </SiteLayout>
  );
}
