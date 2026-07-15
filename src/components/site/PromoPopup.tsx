import { useEffect, useState, useRef } from "react";
import { useSetting, type PopupSettings } from "@/lib/cms";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ArrowRight, Calendar, Clock, MapPin, DollarSign, Shirt } from "lucide-react";
import defaultPopupImg from "@/assets/popup.jpg";
import { DialogClose } from "@radix-ui/react-dialog";

// Global flag to track if the popup was already shown in the current page session lifecycle.
// This gets reset to false when the user does a full page reload or browser refresh.
let hasShownThisSession = false;

export function PromoPopup() {
  const { data: settings, isLoading } = useSetting<PopupSettings>("popup");
  const [open, setOpen] = useState(false);

  // Keep references to the latest query states so the timer callback can read the most up-to-date data
  const settingsRef = useRef(settings);
  const loadingRef = useRef(isLoading);

  useEffect(() => {
    settingsRef.current = settings;
    loadingRef.current = isLoading;
  }, [settings, isLoading]);

  // 1. Mount Effect: Schedule the popup presentation once on page mount
  useEffect(() => {
    // Support a URL query parameter "?preview_popup=true" to force show the popup for admins
    const searchParams = new URLSearchParams(window.location.search);
    const isPreview = searchParams.get("preview_popup") === "true";

    if (isPreview || !hasShownThisSession) {
      const timer = setTimeout(() => {
        const currentSettings = settingsRef.current;
        const currentLoading = loadingRef.current;

        // If the settings finished loading and the popup is explicitly disabled, do not open it
        if (!currentLoading && currentSettings && currentSettings.enabled === false && !isPreview) {
          return;
        }

        setOpen(true);
        if (!isPreview) {
          hasShownThisSession = true;
        }
      }, 1500); // 1.5s entrance delay

      return () => clearTimeout(timer);
    }
  }, []);

  // 2. Settings Effect: Close the popup if the settings are updated and the admin disabled it
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const isPreview = searchParams.get("preview_popup") === "true";

    if (!isLoading && settings && settings.enabled === false && !isPreview) {
      setOpen(false);
    }
  }, [settings, isLoading]);

  // Decide which image, link, and texts to show (defaults with fallbacks)
  const imageSrc = settings?.imageUrl || defaultPopupImg;
  const titleText = settings?.title || "ANNUAL GALA INVITATION";
  const buttonText = settings?.buttonText || "Get Tickets Now";
  const linkUrl = settings?.linkUrl || "/donate";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 border-none bg-transparent max-w-[92vw] md:max-w-4xl max-h-[96vh] overflow-y-auto rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] select-none duration-300 ring-1 ring-white/10"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">
          Special Announcement
        </DialogTitle>

        {/* 2-Column Responsive Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full overflow-hidden rounded-[28px] bg-[#0C061A] text-white border border-white/5 relative">

          {/* Close button with premium glass backdrop hover effect */}
          <DialogClose className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-50 size-8 sm:size-9 rounded-full bg-black/40 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:scale-105 active:scale-95 transition-all grid place-items-center cursor-pointer backdrop-blur-md shadow-lg">
            <X className="size-4 sm:size-4.5" />
          </DialogClose>

          {/* Left Column: Image Area (col-span 5 on desktop, natural aspect ratio on mobile) */}
          <div className="relative w-full h-auto md:col-span-5 overflow-hidden md:min-h-[460px] group/img">
            <img
              src={imageSrc}
              alt="Promo flyer banner"
              className="w-full h-auto md:h-full md:object-cover group-hover/img:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            {/* Subtle overlay shading for desktop only */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0C061A]/50 pointer-events-none hidden md:block" />
          </div>

          {/* Right Column: Event Details Card (col-span 7 on desktop) */}
          <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12 md:col-span-7 bg-gradient-to-b from-[#140C26] to-[#0A0314] text-left relative space-y-4.5 sm:space-y-6">

            {/* Header titles */}
            <div className="space-y-1">
              <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Upcoming Event
              </span>
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4AF37] via-[#F2D27C] to-[#D4AF37] bg-clip-text text-transparent leading-tight select-text whitespace-normal sm:whitespace-nowrap">
                {titleText}
              </h3>
            </div>

            {/* Structured Event Info list (single-line rows) */}
            <div className="space-y-2.5 sm:space-y-3.5 select-text text-xs sm:text-sm">

              {/* Date */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-2 sm:pb-2.5">
                <Calendar className="size-3.5 sm:size-4 text-[#D4AF37] shrink-0" />
                <span className="text-slate-300 font-light truncate">
                  <strong className="text-[#D4AF37] font-semibold mr-1.5 uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">Date:</strong>
                  Saturday, October 24, 2026
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-2 sm:pb-2.5">
                <Clock className="size-3.5 sm:size-4 text-[#D4AF37] shrink-0" />
                <span className="text-slate-300 font-light truncate">
                  <strong className="text-[#D4AF37] font-semibold mr-1.5 uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">Time:</strong>
                  5:00 PM – 9:00 PM
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-2 sm:pb-2.5">
                <MapPin className="size-3.5 sm:size-4 text-[#D4AF37] shrink-0" />
                <span className="text-slate-300 font-light truncate">
                  <strong className="text-[#D4AF37] font-semibold mr-1.5 uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">Location:</strong>
                  788 Montgomery Ave Ocoee, FL 34761
                </span>
              </div>

              {/* Contribution */}
              <div className="flex items-center gap-3 border-b border-white/5 pb-2 sm:pb-2.5">
                <DollarSign className="size-3.5 sm:size-4 text-[#D4AF37] shrink-0" />
                <span className="text-slate-300 font-light truncate">
                  <strong className="text-[#D4AF37] font-semibold mr-1.5 uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">Contribution:</strong>
                  $50 per person
                </span>
              </div>

              {/* Attire */}
              <div className="flex items-center gap-3 pb-0.5">
                <Shirt className="size-3.5 sm:size-4 text-[#D4AF37] shrink-0" />
                <span className="text-slate-300 font-light truncate">
                  <strong className="text-[#D4AF37] font-semibold mr-1.5 uppercase tracking-wider text-[9px] sm:text-[10px] md:text-xs">Attire:</strong>
                  <span className="text-[#F2D27C] font-semibold">Purple & Gold Formal</span>
                </span>
              </div>

            </div>

            {/* Submit ticket link button */}
            <a
              href={linkUrl}
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] hover:text-[#000] active:scale-[0.98] transition-all font-black text-xs uppercase tracking-widest text-center cursor-pointer shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)]"
            >
              {buttonText}
              <ArrowRight className="size-4" />
            </a>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
