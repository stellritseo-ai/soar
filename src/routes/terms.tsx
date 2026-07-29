import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import {
  FileText,
  ShieldCheck,
  Building2,
  Heart,
  ShoppingBag,
  Scale,
  Calendar,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle
} from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SOAR Global Foundation Inc." },
      {
        name: "description",
        content:
          "Official Terms of Service and Conditions governing the use of SOAR Global Foundation Inc. website, donations, and e-commerce store.",
      },
      { property: "og:title", content: "Terms of Service — SOAR Global Foundation Inc." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "nonprofit", title: "2. 501(c)(3) Charitable Status & Donations" },
    { id: "store", title: "3. E-Commerce Merchandise Store" },
    { id: "intellectual", title: "4. Intellectual Property Rights" },
    { id: "conduct", title: "5. Acceptable Use & Prohibited Conduct" },
    { id: "disclaimers", title: "6. Educational Disclaimer & Liability" },
    { id: "governing", title: "7. Governing Law & Jurisdiction" },
    { id: "contact", title: "8. Legal Inquiry Desk" },
  ];

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        
        {/* Page Header */}
        <PageHeader
          eyebrow="Official Legal Agreement"
          title={
            <>
              Terms of <span className="text-gradient-brand italic font-extrabold">Service</span>
            </>
          }
          subtitle="Please read these terms and conditions carefully before utilizing the website, making charitable contributions, or purchasing merchandise from SOAR Global Foundation Inc."
        />

        {/* Content Container (95% Max Width Cohesive Theme) */}
        <section className="mx-auto max-w-[95%] px-6 pb-28 lg:px-10 mt-[50px] relative">
          
          {/* Header Metadata Card */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-[#D4AF37]/35 shadow-elegant max-w-6xl mx-auto mb-16 relative overflow-hidden bg-gradient-to-r from-white via-amber-50/30 to-purple-50/20">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#D4AF37] to-primary" />
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-center text-xs">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 grid place-items-center shrink-0">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Entity</span>
                  <span className="font-bold text-foreground text-sm">SOAR Global Foundation Inc.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/30 grid place-items-center shrink-0">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Corporate Status</span>
                  <span className="font-bold text-foreground text-sm">Registered Florida Non-Profit</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/30 grid place-items-center shrink-0">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Effective Date</span>
                  <span className="font-bold text-foreground text-sm">January 1, 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 grid place-items-center shrink-0">
                  <Scale className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Jurisdiction</span>
                  <span className="font-bold text-emerald-700 text-sm">State of Florida, USA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Responsive Body */}
          <div className="grid gap-12 lg:grid-cols-12 max-w-6xl mx-auto">
            
            {/* Left Sticky Navigation Menu (3 cols) */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32 glass rounded-2xl p-5 border border-border/80 shadow-soft space-y-3 text-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] block pb-2 border-b border-border/60">
                  Table of Contents
                </span>
                <nav className="space-y-1.5 font-medium text-muted-foreground">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block px-2.5 py-1.5 rounded-lg hover:bg-primary/10 hover:text-primary transition truncate"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Detailed Documentation Body (9 cols) */}
            <div className="lg:col-span-9 space-y-12 text-sm leading-relaxed text-foreground/80">
              
              {/* Section 1: Acceptance */}
              <div id="acceptance" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <FileText className="size-5 text-[#D4AF37]" /> 1. Acceptance of Terms & Conditions
                </h2>
                <p>
                  These Terms of Service (“Terms”) constitute a legally binding agreement between you (“User”, “Visitor”, “Donor”, or “Customer”) and <strong>SOAR Global Foundation Inc.</strong> (“SOAR”, “we”, “us”, or “our”), governing your access to and use of our website (<strong>http://localhost:8080</strong> / <strong>soarglobalfoundation.org</strong>), web shop, programs, and donation platforms.
                </p>
                <p>
                  By accessing, browsing, making a donation, registering for an event, or purchasing merchandise from this website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must discontinue use of the website immediately.
                </p>
              </div>

              {/* Section 2: 501(c)(3) Non-Profit & Donations */}
              <div id="nonprofit" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-amber-50/40 border border-[#D4AF37]/30 shadow-soft space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-wider">
                  <Heart className="size-3.5 fill-[#D4AF37]" /> Charitable Giving Policy
                </div>
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  2. 501(c)(3) Non-Profit Status, Contributions & Refund Policy
                </h2>
                <p>
                  SOAR Global Foundation Inc. is a registered 501(c)(3) tax-exempt organization incorporated in the State of Florida. Charitable contributions are tax-deductible to the fullest extent permitted by law under Section 170 of the Internal Revenue Code.
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 space-y-1.5">
                    <strong className="text-foreground text-sm font-bold block">Tax Receipts & Documentation</strong>
                    <p className="text-muted-foreground leading-relaxed">
                      Official written receipts for tax purposes are automatically generated and emailed to the donor email address specified at checkout upon successful processing through Stripe.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 space-y-1.5">
                    <strong className="text-foreground text-sm font-bold block">Donation Refund Policy</strong>
                    <p className="text-muted-foreground leading-relaxed">
                      Due to the immediate allocation of funds toward our non-profit educational and community housing initiatives, charitable donations are non-refundable. If an error was made in the donation amount or if duplicate charges occurred due to a technical processing glitch, please contact <strong>shoutgospelworship@gmail.com</strong> within 15 days of the transaction for a refund resolution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: E-Commerce Store */}
              <div id="store" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <ShoppingBag className="size-5 text-purple-600" /> 3. E-Commerce Store & Order Terms
                </h2>
                <p>
                  All merchandise sold on our web shop directly supports SOAR Global Foundation Inc. programs. By placing an order, you agree to the following terms:
                </p>
                <ul className="space-y-2 text-xs list-disc pl-5">
                  <li><strong>Pricing & Currency:</strong> All prices listed are in United States Dollars ($USD). We reserve the right to modify product prices and availability without notice.</li>
                  <li><strong>Order Acceptance:</strong> Receipt of an electronic order confirmation does not signify our final acceptance of your order. We reserve the right to cancel orders due to stock unavailability or pricing errors.</li>
                  <li><strong>Shipping & Delivery:</strong> Estimated delivery times are provided at checkout. SOAR is not liable for carrier delays beyond our reasonable control.</li>
                  <li><strong>Return & Exchange Policy:</strong> Unworn, unwashed apparel and merchandise in original condition may be returned within 30 days of delivery for store credit or exchange.</li>
                </ul>
              </div>

              {/* Section 4: Intellectual Property */}
              <div id="intellectual" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <ShieldCheck className="size-5 text-blue-600" /> 4. Intellectual Property Rights
                </h2>
                <p>
                  All content, trademarks, logos, purple heart emblems, graphics, images, software, curriculum, articles, and text displayed on this website are the exclusive intellectual property of <strong>SOAR Global Foundation Inc.</strong> and are protected by United States and international copyright and trademark laws.
                </p>
                <p className="text-xs text-muted-foreground">
                  You may not reproduce, distribute, modify, create derivative works from, or publicly display any material from our website without prior written permission from SOAR Global Foundation Inc.
                </p>
              </div>

              {/* Section 5: Acceptable Use */}
              <div id="conduct" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  5. Acceptable Use & Prohibited Conduct
                </h2>
                <p>When interacting with our website and forms, you agree NOT to:</p>
                <ul className="space-y-2 text-xs list-disc pl-5">
                  <li>Use the website for any unlawful, fraudulent, or unauthorized purpose.</li>
                  <li>Submit false or misleading contact, billing, or donation information.</li>
                  <li>Attempt to bypass security features, probe vulnerabilities, or interfere with server performance.</li>
                  <li>Transmit malware, viruses, or automated bot scripts.</li>
                </ul>
              </div>

              {/* Section 6: Disclaimers */}
              <div id="disclaimers" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  6. Educational Disclaimer & Limitation of Liability
                </h2>
                <p>
                  The information, workshops, mentorship sessions, and materials provided by SOAR Global Foundation Inc. are for educational and community support purposes only. SOAR does not provide certified legal, formal tax, or licensed real estate brokerage advice. Program participants should consult qualified licensed professionals regarding individual financial or legal decisions.
                </p>
                <p className="text-xs text-muted-foreground">
                  To the maximum extent permitted by applicable law, SOAR Global Foundation Inc. shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of or inability to use this website.
                </p>
              </div>

              {/* Section 7: Governing Law */}
              <div id="governing" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  7. Governing Law & Dispute Resolution
                </h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law principles. Any legal dispute or proceeding arising under these Terms shall be instituted exclusively in the state or federal courts located in Orange County, Florida.
                </p>
              </div>

              {/* Section 8: Legal Inquiry Desk */}
              <div id="contact" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#170B2E] via-[#0E051E] to-[#170B2E] text-white shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                    Legal Affairs Desk
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">
                    8. Questions & Legal Notices
                  </h2>
                  <p className="text-xs text-white/70">
                    For legal notices, terms inquiries, or formal correspondence, please reach out to our administration desk:
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 text-xs pt-2">
                  <a
                    href="mailto:shoutgospelworship@gmail.com"
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition space-y-1 block"
                  >
                    <Mail className="size-4 text-[#D4AF37]" />
                    <span className="text-white/60 block font-semibold">Email Counsel</span>
                    <strong className="text-white font-bold block truncate">shoutgospelworship@gmail.com</strong>
                  </a>

                  <a
                    href="tel:3217107145"
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition space-y-1 block"
                  >
                    <Phone className="size-4 text-[#D4AF37]" />
                    <span className="text-white/60 block font-semibold">Telephone</span>
                    <strong className="text-white font-bold block">(321) 710-7145</strong>
                  </a>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <MapPin className="size-4 text-[#D4AF37]" />
                    <span className="text-white/60 block font-semibold">Headquarters</span>
                    <strong className="text-white font-bold block">Orlando, FL 32818</strong>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </SiteLayout>
  );
}
