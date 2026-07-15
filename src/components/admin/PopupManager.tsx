import { useState, useEffect } from "react";
import { useSettingForm } from "./SettingsManagers";
import { Field } from "./TeamManager";
import { ImageInput } from "./ImageInput";
import { Loader2, Save, Eye, RefreshCw, X, ArrowRight, Trash2, Copy, Check, Mail } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type PopupSettings, useNewsletterSubscribers, deleteNewsletterSubscriberFn } from "@/lib/cms";
import defaultPopupImg from "@/assets/popup.jpg";

export function PopupManager() {
  const qc = useQueryClient();
  const { form, setForm, save, isLoading: settingsLoading, saved } = useSettingForm<PopupSettings>("popup");
  const { data: subscribers, isLoading: subsLoading } = useNewsletterSubscribers();

  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [localReset, setLocalReset] = useState(false);

  // Initialize defaults if form fields are undefined
  useEffect(() => {
    if (form) {
      if (form.enabled === undefined) {
        setForm((prev) => ({ ...prev, enabled: true }));
      }
      if (form.title === undefined) {
        setForm((prev) => ({ ...prev, title: "HELP WOMEN SOAR" }));
      }
      if (form.description === undefined) {
        setForm((prev) => ({ 
          ...prev, 
          description: "Subscribe now to receive updates on upcoming events, mentorship bootcamps, and inspiring stories of resilience." 
        }));
      }
      if (form.buttonText === undefined) {
        setForm((prev) => ({ ...prev, buttonText: "JOIN THE MISSION" }));
      }
    }
  }, [form, setForm]);

  // Delete subscriber mutation
  const deleteSub = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNewsletterSubscriberFn({ data: id });
      if (!res.success) throw new Error("Failed to delete subscriber");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "subscribers"] });
    },
  });

  if (settingsLoading) return <p className="text-sm text-white/50">Loading settings panel…</p>;

  const imageSrc = form.imageUrl || defaultPopupImg;
  const titleText = form.title || "HELP WOMEN SOAR";
  const descText = form.description || "Subscribe now to receive updates on upcoming events, mentorship bootcamps, and inspiring stories of resilience.";
  const buttonText = form.buttonText || "JOIN THE MISSION";

  // Copy all emails list to clipboard helper
  function copyAllEmails() {
    if (!subscribers || subscribers.length === 0) return;
    const emailsList = subscribers.map(s => s.email).join(", ");
    navigator.clipboard.writeText(emailsList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function resetLocalStorageFlag() {
    localStorage.removeItem("soar_popup_shown");
    setLocalReset(true);
    setTimeout(() => setLocalReset(false), 2000);
  }

  return (
    <div className="space-y-10">
      
      {/* 1. Page Header */}
      <div className="border-b border-white/10 pb-5">
        <h2 className="font-display text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Website Announcement Pop Up
        </h2>
        <p className="mt-1 text-sm text-white/50">
          Configure the split-screen subscription modal that loads when visitors open the homepage.
        </p>
      </div>

      {/* 2. Grid Columns: Fields vs Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: form fields */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active switch toggle */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Popup Status</h3>
              <p className="text-xs text-white/40 mt-1">Render this popup on the public website home page.</p>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, enabled: !form.enabled })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37] ${
                form.enabled ? "bg-[#D4AF37]" : "bg-white/10"
              }`}
            >
              <span
                className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                  form.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Heading title field */}
          <div className="space-y-1">
            <Field
              label="Popup Main Title"
              value={titleText}
              onChange={(v) => setForm({ ...form, title: v })}
            />
          </div>

          {/* Description text field */}
          <div className="space-y-1">
            <Field
              label="Popup Body Description"
              value={descText}
              onChange={(v) => setForm({ ...form, description: v })}
              textarea
            />
          </div>

          {/* Button label field */}
          <div className="space-y-1">
            <Field
              label="Action Button Label"
              value={buttonText}
              onChange={(v) => setForm({ ...form, buttonText: v })}
            />
          </div>

          {/* Flyer image upload input */}
          <div className="space-y-2">
            <ImageInput
              label="Left Column Flyer Image"
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url || undefined })}
              folder="popups"
            />
            <p className="text-[11px] text-white/30">
              Falls back to default <code className="text-white/60">popup.jpg</code> image from assets folder if left blank.
            </p>
          </div>

          {/* Save panel */}
          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 mt-4">
            <button
              onClick={() => save.mutate(form)}
              disabled={save.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer shadow-glow"
            >
              {save.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} 
              Save Settings
            </button>
            {saved && (
              <span className="text-xs text-green-400 font-bold tracking-wider animate-pulse">
                Saved successfully ✓
              </span>
            )}
          </div>

          {/* Developer test options */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">Utilities</h4>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition cursor-pointer"
              >
                <Eye className="size-4 text-[#D4AF37]" />
                Trigger Live Preview
              </button>
              <button
                type="button"
                onClick={resetLocalStorageFlag}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition cursor-pointer"
              >
                <RefreshCw className="size-4 text-purple-400" />
                {localReset ? "Reset Successful!" : "Force Show On Next Refresh"}
              </button>
            </div>
          </div>

        </div>

        {/* Right column: split preview panel */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37]/90 mb-3 self-start lg:self-center">
            Split-Screen Mockup Preview
          </span>
          <div className="relative w-full max-w-[340px] rounded-2xl bg-[#0C061A] text-white border border-white/10 overflow-hidden shadow-2xl p-0.5">
            {/* Split layout in mockup */}
            <div className="grid grid-cols-1 bg-[#140C26] text-white select-none">
              {/* Image banner */}
              <div className="relative h-[110px] w-full overflow-hidden">
                <img
                  src={imageSrc}
                  alt="Mock image"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Form details section */}
              <div className="p-5 space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-[#D4AF37]">Upcoming Event</span>
                  <h4 className="font-serif text-base font-extrabold tracking-tight text-white leading-tight uppercase truncate">
                    {titleText}
                  </h4>
                </div>
                {/* Structured Event Info for mockup */}
                <div className="space-y-1.5 text-[10px] text-slate-300">
                  <div className="flex justify-between border-b border-white/5 pb-0.5">
                    <span className="text-[#D4AF37]">Date</span>
                    <span>Oct 24, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-0.5">
                    <span className="text-[#D4AF37]">Time</span>
                    <span>5:00 - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#D4AF37]">Location</span>
                    <span className="truncate max-w-[120px]">Ocoee, FL</span>
                  </div>
                </div>
                <div className="w-full py-2 bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-black text-[9px] uppercase tracking-widest text-center rounded-lg mt-1">
                  {buttonText}
                </div>
              </div>
            </div>
            {/* Close button mock */}
            <div className="absolute top-2.5 right-2.5 size-6 rounded-full bg-black/40 text-white/80 border border-white/10 grid place-items-center">
              <X className="size-3" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Subscribers List Section */}
      <div className="border-t border-white/10 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Mail className="size-5 text-[#D4AF37]" /> Collected Subscriptions
            </h3>
            <p className="text-sm text-white/50 mt-1">
              List of users who dropped their email in the website pop up.
            </p>
          </div>
          {subscribers && subscribers.length > 0 && (
            <button
              onClick={copyAllEmails}
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/15 text-[#D4AF37] px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied List!" : "Copy Emails List"}
            </button>
          )}
        </div>

        {subsLoading ? (
          <p className="text-sm text-white/40">Loading subscribers list...</p>
        ) : !subscribers || subscribers.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/2">
            <p className="text-sm text-white/40">No subscribers collected yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-white/10 rounded-2xl bg-white/2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider font-semibold">
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Date Subscribed</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors duration-150">
                    <td className="px-6 py-4 font-mono select-all text-white font-medium">{sub.email}</td>
                    <td className="px-6 py-4 text-white/50">
                      {new Date(sub.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Remove subscription for ${sub.email}?`)) {
                            deleteSub.mutate(sub.id);
                          }
                        }}
                        disabled={deleteSub.isPending}
                        className="p-2 border border-white/5 rounded-lg text-white/40 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition cursor-pointer disabled:opacity-50"
                        title="Delete subscriber"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Full interactive preview modal overlay */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-[#0C061A] text-white border border-white/5 shadow-2xl select-none">
            {/* Close button */}
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 z-50 size-9 rounded-full bg-black/40 text-white/80 border border-white/10 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all grid place-items-center cursor-pointer backdrop-blur-md"
            >
              <X className="size-4.5" />
            </button>

            {/* Split Preview Panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 w-full overflow-hidden rounded-[28px] bg-[#0C061A] text-white">
              {/* Image banner */}
              <div className="relative h-[180px] md:h-auto md:col-span-5 w-full overflow-hidden md:min-h-[400px]">
                <img
                  src={imageSrc}
                  alt="Promotion Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event details info */}
              <div className="flex flex-col justify-center p-8 md:p-10 md:col-span-7 bg-gradient-to-b from-[#140C26] to-[#0A0314] text-left space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Upcoming Event</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4AF37] via-[#F2D27C] to-[#D4AF37] bg-clip-text text-transparent leading-tight">
                    {titleText}
                  </h3>
                </div>
                
                {/* Structured Event Info Grid */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#D4AF37] font-medium">Date</span>
                    <span>Saturday, October 24, 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#D4AF37] font-medium">Time</span>
                    <span>5:00 PM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#D4AF37] font-medium">Location</span>
                    <span>Greater Vision Center, Ocoee, FL</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[#D4AF37] font-medium">Contribution</span>
                    <span>$50 per person</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#D4AF37] font-medium">Attire</span>
                    <span className="text-[#F2D27C] font-semibold">Purple & Gold Formal</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    alert(`This is a mock preview! Will redirect to: ${linkUrl}`);
                    setShowPreviewModal(false);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] font-bold text-xs uppercase tracking-widest text-center cursor-pointer rounded-xl"
                >
                  {buttonText}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
