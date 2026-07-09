import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import hero from "@/assets/hero.jpg";
import s1 from "@/assets/story-1.jpg";
import s2 from "@/assets/story-2.jpg";
import s3 from "@/assets/story-3.jpg";
import p1 from "@/assets/program-financial.jpg";
import p2 from "@/assets/program-home.jpg";
import p3 from "@/assets/program-mentor.jpg";
import p4 from "@/assets/program-family.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — SOAR Global Foundation" },
      { name: "description", content: "Moments from our programs, events, families, and community." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const images = [hero, s1, p1, p2, s2, p3, p4, s3];

function Gallery() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Gallery"
        title={<>Moments of <span className="text-gradient-brand italic">rising</span>.</>}
        subtitle="A glimpse into the programs, events, and families that make SOAR."
      />
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {images.map((src, i) => (
            <div key={i} className="group overflow-hidden rounded-2xl shadow-soft break-inside-avoid">
              <img src={src} alt="" loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
