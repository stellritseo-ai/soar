import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHeader } from "@/components/site/PageHeader";
import { Phone, Mail, MapPin, Send, Facebook, Instagram, Linkedin, Youtube, CheckCircle, Sparkles, ChevronDown, HelpCircle, Map, ExternalLink } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { submitInquiryFn } from "@/lib/cms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — SOAR Global Foundation" },
      { name: "description", content: "Get in touch with SOAR Global Foundation. Reaching out is the first step in building a future where every woman can soar." },
      { property: "og:title", content: "Contact Us — SOAR Global Foundation" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const FAQS = [
  {
    q: "How can I apply for support?",
    a: "If you are a woman seeking mentorship, financial literacy training, or housing assistance, please select 'A Woman Seeking Support' in our contact form. A sisterhood coordinator will reach out to schedule an intake chat."
  },
  {
    q: "Where do my donations go?",
    a: "100% of public donations directly fund our local outreach, housing educational pathways, and support circles. All administrative costs are covered by our founders and corporate sponsors."
  },
  {
    q: "How can I volunteer in Orlando?",
    a: "We organize regular outreach events and workshops. Fill out the volunteer selector in our form, and we will send you a calendar of upcoming local training sessions."
  },
  {
    q: "Do you partner with other community organizations?",
    a: "Yes, we collaborate closely with local shelters, housing agencies, and educational groups to build holistic networks of care in the Orlando community."
  }
];

function Contact() {
  // Form submission state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    role: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    try {
      await submitInquiryFn({
        data: {
          name: formState.name,
          email: formState.email,
          subject: formState.role || "General Inquiry",
          message: formState.message
        }
      });
      setIsSuccess(true);
      setFormState({ name: "", email: "", role: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <SiteLayout>
      <div className="bg-gradient-to-b from-background via-[#FDFBF7] to-[#F3F0F8]/40 min-h-screen">
        <PageHeader
          eyebrow="Get In Touch"
          title={<>Let's Rise <span className="text-gradient-brand italic font-extrabold">Together</span>.</>}
          subtitle="We’d love to hear from you. Whether you are a woman seeking support, a potential partner, a donor, or a volunteer, your outreach is the first step in building a future where every woman can soar. Please reach out, and a member of our sisterhood will connect with you."
          bgImage={heroImg}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-24 mt-[50px]">
          {/* Ambient soft glow background decorations */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

          {/* Contact Cards & Form split */}
          <div className="grid gap-12 lg:grid-cols-5 relative z-10">
            {/* Info Side */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                <Sparkles className="size-5 text-accent" /> Connect With Us
              </h3>

              {/* Location Card */}
              <div className="group glass rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/5 border border-primary/10 shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition duration-300">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Location</div>
                    <h4 className="text-foreground font-extrabold mt-1 text-sm">Headquarters</h4>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      3311 N Powers Dr<br />
                      Orlando, FL 32818
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group glass rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/5 border border-primary/10 shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition duration-300">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Phone</div>
                    <h4 className="text-foreground font-extrabold mt-1 text-sm">Speak Directly</h4>
                    <a href="tel:3217107145" className="inline-block mt-1 text-base font-bold text-foreground hover:text-primary transition">
                      (321) 710-7145
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="group glass rounded-2xl p-6 shadow-soft hover:shadow-elegant hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/5 border border-primary/10 shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition duration-300">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Email</div>
                    <h4 className="text-foreground font-extrabold mt-1 text-sm">Inquiries & Partnerships</h4>
                    <a href="mailto:sistersoar14@gmail.com" className="inline-block mt-1 text-base font-bold text-foreground hover:text-primary transition break-all">
                      sistersoar14@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Premium Vector Mock Map */}
              <div className="glass rounded-[24px] overflow-hidden p-1 shadow-soft group hover:border-[#D4AF37]/30 transition duration-300">
                <div className="relative aspect-[16/10] w-full rounded-[20px] bg-[#EAE8F2] overflow-hidden border border-black/5 flex items-center justify-center">
                  {/* Map Grid Pattern representation */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  {/* Decorative Map Road Graphics */}
                  <div className="absolute top-1/2 left-0 w-full h-3 bg-white border-y border-black/5 -translate-y-1/2 rotate-12" />
                  <div className="absolute top-0 left-1/3 w-4 h-full bg-white border-x border-black/5 -translate-x-1/2 -rotate-45" />
                  <div className="absolute top-0 right-1/4 w-3.5 h-full bg-white border-x border-black/5 -translate-x-1/2 rotate-45" />
                  
                  {/* Glowing Location Pins */}
                  <div className="absolute top-[42%] left-[45%] z-10 flex flex-col items-center">
                    <span className="relative flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-primary to-accent border-2 border-white shadow-soft"></span>
                    </span>
                    <span className="mt-1 bg-[#3A0A63] text-[9px] text-white font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                      SOAR HQ
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 z-10">
                    <a 
                      href="https://maps.google.com/?q=821+Good+Homes+Road,+Orlando,+FL+32818" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground hover:bg-slate-50 transition shadow-sm"
                    >
                      <Map className="size-3 text-primary" /> Directions <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form Side */}
            <div className="lg:col-span-3">
              <form onSubmit={handleFormSubmit} className="glass rounded-[28px] p-8 shadow-elegant relative overflow-hidden h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                    Send Us a Message
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">Let us know how we can help you or how you would like to get involved.</p>

                  {isSuccess ? (
                    <div className="mt-12 rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center animate-fade-in my-auto">
                      <CheckCircle className="size-16 text-green-500 mx-auto animate-bounce" />
                      <h4 className="text-foreground font-bold mt-4 text-xl">Message Sent Successfully!</h4>
                      <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out to the SOAR Global sisterhood. One of our community coordinators will connect with you shortly.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep/80">Name</span>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="mt-2 w-full rounded-xl border border-border bg-white/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                            placeholder="Your name"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep/80">Email</span>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="mt-2 w-full rounded-xl border border-border bg-white/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                            placeholder="Your email address"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep/80">I am...</span>
                        <select
                          value={formState.role}
                          onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                          className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 cursor-pointer"
                        >
                          <option value="">Select one...</option>
                          <option value="Seeking Support">A Woman Seeking Support</option>
                          <option value="Volunteer">A Potential Volunteer</option>
                          <option value="Donor">A Donor or Sponsor</option>
                          <option value="Partner">A Community Partner</option>
                          <option value="Media">A Media or Press Representative</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary-deep/80">Message</span>
                        <textarea
                          rows={5}
                          required
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="mt-2 w-full rounded-xl border border-border bg-white/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                          placeholder="Type your message..."
                        />
                      </label>
                    </div>
                  )}
                </div>

                {!isSuccess && (
                  <div className="mt-8 pt-4 border-t border-border/40">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-xs font-extrabold uppercase tracking-wider text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-soft"
                    >
                      <Send className="size-4" /> {isSubmitting ? "Submitting..." : "Submit Message"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Interactive FAQ Section Accordions */}
          <div className="mt-24 max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <HelpCircle className="size-3.5 text-primary" /> FAQ
              </span>
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight mt-3">Frequently Asked Questions</h3>
            </div>

            <div className="mt-8 space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className="glass rounded-2xl overflow-hidden border border-border transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span className="text-base">{faq.q}</span>
                      <ChevronDown className={`size-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[200px] pb-5 text-sm text-muted-foreground leading-relaxed" : "max-h-0"
                      }`}
                    >
                      {faq.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stay Connected (Newsletter Card) */}
          <div className="mt-24 relative rounded-[32px] border border-primary/10 bg-gradient-to-r from-[#F7F4FC] to-[#FDFBF7] p-8 md:p-12 shadow-soft overflow-hidden">
            <div className="absolute right-[-10%] top-[-30%] w-[350px] h-[350px] rounded-full bg-accent/5 blur-[80px]" />
            <div className="max-w-3xl relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#3A0A63] tracking-tight">Stay Connected</h3>
              <p className="mt-2.5 text-sm md:text-base text-muted-foreground leading-relaxed">
                Join our community and stay informed about events, success stories, and ways to make an impact.
              </p>

              {newsletterSuccess ? (
                <p className="mt-6 text-sm text-primary font-bold tracking-wider animate-pulse">✓ Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="rounded-full border border-border bg-white px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 flex-grow"
                    placeholder="you@example.com"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#3A0A63] text-white hover:bg-[#3A0A63]/90 hover:scale-[1.03] active:scale-[0.98] transition px-7 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-soft"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="mt-20 border-t border-border pt-12 text-center space-y-6">
            <h4 className="text-lg font-bold text-foreground tracking-tight">Connect With Us on Social Media</h4>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Follow us on social media to stay up-to-date with our programs and the women we serve.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
              ].map((soc, index) => (
                <a
                  key={index}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={soc.label}
                  className="grid size-12 place-items-center rounded-full border border-border bg-white text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-sm"
                >
                  <soc.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mt-16 text-center">
            <p className="text-lg md:text-xl text-[#D4AF37] italic font-display font-semibold leading-relaxed">
              "We look forward to connecting with you and rising together."
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
