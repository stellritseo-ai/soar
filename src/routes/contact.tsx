import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Phone, Mail, Facebook, MapPin, Send } from "lucide-react";

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
              <li className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-white/15"><Phone className="size-4" /></span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Phone</div>
                  <a href="tel:+13217320966" className="text-base">(321) 732-0966</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-white/15"><Mail className="size-4" /></span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Email</div>
                  <a href="mailto:sistersoar14@gmail.com" className="text-base">sistersoar14@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-white/15"><Facebook className="size-4" /></span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Facebook</div>
                  <span className="text-base">SOAR (Sisters Of Adversity Rise)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-white/15"><MapPin className="size-4" /></span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70">Serving</div>
                  <span className="text-base">United States — expanding</span>
                </div>
              </li>
            </ul>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Orlando,FL&output=embed"
                className="h-56 w-full border-0"
                loading="lazy"
              />
            </div>
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
