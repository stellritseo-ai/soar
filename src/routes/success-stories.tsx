import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Quote } from "lucide-react";
import s1 from "@/assets/story-1.jpg";
import s2 from "@/assets/story-2.jpg";
import s3 from "@/assets/story-3.jpg";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — SOAR Global Foundation" },
      { name: "description", content: "Meet the women whose lives were transformed through SOAR programs." },
      { property: "og:url", content: "/success-stories" },
    ],
    links: [{ rel: "canonical", href: "/success-stories" }],
  }),
  component: Stories,
});

const stories = [
  { name: "Amara J.", where: "Atlanta, GA", img: s1, before: "Living in a temporary shelter with two daughters.", after: "A first-time homeowner with a savings plan and a mentor.", quote: "SOAR walked with me from a shelter to my very own front door." },
  { name: "Isabela R.", where: "Orlando, FL", img: s2, before: "Rebuilding after job loss and low credit.", after: "Launched a business and closing on her first home.", quote: "The mentorship changed everything for me and my family." },
  { name: "Denise M.", where: "Charlotte, NC", img: s3, before: "Years of financial stress and self-doubt.", after: "Graduated the homeownership track with community around her.", quote: "I dreamed again for the first time in years." },
];

function Stories() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Stories"
        title={<>The women who <span className="text-gradient-brand italic">rose</span>.</>}
        subtitle="Every story is a testament to what happens when adversity meets community."
      />
      <section className="mx-auto max-w-6xl space-y-14 px-6 pb-28 lg:px-10">
        {stories.map((s, i) => (
          <article key={s.name} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] gradient-brand opacity-15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] shadow-elegant">
                <img src={s.img} alt={s.name} loading="lazy" className="aspect-[4/5] size-full object-cover" />
              </div>
            </div>
            <div>
              <Quote className="size-8 text-accent" />
              <p className="mt-3 font-display text-3xl leading-snug md:text-4xl">"{s.quote}"</p>
              <div className="mt-4 text-sm uppercase tracking-widest text-primary/70">{s.name} — {s.where}</div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Before</div>
                  <p className="mt-2 text-sm">{s.before}</p>
                </div>
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <div className="text-xs uppercase tracking-widest text-primary/80">After</div>
                  <p className="mt-2 text-sm">{s.after}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
