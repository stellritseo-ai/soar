import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SOAR Global Foundation" },
      { name: "description", content: "How SOAR Global Foundation collects, uses, and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="This page is maintained by SOAR Global Foundation Inc." />
      <section className="mx-auto max-w-3xl space-y-6 px-6 pb-28 text-foreground/80 lg:px-10">
        <p>SOAR Global Foundation Inc. respects your privacy. This policy describes what information we collect through this site, how we use it, and the choices you have.</p>
        <h2 className="font-display text-2xl text-foreground">Information we collect</h2>
        <p>We collect information you provide directly — such as name, email, and message content — when you contact us, donate, or subscribe to our newsletter.</p>
        <h2 className="font-display text-2xl text-foreground">How we use information</h2>
        <p>We use your information to respond to inquiries, process donations, send updates you request, and improve our programs.</p>
        <h2 className="font-display text-2xl text-foreground">Your choices</h2>
        <p>You can unsubscribe from our newsletter at any time or contact us to request changes to your information.</p>
        <p className="text-sm text-muted-foreground">For questions about this policy, email sistersoar14@gmail.com.</p>
      </section>
    </SiteLayout>
  );
}
