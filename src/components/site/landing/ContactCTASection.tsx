import { useState } from "react";
import imgMentorship from "@/assets/value-mentorship.png";

export function ContactCTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
    acceptedTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      alert("Please accept the terms to proceed.");
      return;
    }
    // Simulate premium submit transition
    setSubmitted(true);
  };

  return (
    <section className="relative py-20 bg-background overflow-hidden border-t border-border/40">
      {/* Background blurs contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#5E2B97]/5 to-transparent blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Premium Form */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5E2B97]">
              Connect With Us
            </span>
            <h2 className="mt-[10px] font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight text-[#3A0A63] font-extrabold">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] font-extrabold">talk</span>
            </h2>
          </div>

          {submitted ? (
            <div className="rounded-[10px] border border-green-500/20 bg-green-500/5 p-6 text-left animate-fade-up">
              <h3 className="font-display text-xl font-bold text-green-600">Thank you!</h3>
              <p className="mt-2 text-sm text-muted-foreground font-medium">
                Your message has been sent successfully. One of our coordinators will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold text-[#5E2B97] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-[10px] border border-border bg-white/70 backdrop-blur-sm px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#5E2B97] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5E2B97]/10 transition-all duration-200"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-email" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                    Email
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-[10px] border border-border bg-white/70 backdrop-blur-sm px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#5E2B97] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5E2B97]/10 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Row 2: Select Role */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-role" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  I am
                </label>
                <select
                  id="form-role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-[10px] border border-border bg-white/70 backdrop-blur-sm px-4 py-3.5 text-sm text-foreground focus:border-[#5E2B97] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5E2B97]/10 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25em_1.25em] bg-[right_1rem_center] bg-no-repeat"
                >
                  <option value="" disabled>Select one...</option>
                  <option value="support">A woman seeking support</option>
                  <option value="volunteer">Interested in volunteering</option>
                  <option value="sponsor">A prospective sponsor / partner</option>
                  <option value="other">Other inquiry</option>
                </select>
              </div>

              {/* Row 3: Message Textarea */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-message" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  Message
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-[10px] border border-border bg-white/70 backdrop-blur-sm px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#5E2B97] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5E2B97]/10 transition-all duration-200 resize-y"
                />
              </div>

              {/* Row 4: Terms Checkbox */}
              <div className="flex items-center gap-3 mt-1">
                <input
                  id="form-terms"
                  type="checkbox"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  className="size-4 rounded border-border text-[#5E2B97] focus:ring-[#5E2B97] cursor-pointer"
                />
                <label htmlFor="form-terms" className="text-xs font-semibold text-muted-foreground select-none cursor-pointer">
                  I accept the{" "}
                  <a href="/terms" className="text-[#5E2B97] hover:underline font-bold">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              {/* Row 5: Submit Button */}
              <button
                type="submit"
                className="mt-4 self-start inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5E2B97] to-[#481E7A] text-white font-bold px-10 py-4 text-sm shadow-elegant transition duration-200 hover:scale-[1.02] hover:shadow-glow active:scale-[0.97] cursor-pointer"
              >
                Submit
              </button>

            </form>
          )}
        </div>

        {/* Right Side: Cozy Image */}
        <div className="relative hidden md:block">
          {/* Subtle gold glow behind image */}
          <div className="absolute -inset-4 rounded-[14px] bg-gradient-to-tr from-[#D4AF37]/10 to-transparent blur-2xl z-0" />
          
          {/* Framed Image Container with 10px Rounded Borders */}
          <div className="relative border border-border/80 bg-background/50 backdrop-blur-md p-3 rounded-[12px] shadow-elegant overflow-hidden z-10">
            <div className="overflow-hidden rounded-[10px] aspect-[4/3]">
              <img
                src={imgMentorship}
                alt="Two women chatting cozily over coffee"
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
