import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useSetting, type ContactSettings } from "@/lib/cms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SOAR Global Foundation" },
      { name: "description", content: "Get in touch with SOAR Global Foundation Inc." },
      { property: "og:title", content: "Contact — SOAR Global Foundation" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { data } = useSetting<ContactSettings>("contact");
  const c: ContactSettings = data ?? {};
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title={<>Let's <span className="text-gradient-brand italic">connect</span>.</>}
        subtitle="Whether you're seeking support, offering partnership, or want to volunteer — we're here."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-28 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-2">
          <div className="rounded-[28px] gradient-hero p-8 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-2xl">Reach out</h3>
            <ul className="mt-6 space-y-4 text-sm">
              {c.phone && (
                <li className="flex items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white/15"><Phone className="size-4" /></span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/70">Phone</div>
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="text-base">{c.phone}</a>
                  </div>
                </li>
              )}
              {c.email && (
                <li className="flex items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white/15"><Mail className="size-4" /></span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/70">Email</div>
                    <a href={`mailto:${c.email}`} className="text-base">{c.email}</a>
                  </div>
                </li>
              )}
              {c.address && (
                <li className="flex items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white/15"><MapPin className="size-4" /></span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/70">Address</div>
                    <span className="text-base">{c.address}</span>
                  </div>
                </li>
              )}
              {c.hours && (
                <li className="flex items-start gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white/15"><Clock className="size-4" /></span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/70">Hours</div>
                    <span className="text-base">{c.hours}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-3 rounded-[28px] border border-border bg-card p-8 shadow-elegant">
          <h3 className="font-display text-2xl">Send us a message</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">First name</span>
              <input className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none" placeholder="Jane" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Last name</span>
              <input className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none" placeholder="Doe" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Email</span>
              <input type="email" className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none" placeholder="you@example.com" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Subject</span>
              <input className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none" placeholder="How can we help?" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Message</span>
              <textarea rows={5} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none" placeholder="Tell us more..." />
            </label>
          </div>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-[1.02] transition-transform">
            <Send className="size-4" /> Send message
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
