import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { useSetting, saveSettingFn, type HeroSettings, type ContactSettings } from "@/lib/cms";
import { Field } from "./TeamManager";

function useSettingForm<T extends Record<string, unknown>>(key: string) {
  const { data, isLoading } = useSetting<T>(key);
  const qc = useQueryClient();
  const [form, setForm] = useState<T>({} as T);
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async (value: T) => {
      const res = await saveSettingFn({ data: { key, value } });
      if (!res.success) throw new Error("Failed to save setting");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "setting", key] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  return { form, setForm, save, isLoading, saved };
}

export function HeroManager() {
  const { form, setForm, save, isLoading, saved } = useSettingForm<HeroSettings>("hero");
  if (isLoading) return <p className="text-sm text-white/50">Loading…</p>;
  return (
    <div>
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Hero & Homepage Copy</h2>
      </div>
      <div className="grid gap-5 max-w-2xl">
        <Field label="Eyebrow" value={form.eyebrow ?? ""} onChange={(v) => setForm({ ...form, eyebrow: v })} />
        <Field label="Headline" value={form.headline ?? ""} onChange={(v) => setForm({ ...form, headline: v })} />
        <Field label="Sub-headline" value={form.subheadline ?? ""} onChange={(v) => setForm({ ...form, subheadline: v })} textarea />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Stat 1 value" value={form.stat1_value ?? ""} onChange={(v) => setForm({ ...form, stat1_value: v })} />
          <Field label="Stat 2 value" value={form.stat2_value ?? ""} onChange={(v) => setForm({ ...form, stat2_value: v })} />
          <Field label="Stat 3 value" value={form.stat3_value ?? ""} onChange={(v) => setForm({ ...form, stat3_value: v })} />
          <Field label="Stat 1 label" value={form.stat1_label ?? ""} onChange={(v) => setForm({ ...form, stat1_label: v })} />
          <Field label="Stat 2 label" value={form.stat2_label ?? ""} onChange={(v) => setForm({ ...form, stat2_label: v })} />
          <Field label="Stat 3 label" value={form.stat3_label ?? ""} onChange={(v) => setForm({ ...form, stat3_label: v })} />
        </div>
        <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-2">
          <button onClick={() => save.mutate(form)} disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-glow cursor-pointer">
            {save.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save Settings
          </button>
          {saved && <span className="text-xs text-green-400 font-bold tracking-wider animate-pulse">Saved successfully ✓</span>}
        </div>
      </div>
    </div>
  );
}

export function ContactManager() {
  const { form, setForm, save, isLoading, saved } = useSettingForm<ContactSettings>("contact");
  if (isLoading) return <p className="text-sm text-white/50">Loading…</p>;
  return (
    <div>
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Contact Info</h2>
      </div>
      <div className="grid gap-5 max-w-2xl">
        <Field label="Email" value={form.email ?? ""} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Phone" value={form.phone ?? ""} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="Address" value={form.address ?? ""} onChange={(v) => setForm({ ...form, address: v })} textarea />
        <Field label="Hours" value={form.hours ?? ""} onChange={(v) => setForm({ ...form, hours: v })} />
        <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-2">
          <button onClick={() => save.mutate(form)} disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-glow cursor-pointer">
            {save.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save Settings
          </button>
          {saved && <span className="text-xs text-green-400 font-bold tracking-wider animate-pulse">Saved successfully ✓</span>}
        </div>
      </div>
    </div>
  );
}
