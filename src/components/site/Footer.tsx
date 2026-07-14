import { Link } from "@tanstack/react-router";
import { Facebook, Mail, Phone, MapPin, Heart, Instagram, Twitter, Linkedin } from "lucide-react";
import { useSetting, type ContactSettings } from "@/lib/cms";
import footerLogoImg from "@/assets/footer-logo.png";

export function Footer() {
  const { data } = useSetting<ContactSettings>("contact");
  const phone = data?.phone ?? "(321) 710-7145";
  const email = data?.email ?? "sistersoar14@gmail.com";

  return (
    <footer className="relative bg-gradient-to-b from-[#110123] via-[#07000F] to-[#030007] overflow-hidden border-t-2 border-[#D4AF37]/40">

      {/* SVG Cascading Hanging Lights / Beaded Strings (Flyer Style) */}
      <svg className="absolute top-0 inset-x-0 h-32 w-full text-[#D4AF37]/20 pointer-events-none z-0" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 200">
        <line x1="120" y1="0" x2="120" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="120" cy="100" r="2.5" fill="#D4AF37" className="animate-pulse" />

        <line x1="280" y1="0" x2="280" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="280" cy="60" r="2" fill="#D4AF37" />

        <line x1="450" y1="0" x2="450" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="450" cy="120" r="2.5" fill="#D4AF37" className="animate-pulse" />

        <line x1="600" y1="0" x2="600" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="600" cy="70" r="2" fill="#D4AF37" />

        <line x1="750" y1="0" x2="750" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="750" cy="110" r="2.5" fill="#D4AF37" className="animate-pulse" />

        <line x1="920" y1="0" x2="920" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="920" cy="50" r="2" fill="#D4AF37" />

        <line x1="1080" y1="0" x2="1080" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="1080" cy="130" r="3" fill="#D4AF37" className="animate-pulse" />
      </svg>

      {/* Decorative gradient blur in background */}
      <div className="absolute top-[50%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#5E2B97]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#D4AF37]/5 blur-[90px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 text-white lg:px-10 z-10">

        {/* Newsletter Subscription Block (Separate Block) */}
        <div className="relative overflow-hidden rounded-[10px] border border-white/10 bg-white/5 p-6 md:p-10 mb-16 shadow-soft">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5E2B97]/20 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="max-w-xl text-left">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">Stay Connected</h3>
              <p className="mt-2 text-sm text-white/70 font-medium">Receive stories of impact and updates from our community.</p>
            </div>
            <form className="flex w-full lg:w-auto max-w-md gap-2.5 shrink-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full lg:w-72 rounded-[10px] border border-white/10 bg-[#120224]/80 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-200"
              />
              <button className="rounded-[10px] bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] hover:scale-[1.02] active:scale-[0.97] transition duration-200 px-5 py-3 text-sm font-bold text-[#0C1220] cursor-pointer shrink-0">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Card Column */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4">
              <img src={footerLogoImg} alt="SOAR Global Foundation" className="h-20 w-auto object-contain shrink-0" />
              <div>
                <div className="font-display text-base font-extrabold text-white leading-snug tracking-tight">SOAR Global</div>
                <div className="font-display text-base font-extrabold text-white leading-snug tracking-tight">Foundation Inc.</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mt-1">Est. 2014</div>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70 font-medium">
              Empowering women through education, mentorship, financial literacy, and pathways to homeownership.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100068064036234"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0C1220] hover:scale-105 shadow transition-all duration-200"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0C1220] hover:scale-105 shadow transition-all duration-200"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0C1220] hover:scale-105 shadow transition-all duration-200"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] border-b border-white/10 pb-3 mb-5">
              Explore
            </h4>
            <ul className="space-y-3.5 text-sm text-white/70 font-medium">
              <li><Link to="/our-story" className="hover:text-[#D4AF37] transition-colors duration-200">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-[#D4AF37] transition-colors duration-200">Programs</Link></li>
              <li><Link to="/success-stories" className="hover:text-[#D4AF37] transition-colors duration-200">Success Stories</Link></li>
              <li><Link to="/events" className="hover:text-[#D4AF37] transition-colors duration-200">Events</Link></li>
              <li><Link to="/blog" className="hover:text-[#D4AF37] transition-colors duration-200">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] border-b border-white/10 pb-3 mb-5">
              Get Involved
            </h4>
            <ul className="space-y-3.5 text-sm text-white/70 font-medium">
              <li><Link to="/donate" className="hover:text-[#D4AF37] transition-colors duration-200">Donate</Link></li>
              <li><Link to="/volunteer" className="hover:text-[#D4AF37] transition-colors duration-200">Volunteer</Link></li>
              <li><Link to="/partners" className="hover:text-[#D4AF37] transition-colors duration-200">Partners</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] border-b border-white/10 pb-3 mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-white/70 font-medium">
              <li className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-[#D4AF37] shrink-0">
                  <Phone className="size-4" />
                </div>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-[#D4AF37] transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-[#D4AF37] shrink-0">
                  <Mail className="size-4" />
                </div>
                <a href={`mailto:${email}`} className="hover:text-[#D4AF37] transition-colors break-all">
                  {email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-[#D4AF37] shrink-0 mt-0.5">
                  <MapPin className="size-4" />
                </div>
                <span className="text-white/70">
                  3311 N Powers Dr, Orlando, FL 32818
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 font-medium md:flex-row">
          <p className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-center md:text-left">
            <span>© {new Date().getFullYear()} SOAR Global Foundation Inc. Made with</span>
            <Heart className="size-3.5 text-red-500 fill-current animate-pulse shrink-0" />
            <span>for women everywhere.</span>
            <span className="text-white/20 px-1 hidden sm:inline">|</span>
            <span className="text-white/40">Design & Developed by <span className="text-[#D4AF37] font-semibold">StellR IT LLC</span></span>
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#D4AF37] transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
