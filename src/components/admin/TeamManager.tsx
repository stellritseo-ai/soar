import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, Save, Users } from "lucide-react";
import { useTeam, upsertTeamMemberFn, deleteTeamMemberFn, type TeamMember } from "@/lib/cms";
import { ImageInput } from "./ImageInput";

type Draft = Partial<TeamMember> & { name: string; role: string };

export function TeamManager() {
  const { data, isLoading } = useTeam();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["cms", "team"] });

  const save = useMutation({
    mutationFn: async (row: Draft) => {
      const res = await upsertTeamMemberFn({ data: row });
      if (!res.success) throw new Error("Failed to save team member");
    },
    onSuccess: () => { invalidate(); setEditing(null); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteTeamMemberFn({ data: id });
      if (!res.success) throw new Error("Failed to delete team member");
    },
    onSuccess: invalidate,
  });

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Team Members</h2>
        <button onClick={() => setEditing({ name: "", role: "", sort_order: (data?.length ?? 0) })}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.03] active:scale-[0.98] shadow-glow transition duration-200 cursor-pointer">
          <Plus className="size-4" /> Add member
        </button>
      </div>

      {isLoading ? <p className="mt-6 text-sm text-white/50">Loading…</p> : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {data?.map((m) => (
            <div key={m.id} className="flex gap-4 rounded-[18px] border border-white/10 bg-white/5 p-5 hover:border-[#D4AF37]/30 hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
              {m.image_url ? (
                <img src={m.image_url} alt="" className="size-20 rounded-xl object-cover border border-white/10" />
              ) : <div className="size-20 rounded-xl bg-white/10 flex items-center justify-center text-white/20"><Users className="size-8" /></div>}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-base leading-snug">{m.name}</div>
                <div className="text-xs font-bold text-[#D4AF37] mt-0.5">{m.role}</div>
                <div className="mt-2 text-xs text-white/60 leading-relaxed truncate">{m.bio}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(m)} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 transition cursor-pointer">Edit</button>
                  <button onClick={() => { if (confirm(`Delete ${m.name}?`)) remove.mutate(m.id); }}
                    className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition cursor-pointer">
                    <Trash2 className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {data?.length === 0 && <p className="text-sm text-white/40">No team members yet.</p>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#07000F]/80 backdrop-blur-md p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-[24px] bg-[#110123] border border-white/15 p-8 shadow-elegant text-white">
            <h3 className="font-display text-xl font-bold border-b border-white/10 pb-3 text-white">{editing.id ? "Edit member" : "Add member"}</h3>
            <div className="mt-6 space-y-4">
              <Field label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Field label="Role" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
              <Field label="Bio" value={editing.bio ?? ""} onChange={(v) => setEditing({ ...editing, bio: v })} textarea />
              <ImageInput folder="team" value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
              <Field label="Sort order" type="number" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} />
            </div>
            <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-4">
              <button onClick={() => setEditing(null)} className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition cursor-pointer">Cancel</button>
              <button onClick={() => save.mutate(editing)} disabled={save.isPending || !editing.name || !editing.role}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                {save.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
              </button>
            </div>
            {save.error && <p className="mt-2 text-xs text-red-400">{(save.error as Error).message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export function Field({ label, value, onChange, textarea, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D4AF37]/90">{label}</span>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/10 transition-all duration-200" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/10 transition-all duration-200" />
      )}
    </label>
  );
}
