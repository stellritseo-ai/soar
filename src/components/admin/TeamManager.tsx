import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTeam, type TeamMember } from "@/lib/cms";
import { ImageInput } from "./ImageInput";

type Draft = Partial<TeamMember> & { name: string; role: string };

export function TeamManager() {
  const { data, isLoading } = useTeam();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["cms", "team"] });

  const save = useMutation({
    mutationFn: async (row: Draft) => {
      if (row.id) {
        const { error } = await supabase.from("team_members").update({
          name: row.name, role: row.role, bio: row.bio ?? null,
          image_url: row.image_url ?? null, sort_order: row.sort_order ?? 0,
        }).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("team_members").insert({
          name: row.name, role: row.role, bio: row.bio ?? null,
          image_url: row.image_url ?? null, sort_order: row.sort_order ?? 0,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => { invalidate(); setEditing(null); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Team Members</h2>
        <button onClick={() => setEditing({ name: "", role: "", sort_order: (data?.length ?? 0) })}
          className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant">
          <Plus className="size-4" /> Add member
        </button>
      </div>

      {isLoading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {data?.map((m) => (
            <div key={m.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              {m.image_url ? (
                <img src={m.image_url} alt="" className="size-20 rounded-xl object-cover" />
              ) : <div className="size-20 rounded-xl bg-muted" />}
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{m.name}</div>
                <div className="text-xs text-primary">{m.role}</div>
                <div className="mt-1 truncate text-xs text-muted-foreground">{m.bio}</div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setEditing(m)} className="rounded-full border border-input px-3 py-1 text-xs">Edit</button>
                  <button onClick={() => { if (confirm(`Delete ${m.name}?`)) remove.mutate(m.id); }}
                    className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1 text-xs text-destructive">
                    <Trash2 className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {data?.length === 0 && <p className="text-sm text-muted-foreground">No team members yet.</p>}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-elegant">
            <h3 className="font-display text-xl">{editing.id ? "Edit member" : "Add member"}</h3>
            <div className="mt-4 space-y-3">
              <Field label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Field label="Role" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
              <Field label="Bio" value={editing.bio ?? ""} onChange={(v) => setEditing({ ...editing, bio: v })} textarea />
              <ImageInput folder="team" value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
              <Field label="Sort order" type="number" value={String(editing.sort_order ?? 0)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v) || 0 })} />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-input px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => save.mutate(editing)} disabled={save.isPending || !editing.name || !editing.role}
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                {save.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
              </button>
            </div>
            {save.error && <p className="mt-2 text-xs text-destructive">{(save.error as Error).message}</p>}
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
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
      )}
    </label>
  );
}
