import { Link } from "@tanstack/react-router";
import { Facebook, Mail, Phone, MapPin, Heart } from "lucide-react";
import { useSetting, type ContactSettings } from "@/lib/cms";

export function Footer() {
  const { data } = useSetting<ContactSettings>("contact");
  const c: ContactSettings = data ?? {};
  return (
    <footer className="relative mt-32 overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="absolute -left-40 -top-40 size-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-primary/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 text-primary-foreground lg:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur">
                <span className="font-display text-xl font-bold">S</span>
              </span>
              <div>
                <div className="font-display text-lg font-bold">SOAR Global Foundation</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/70">Helping Women Dream Again</div>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
              Empowering women through education, mentorship, financial literacy, and pathways to homeownership.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link to="/about" className="hover:text-accent-soft">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-accent-soft">Programs</Link></li>
              <li><Link to="/success-stories" className="hover:text-accent-soft">Success Stories</Link></li>
              <li><Link to="/events" className="hover:text-accent-soft">Events</Link></li>
              <li><Link to="/blog" className="hover:text-accent-soft">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg">Get Involved</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link to="/donate" className="hover:text-accent-soft">Donate</Link></li>
              <li><Link to="/volunteer" className="hover:text-accent-soft">Volunteer</Link></li>
              <li><Link to="/partners" className="hover:text-accent-soft">Partners</Link></li>
              <li><Link to="/contact" className="hover:text-accent-soft">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg">Stay Connected</h4>
            <p className="mt-5 text-sm text-white/80">Receive stories of impact and updates from our community.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm placeholder:text-white/50 focus:border-accent focus:outline-none"
              />
              <button className="rounded-full gradient-gold px-4 py-2.5 text-sm font-semibold text-primary-deep">
                Join
              </button>
            </form>

            <ul className="mt-6 space-y-2.5 text-sm text-white/80">
              {c.phone && <li className="flex items-center gap-2"><Phone className="size-4 text-accent-soft" /> {c.phone}</li>}
              {c.email && <li className="flex items-center gap-2"><Mail className="size-4 text-accent-soft" /> {c.email}</li>}
              {c.address && <li className="flex items-center gap-2"><MapPin className="size-4 text-accent-soft" /> {c.address}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs text-white/70 md:flex-row">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} SOAR Global Foundation Inc. Made with <Heart className="size-3.5 text-accent-soft" /> for women everywhere.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-accent-soft">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent-soft">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
