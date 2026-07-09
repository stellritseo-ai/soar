import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { ArrowRight } from "lucide-react";
import pFinancial from "@/assets/program-financial.jpg";
import pHome from "@/assets/program-home.jpg";
import pMentor from "@/assets/program-mentor.jpg";
import pFamily from "@/assets/program-family.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — SOAR Global Foundation" },
      { name: "description", content: "Financial literacy, homeownership education, mentorship, and family support programs at SOAR." },
      { property: "og:title", content: "Programs — SOAR Global Foundation" },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: Programs,
});

const programs = [
  { title: "Financial Literacy Workshops", img: pFinancial, copy: "From budgeting basics to credit repair and wealth-building strategies for lasting independence.", bullets: ["Budgeting & saving", "Credit rebuilding", "Investing 101"] },
  { title: "Homeownership Education", img: pHome, copy: "A structured pathway from first savings to signed keys — with real partners at every step.", bullets: ["Down-payment plan", "Mortgage readiness", "Closing support"] },
  { title: "Mentorship Program", img: pMentor, copy: "1:1 mentorship with women who have walked the path, offering guidance for career and life.", bullets: ["1:1 monthly sessions", "Career coaching", "Life design"] },
  { title: "Family Support Services", img: pFamily, copy: "Wraparound care for mothers and families — because rising is a family journey.", bullets: ["Childcare support", "Counseling access", "Community events"] },
  { title: "Affordable Housing Access", img: pHome, copy: "Partnerships that unlock safe, dignified, affordable housing for women in transition.", bullets: ["Housing partners", "Transitional housing", "Rent-to-own paths"] },
];

function Programs() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Programs"
        title={<>Programs that <span className="text-gradient-brand italic">transform</span> lives.</>}
        subtitle="Every SOAR program is designed to meet a woman where she is — and walk her forward, together."
      />

      <section className="mx-auto max-w-7xl space-y-16 px-6 pb-28 lg:px-10">
        {programs.map((p, i) => (
          <article key={p.title} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] gradient-brand opacity-15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] shadow-elegant">
                <img src={p.img} alt={p.title} loading="lazy" width={1200} height={900} className="aspect-[4/3] size-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Program {String(i + 1).padStart(2, "0")}</div>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">{p.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{p.copy}</p>
              <ul className="mt-6 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="size-1.5 rounded-full gradient-brand" /> {b}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:scale-[1.03] transition-transform">
                Join this program <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
