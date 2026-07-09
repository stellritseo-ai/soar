import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Heart, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — SOAR Global Foundation" },
      { name: "description", content: "Your gift helps a woman dream again — supporting education, mentorship, and homeownership." },
      { property: "og:title", content: "Donate — SOAR Global Foundation" },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: Donate,
});

const tiers = [25, 50, 100, 250, 500, 1000];

function Donate() {
  const [amount, setAmount] = useState<number | "">(100);
  const [custom, setCustom] = useState("");
  const [freq, setFreq] = useState<"once" | "monthly">("once");

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Donate"
        title={<>Help a woman <span className="text-gradient-brand italic">dream again</span>.</>}
        subtitle="100% hope-driven. Every dollar plants seeds of possibility in a woman's life."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-28 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-3">
          <div className="rounded-[28px] border border-border bg-card p-8 shadow-elegant">
            <div className="flex gap-2 rounded-full bg-secondary p-1">
              {(["once", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFreq(f)}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold capitalize transition ${
                    freq === f ? "gradient-brand text-primary-foreground shadow-soft" : "text-foreground/70"
                  }`}
                >
                  {f === "once" ? "One-time" : "Monthly"}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {tiers.map((t) => (
                <button
                  key={t}
                  onClick={() => { setAmount(t); setCustom(""); }}
                  className={`rounded-2xl border p-5 text-center transition ${
                    amount === t && !custom
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-display text-2xl">${t}</div>
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary/70">Custom amount</label>
              <div className="mt-2 flex items-center rounded-full border border-input px-5 py-3">
                <span className="text-lg font-semibold text-foreground/60">$</span>
                <input
                  type="number"
                  min={1}
                  placeholder="Other amount"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setAmount(Number(e.target.value) || ""); }}
                  className="ml-2 w-full bg-transparent text-lg outline-none"
                />
              </div>
            </div>

            <button
              onClick={(e) => e.preventDefault()}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-brand px-6 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.01]"
            >
              <Heart className="size-5" /> Give {amount ? `$${amount}` : ""} {freq === "monthly" ? "monthly" : "today"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Secure donation. SOAR is a registered nonprofit. Tax receipts issued.</p>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-[28px] gradient-hero p-8 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-2xl">Where your gift goes</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "$25 — sponsors one financial literacy workshop seat",
                "$100 — funds a mentorship match for a month",
                "$500 — covers a full homeownership readiness track",
                "$1,000 — helps launch a family into transitional housing",
              ].map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-soft" />
                  <span className="text-white/90">{l}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl glass-dark p-5">
              <div className="text-xs uppercase tracking-widest text-white/70">Prefer to sponsor?</div>
              <Link to="/partners" className="mt-2 inline-flex items-center gap-2 font-semibold text-accent-soft">
                Become a Sponsor →
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
