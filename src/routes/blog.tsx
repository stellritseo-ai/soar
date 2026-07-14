import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowRight } from "lucide-react";
import p1 from "@/assets/program-financial.jpg";
import p2 from "@/assets/program-home.jpg";
import p3 from "@/assets/program-mentor.jpg";
import p4 from "@/assets/program-family.jpg";
import { usePublishedPosts } from "@/lib/cms";

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

const fallbackImages = [p2, p1, p3, p4];
const fallback = [
  { id: "1", slug: "first-steps-home", image_url: p2, title: "5 first steps toward buying your first home", excerpt: "A practical map through the emotional terrain of homeownership readiness." },
  { id: "2", slug: "credit-rebuild", image_url: p1, title: "The credit rebuild playbook", excerpt: "How to move from setback to a score you can stand on — one habit at a time." },
];

function Blog() {
  const { data } = usePublishedPosts();
  const posts = data && data.length > 0 ? data : fallback;
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Journal"
        title={<>Wisdom for the <span className="text-gradient-brand italic">rise</span>.</>}
        subtitle="Practical guides, stories from the community, and resources for the journey."
      />
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10 mt-[50px]">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((p, i) => (
            <article key={p.id} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image_url ?? fallbackImages[i % fallbackImages.length]} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read article <ArrowRight className="size-4" /></a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
