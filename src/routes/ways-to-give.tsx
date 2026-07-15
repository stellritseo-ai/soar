import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Heart, Gift, Coins, Building, Award, Calendar, Handshake, Info, ShieldCheck, Mail, Phone, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";
import programHomeImg from "@/assets/program-home.jpg";

export const Route = createFileRoute("/ways-to-give")({
  head: () => ({
    meta: [
      { title: "Ways to Give — SOAR Global Foundation" },
      { name: "description", content: "Explore giving options at SOAR: one-time donations, monthly giving, corporate sponsorships, grants, and planned giving." },
      { property: "og:title", content: "Ways to Give — SOAR Global Foundation" },
      { property: "og:url", content: "/ways-to-give" },
    ],
    links: [{ rel: "canonical", href: "/ways-to-give" }],
  }),
  component: WaysToGive,
});

const impacts = [
  { amount: "$25", desc: "Provides financial literacy materials for one woman" },
  { amount: "$50", desc: "Covers one mentorship session" },
  { amount: "$100", desc: "Supports a homeownership education workshop" },
  { amount: "$250", desc: "Funds down payment assistance for a family" },
  { amount: "$500", desc: "Sponsors a full program enrollment for one woman" },
  { amount: "$1,000", desc: "Supports wraparound family services for a mother and her children" },
  { value: "$5,000", desc: "Helps secure an energy-efficient home for a family" }
];

const options = [
  {
    num: "1",
    icon: Gift,
    title: "One-Time Donation",
    desc: "Make an immediate impact with a one-time gift. Your contribution will be directed to our most urgent needs, ensuring that women and families receive the support they require today.",
    btnText: "Donate Now",
    to: "/donate"
  },
  {
    num: "2",
    icon: Heart,
    title: "Monthly Giving — The SOAR Circle",
    desc: "Join our community of sustaining supporters who make recurring monthly gifts. Monthly giving provides reliable, predictable funding that allows us to plan and expand our programs with confidence.",
    benefits: [
      "Consistent support for our programs",
      "Reduced administrative costs",
      "Deepened connection to our mission",
      "Exclusive updates from our team"
    ],
    btnText: "Become a Monthly Supporter",
    to: "/donate"
  },
  {
    num: "3",
    icon: Building,
    title: "Corporate Sponsorships",
    desc: "Partner with SOAR to make a meaningful impact in your community while demonstrating your organization's commitment to social responsibility.",
    sponsorships: [
      { level: "Sisterhood Sponsor", cost: "$2,500+", perk: "Logo on website, social media recognition, event tickets" },
      { level: "Empowerment Sponsor", cost: "$5,000+", perk: "All above + program naming rights, speaking opportunity" },
      { level: "Legacy Sponsor", cost: "$10,000+", perk: "All above + featured partnership, annual report recognition" }
    ],
    btnText: "Become a Corporate Sponsor",
    to: "/contact"
  },
  {
    num: "4",
    icon: Award,
    title: "Grants & Foundation Support",
    desc: "We welcome partnerships with private foundations, family foundations, and grant-making organizations that share our commitment to women's empowerment, affordable housing, and financial literacy.",
    btnText: "Contact Us About Grants",
    to: "/contact"
  },
  {
    num: "5",
    icon: Coins,
    title: "Planned Giving",
    desc: "Leave a lasting legacy by including SOAR Global Foundation Inc. in your estate plans. Your planned gift ensures that future generations of women will have access to the programs and support they need to achieve homeownership.",
    bullets: [
      "Bequests in wills and living trusts",
      "Charitable gift annuities",
      "Retirement plan designations",
      "Life insurance policies"
    ],
    btnText: "Learn About Planned Giving",
    to: "/contact"
  },
  {
    num: "6",
    icon: Handshake,
    title: "In-Kind Donations",
    desc: "In addition to financial contributions, we welcome in-kind donations that support our programs and operations.",
    needs: [
      "Office supplies and equipment",
      "Laptops and tablets for program participants",
      "Workshop materials and educational resources",
      "Event space and catering",
      "Professional services (legal, accounting, marketing)"
    ],
    btnText: "Contact Us About In-Kind Donations",
    to: "/contact"
  },
  {
    num: "7",
    icon: Calendar,
    title: "Fundraising Events",
    desc: "Attend or sponsor our signature events to support SOAR while connecting with our community.",
    eventsList: [
      { name: "Purple Hearts Gala", type: "Our signature annual benefit" },
      { name: "Community Sisterhood Circles", type: "Monthly gatherings" },
      { name: "Financial Freedom Workshops", type: "Educational events" },
      { name: "Homeownership Fairs", type: "Community resource events" }
    ],
    btnText: "View Events Calendar",
    to: "/events"
  },
  {
    num: "8",
    icon: Info,
    title: "Workplace Giving",
    desc: "Many employers offer matching gift programs that double your impact. Check with your human resources department to see if your company matches charitable contributions.",
    btnText: "Check Matching Gifts",
    to: "/contact"
  }
];

const faqs = [
  { q: "Is my donation tax-deductible?", a: "Yes. SOAR Global Foundation Inc. is a registered 501(c)(3) nonprofit organization, and all contributions are tax-deductible to the fullest extent permitted by law." },
  { q: "How can I designate my gift to a specific program?", a: "When making your donation online or via check, you can specify which program you would like to support. We honor all designated gifts." },
  { q: "Can I make a gift in honor or memory of someone?", a: "Absolutely. We are honored to accept gifts made in tribute to loved ones and will send acknowledgment to the designated recipient." },
  { q: "How do I receive a receipt for my donation?", a: "All donors receive an email receipt immediately after online giving. Mail-in donations receive tax receipts within 2-3 weeks." },
  { q: "Who can I contact with questions?", a: "Please reach out to our donor services team at (321) 710-7145 or sistersoar14@gmail.com." }
];

function WaysToGive() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Get Involved"
          title={<>Plant a Seed of <span className="text-gradient-brand italic font-extrabold">Possibility</span>.</>}
          subtitle="Every woman who walks through our doors carries a dream — of stability, of dignity, of a home to call her own. Your generosity plants the seeds that make those dreams bloom."
          bgImage={programHomeImg}
        />

        {/* Content Layout Outer: 95% Width Cohesive Style */}
        <section className="mx-auto max-w-[95%] px-6 pb-24 lg:px-10 mt-[50px] space-y-20 relative">
          <div className="absolute top-[8%] left-10 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          {/* Intro Card */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft text-center max-w-4xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-extrabold">Generosity</span>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-[#3A0A63] font-semibold">
              "When you give to SOAR, you are not just making a donation. You are joining a sisterhood of supporters who believe that every woman deserves the opportunity to rise."
            </p>
          </div>

          {/* Why Your Gift Matters & Split Table */}
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Direct Value</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Why Your Gift Matters</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Your support directly funds programs that empower women to achieve homeownership and lasting independence. Here is how your dollar transforms lives:
                </p>
              </div>

              <div className="glass rounded-2xl overflow-hidden border border-white/60 shadow-soft">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b border-border/60">
                      <th className="p-4 font-bold text-foreground">Gift Amount</th>
                      <th className="p-4 font-bold text-foreground">Direct Program Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {impacts.map((imp, idx) => (
                      <tr key={idx} className="border-b border-border/40 last:border-none hover:bg-primary/5 transition-colors">
                        <td className="p-4 font-extrabold text-primary">{imp.amount || imp.value}</td>
                        <td className="p-4 text-muted-foreground">{imp.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Commitment to Donors */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Accountability</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Our Commitment to Donors</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  At SOAR Global Foundation Inc., we are committed to transparency, accountability, and integrity in all our financial practices:
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Direct Funding", desc: "100% of designated gifts go directly to the specified program." },
                  { title: "Annual Audits", desc: "Independent audits ensure strict financial transparency." },
                  { title: "Board Oversight", desc: "Our Board of Directors oversees all financial allocations." },
                  { title: "Registered Charity", desc: "SOAR is a registered 501(c)(3) nonprofit under the laws of the State of Florida." }
                ].map((item, idx) => (
                  <div key={idx} className="glass rounded-xl p-4 border border-white/50 flex gap-3">
                    <ShieldCheck className="size-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-foreground block">{item.title}</span>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ways to Give Options Deck */}
          <div className="space-y-10">
            <div className="border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Giving Channels</span>
              <h2 className="font-display text-3xl font-extrabold text-foreground tracking-tight mt-2">Options for Giving</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                We offer a variety of giving options to accommodate every donor's preferences and capacity. Choose the method that works best for you.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {options.map((opt, idx) => (
                <div key={idx} className="glass rounded-[32px] p-6 md:p-8 border border-white/50 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="size-12 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center">
                        <opt.icon className="size-5" />
                      </div>
                      <span className="font-display text-4xl font-extrabold text-[#D4AF37]/20">0{opt.num}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-foreground tracking-tight">{opt.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{opt.desc}</p>

                    {/* Monthly Giving Benefits */}
                    {opt.benefits && (
                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mt-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-2">Benefits:</span>
                        <ul className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground">
                          {opt.benefits.map((b, bIdx) => (
                            <li key={bIdx} className="flex gap-1.5 items-start">
                              <span className="text-primary mt-0.5">✔</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Corporate Levels Table */}
                    {opt.sponsorships && (
                      <div className="rounded-xl overflow-hidden border border-border/40 mt-2 text-[10px]">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-primary/5 border-b border-border/40 font-bold text-foreground">
                              <th className="p-2">Level</th>
                              <th className="p-2">Investment</th>
                              <th className="p-2">Perks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {opt.sponsorships.map((s, sIdx) => (
                              <tr key={sIdx} className="border-b border-border/20 last:border-none">
                                <td className="p-2 font-bold text-primary">{s.level}</td>
                                <td className="p-2 font-bold text-foreground">{s.cost}</td>
                                <td className="p-2 text-muted-foreground">{s.perk}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Planned giving bullets */}
                    {opt.bullets && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {opt.bullets.map((b, bIdx) => (
                          <span key={bIdx} className="inline-block px-2.5 py-1 rounded-full bg-slate-50 border border-border/60 text-[10px] font-semibold text-muted-foreground">
                            📁 {b}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* In-Kind Needs list */}
                    {opt.needs && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {opt.needs.map((n, nIdx) => (
                          <span key={nIdx} className="inline-block px-2.5 py-1 rounded-full bg-[#3A0A63]/5 border border-primary/10 text-[10px] font-semibold text-primary">
                            📌 {n}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Fundraising Events list */}
                    {opt.eventsList && (
                      <div className="grid gap-2 grid-cols-2 pt-2 text-[10px]">
                        {opt.eventsList.map((e, eIdx) => (
                          <div key={eIdx} className="border border-border/40 rounded-lg p-2 bg-slate-50">
                            <span className="font-bold text-foreground block">{e.name}</span>
                            <span className="text-[9px] text-muted-foreground block">{e.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/40">
                    <Link to={opt.to} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition">
                      {opt.btnText} <ExternalLink className="size-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secure Online Donation card & Check Info Deck */}
          <div className="grid gap-8 lg:grid-cols-5 items-stretch">
            {/* Online Giving Card */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-[#D4AF37]/20 shadow-soft lg:col-span-3 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute right-[-10%] top-[-30%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Secure Online Donation</span>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-2">Make Your Gift Today</h3>
                <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                  Ready to make a difference? Every contribution brings a woman one step closer to her dream of homeownership. Giving online is quick, secure, and tax-deductible.
                </p>
              </div>

              <div className="mt-8 flex justify-center pb-2">
                <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition shadow-soft cursor-pointer">
                  Donate Online Now <Heart className="size-4 shrink-0 fill-white" />
                </Link>
              </div>
            </div>

            {/* Check/Mail Info Deck */}
            <div className="glass rounded-[32px] p-6 md:p-8 border border-white/60 shadow-soft lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-4">
                  <Mail className="size-4" />
                </div>
                <h4 className="text-sm font-extrabold text-foreground tracking-tight">Mail a Check</h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Please make check payments payable to:
                  <strong className="block text-foreground mt-2">SOAR Global Foundation Inc.</strong>
                  <span className="block mt-1 font-medium bg-slate-50 border border-border/50 rounded-lg p-2.5 text-foreground/80">
                    Orlando, FL 32818
                  </span>
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 mt-4 text-[10px] text-muted-foreground">
                📫 All mail-in donations will receive official tax receipts within 2-3 weeks.
              </div>
            </div>
          </div>

          {/* Donor Recognition & Direct Contact */}
          <div className="grid gap-10 lg:grid-cols-2 items-stretch">
            {/* Donor Services */}
            <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-4">
                  <Phone className="size-4" />
                </div>
                <h4 className="text-sm font-extrabold text-foreground tracking-tight">Donor Services</h4>
                <p className="text-xs text-muted-foreground mt-2">
                  Have questions about your gift? Our donor support team is here to assist:
                </p>
                
                <div className="mt-4 space-y-2">
                  <a href="tel:3217107145" className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-accent transition">
                    📞 (321) 710-7145
                  </a>
                  <a href="mailto:sistersoar14@gmail.com" className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-accent transition">
                    ✉ sistersoar14@gmail.com
                  </a>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground mt-6 leading-relaxed">
                Thank you for helping women find their dreams by owning their own home. Your support is the foundation.
              </p>
            </div>

            {/* Donor Recognition */}
            <div className="glass rounded-[28px] p-6 md:p-8 border border-white/60 shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-foreground tracking-tight">Donor Recognition</h4>
                <p className="text-xs text-muted-foreground mt-2">
                  We believe in honoring our supporters. All donors will receive:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "A tax receipt for your records (SOAR is a 501(c)(3) nonprofit)",
                    "Regular updates on our program impacts",
                    "Invitations to donor appreciation events",
                    "Recognition on our website and annual report (unless anonymous)"
                  ].map((rec, rIdx) => (
                    <li key={rIdx} className="flex gap-2 items-start text-xs text-muted-foreground">
                      <span className="text-[#D4AF37]">✔</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-6">
            <div className="border-b border-border pb-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Got Questions?</span>
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight mt-1">Frequently Asked Questions</h3>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="glass rounded-2xl border border-white/60 shadow-soft overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-xs text-foreground hover:bg-slate-50 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground border-t border-border/20 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Quick Links */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-6">
            <Link to="/donate" className="hover:text-primary transition">Donate Now</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/volunteer" className="hover:text-primary transition">Become a Volunteer</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/contact" className="hover:text-primary transition">Contact Us</Link>
            <span className="hidden sm:inline text-border">|</span>
            <Link to="/our-impact" className="hover:text-primary transition">Our Impact</Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
