import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowRight } from "lucide-react";
import p1 from "@/assets/program-financial.jpg";
import p2 from "@/assets/program-home.jpg";
import p3 from "@/assets/program-mentor.jpg";
import p4 from "@/assets/program-family.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — SOAR Global Foundation" },
      { name: "description", content: "Stories, financial tips, housing resources, and community news from SOAR." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  { img: p2, cat: "Housing", title: "5 first steps toward buying your first home", copy: "A practical map through the emotional terrain of homeownership readiness." },
  { img: p1, cat: "Finance", title: "The credit rebuild playbook", copy: "How to move from setback to a score you can stand on — one habit at a time." },
  { img: p3, cat: "Mentorship", title: "Finding the mentor who changes everything", copy: "The traits to look for, and the questions that unlock the right relationship." },
  { img: p4, cat: "Community", title: "Why family support is the foundation", copy: "How wraparound care helps women rise higher and stay standing." },
];

function Blog() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Journal"
        title={<>Wisdom for the <span className="text-gradient-brand italic">rise</span>.</>}
        subtitle="Practical guides, stories from the community, and resources for the journey."
      />
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.title} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.cat}</span>
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.copy}</p>
                <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read article <ArrowRight className="size-4" /></a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
