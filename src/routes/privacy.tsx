import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Building2,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SOAR Global Foundation Inc." },
      {
        name: "description",
        content:
          "Official Privacy Policy and Donor Confidentiality Guarantee for SOAR Global Foundation Inc., a registered 501(c)(3) non-profit organization.",
      },
      { property: "og:title", content: "Privacy Policy — SOAR Global Foundation Inc." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const sections = [
    { id: "commitment", title: "1. Donor Privacy Guarantee" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Information" },
    { id: "financial", title: "4. Payment & Financial Security" },
    { id: "sharing", title: "5. Information Sharing & Third Parties" },
    { id: "cookies", title: "6. Cookies & Web Tracking" },
    { id: "rights", title: "7. Your Rights & Data Choices" },
    { id: "children", title: "8. Children's Privacy (COPPA)" },
    { id: "contact", title: "9. Legal & Privacy Desk" },
  ];

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        
        {/* Page Header */}
        <PageHeader
          eyebrow="Official Legal Compliance"
          title={
            <>
              Privacy Policy & <span className="text-gradient-brand italic font-extrabold">Donor Trust</span>
            </>
          }
          subtitle="SOAR Global Foundation Inc. is committed to protecting your personal information, financial privacy, and donor confidentiality at the highest standards."
        />

        {/* Content Container (95% Max Width Cohesive Theme) */}
        <section className="mx-auto max-w-[95%] px-6 pb-28 lg:px-10 mt-[50px] relative">
          
          {/* Header Organization Metadata Card */}
          <div className="glass rounded-[32px] p-6 md:p-8 border border-[#D4AF37]/35 shadow-elegant max-w-6xl mx-auto mb-16 relative overflow-hidden bg-gradient-to-r from-white via-amber-50/30 to-purple-50/20">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#D4AF37] to-primary" />
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-center text-xs">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 grid place-items-center shrink-0">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Organization</span>
                  <span className="font-bold text-foreground text-sm">SOAR Global Foundation Inc.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-500/30 grid place-items-center shrink-0">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Legal Status</span>
                  <span className="font-bold text-foreground text-sm">501(c)(3) Tax-Exempt Non-Profit</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/30 grid place-items-center shrink-0">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Effective Date</span>
                  <span className="font-bold text-foreground text-sm">January 1, 2026 (Updated July 2026)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 grid place-items-center shrink-0">
                  <Lock className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">Security Level</span>
                  <span className="font-bold text-emerald-700 text-sm">256-Bit SSL Encrypted</span>
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
              
              {/* Introduction Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <Sparkles className="size-5 text-[#D4AF37]" /> Introduction & Scope
                </h2>
                <p>
                  SOAR Global Foundation Inc. (“SOAR”, “we”, “us”, or “our”) respects your privacy and is deeply committed to upholding the confidentiality, security, and integrity of the personal information entrusted to us by donors, volunteers, program participants, community partners, and website visitors.
                </p>
                <p>
                  This Privacy Policy outlines how we collect, use, safeguard, and manage personal data collected through our website (<strong>http://localhost:8080</strong> / <strong>soarglobalfoundation.org</strong>), online donation processing forms, newsletter subscriptions, event registrations, and physical community programs in accordance with applicable United States federal and Florida state privacy laws.
                </p>
              </div>

              {/* Section 1: Donor Privacy Guarantee */}
              <div id="commitment" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-amber-50/40 border border-[#D4AF37]/30 shadow-soft space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="size-3.5" /> High-Priority Assurance
                </div>
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  1. Official Donor Confidentiality & Privacy Guarantee
                </h2>
                <p className="font-semibold text-foreground">
                  SOAR Global Foundation Inc. maintains an strict, non-negotiable policy regarding donor privacy:
                </p>
                <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 space-y-2.5 text-xs text-foreground/90">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Selling or Renting:</strong> We will NEVER sell, trade, rent, license, or exchange our donors’ personal information (including names, email addresses, phone numbers, or mailing addresses) with any commercial entity, marketing broker, or external charity.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No External Mailings:</strong> We will NEVER send donor mailings or communications on behalf of third-party organizations.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Anonymous Giving Option:</strong> Donors have the right to request that their gifts remain completely anonymous in annual reports and public acknowledgments.</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Information We Collect */}
              <div id="collection" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <FileText className="size-5 text-primary" /> 2. Information We Collect
                </h2>
                <p>We collect information through various touchpoints on our digital platforms and community programs:</p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-border/60 space-y-2">
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <FileText className="size-4 text-[#D4AF37]" /> Personal Identifiers (PII)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      First and last name, email address, telephone number, mailing address, city, state, zip code, and organization/company name when submitted voluntarily.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-border/60 space-y-2">
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <CreditCard className="size-4 text-emerald-600" /> Transactional & Financial Data
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Donation amounts, recurring gift frequencies, tribute dedications, personal notes, and transaction reference IDs issued by card processors.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-border/60 space-y-2">
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <Sparkles className="size-4 text-purple-600" /> Program Application Data
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Volunteer interest areas, mentorship inquiries, financial literacy workshop enrollments, and event ticket reservations.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-border/60 space-y-2">
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      <Eye className="size-4 text-blue-600" /> Automated Technical Data
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      IP address, browser type, operating system, pages visited, time spent on site, referring URL, and session analytics cookies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: How We Use Information */}
              <div id="usage" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-emerald-600" /> 3. How We Use Your Information
                </h2>
                <p>Information collected by SOAR Global Foundation Inc. is used strictly to advance our charitable mission and deliver services:</p>
                
                <ul className="space-y-2 text-xs text-foreground/80 list-disc pl-5">
                  <li><strong>Processing Charitable Contributions:</strong> Executing donations, issuing official 501(c)(3) tax receipts, and providing annual giving statements.</li>
                  <li><strong>Program Delivery:</strong> Administering mentorship matching, homeownership guidance, and financial literacy workshops.</li>
                  <li><strong>Communication & Newsletters:</strong> Dispatched progress reports, foundation achievements, event invitations, and emergency community alerts (only to subscribers who opt-in).</li>
                  <li><strong>Customer Support & Inquiries:</strong> Responding to contact form submissions and live chat messages.</li>
                  <li><strong>Legal & Regulatory Compliance:</strong> Fulfilling state charitable solicitation registrations, IRS Form 990 audits, and mandatory financial reporting.</li>
                </ul>
              </div>

              {/* Section 4: Payment & Financial Security */}
              <div id="financial" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-emerald-50/30 border border-emerald-500/20 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                  <CreditCard className="size-5 text-emerald-600" /> 4. Payment Gateway Security & PCI-DSS Compliance
                </h2>
                <p>
                  Financial security is our highest priority. Online financial contributions submitted to SOAR Global Foundation Inc. are processed securely through certified Level-1 PCI-DSS compliant payment gateways, including <strong>Stripe Inc.</strong> and <strong>Zeffy</strong>.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-emerald-500/20 text-xs space-y-2">
                  <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <Lock className="size-4 text-emerald-600" /> Zero Payment Card Storage Policy
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    SOAR Global Foundation Inc. servers NEVER store, process, or transmit full credit card numbers, debit card PINs, or CVV security codes. Payment card credentials are tokenized directly within encrypted iframe modules provided by Stripe over 256-bit SSL connections.
                  </p>
                </div>
              </div>

              {/* Section 5: Information Sharing */}
              <div id="sharing" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  5. Authorized Service Providers & Legal Disclosure
                </h2>
                <p>
                  We do not share your information except with authorized third-party service providers who assist us in operating our foundation under strict confidentiality agreements:
                </p>
                <ul className="space-y-2 text-xs list-disc pl-5">
                  <li><strong>Cloud & Payment Infrastructure:</strong> Stripe (Payment Processing), MongoDB Atlas (Encrypted Database), Cloudinary (Media Hosting), Resend / Gmail API (Automated Email Receipts).</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law, subpoena, court order, or to protect the rights, safety, and property of SOAR Global Foundation Inc.</li>
                </ul>
              </div>

              {/* Section 6: Cookies */}
              <div id="cookies" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  6. Cookies & Web Analytics
                </h2>
                <p>
                  Our website uses cookies and session storage to enhance navigation, maintain security authentication, and collect aggregate web traffic statistics. You can modify your web browser settings to decline cookies; however, some site features may not function properly without essential cookies enabled.
                </p>
              </div>

              {/* Section 7: Rights */}
              <div id="rights" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  7. Your Rights & Data Choices
                </h2>
                <div className="grid sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-border/60 space-y-1">
                    <strong className="block text-foreground font-bold">Right to Inspect</strong>
                    <p className="text-muted-foreground">Request a copy of your personal donor or contact records.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-border/60 space-y-1">
                    <strong className="block text-foreground font-bold">Right to Opt-Out</strong>
                    <p className="text-muted-foreground">Unsubscribe from email newsletters via footer link at any time.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-border/60 space-y-1">
                    <strong className="block text-foreground font-bold">Right to Deletion</strong>
                    <p className="text-muted-foreground">Request deletion of non-essential records from our database.</p>
                  </div>
                </div>
              </div>

              {/* Section 8: Children's Privacy */}
              <div id="children" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
                <h2 className="font-display text-2xl font-extrabold text-foreground tracking-tight">
                  8. Children’s Privacy (COPPA Compliance)
                </h2>
                <p>
                  SOAR Global Foundation Inc. website is intended for a general audience and does not knowingly solicit or collect personal information from children under the age of 13 in compliance with the Children’s Online Privacy Protection Act (COPPA).
                </p>
              </div>

              {/* Section 9: Contact Desk */}
              <div id="contact" className="scroll-mt-32 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#170B2E] via-[#0E051E] to-[#170B2E] text-white shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                    Legal & Privacy Officer
                  </span>
                  <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">
                    9. Contact Us Regarding Your Privacy
                  </h2>
                  <p className="text-xs text-white/70">
                    If you have questions about this Privacy Policy, wish to update your donor record, or exercise your privacy rights, please contact our administrative desk:
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 text-xs pt-2">
                  <a
                    href="mailto:sistersoar14@gmail.com"
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition space-y-1 block"
                  >
                    <Mail className="size-4 text-[#D4AF37]" />
                    <span className="text-white/60 block font-semibold">Email Desk</span>
                    <strong className="text-white font-bold block truncate">sistersoar14@gmail.com</strong>
                  </a>

                  <a
                    href="tel:3217107145"
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition space-y-1 block"
                  >
                    <Phone className="size-4 text-[#D4AF37]" />
                    <span className="text-white/60 block font-semibold">Phone Support</span>
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
