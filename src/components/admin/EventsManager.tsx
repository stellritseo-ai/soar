import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEventsList, type EventRow } from "@/lib/cms";
import { ImageInput } from "./ImageInput";
import { Field } from "./TeamManager";

type Draft = Partial<EventRow> & { title: string };

export function EventsManager() {
  const { data, isLoading } = useEventsList();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["cms", "events"] });

  const save = useMutation({
    mutationFn: async (r: Draft) => {
      const payload = {
        title: r.title, description: r.description ?? null,
        event_date: r.event_date ? new Date(r.event_date).toISOString() : null,
        location: r.location ?? null, image_url: r.image_url ?? null,
        sort_order: r.sort_order ?? 0,
      };
      const q = r.id
        ? supabase.from("events").update(payload).eq("id", r.id)
        : supabase.from("events").insert(payload);
      const { error } = await q;
      if (error) throw error;
    },
    onSuccess: () => { invalidate(); setEditing(null); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Events</h2>
        <button onClick={() => setEditing({ title: "" })}
          className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant">
          <Plus className="size-4" /> Add event
        </button>
      </div>

      {isLoading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> : (
        <ul className="mt-6 space-y-3">
          {data?.map((e) => (
            <li key={e.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              {e.image_url ? <img src={e.image_url} className="size-16 rounded-lg object-cover" alt="" />
                : <div className="size-16 rounded-lg bg-muted" />}
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{e.title}</div>
                <div className="text-xs text-muted-foreground">
                  {e.event_date ? new Date(e.event_date).toLocaleString() : "No date"} · {e.location || "—"}
                </div>
              </div>
              <button onClick={() => setEditing(e)} className="rounded-full border border-input px-3 py-1 text-xs">Edit</button>
              <button onClick={() => { if (confirm(`Delete ${e.title}?`)) remove.mutate(e.id); }}
                className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1 text-xs text-destructive">
                <Trash2 className="size-3" /> Delete
              </button>
            </li>
          ))}
          {data?.length === 0 && <p className="text-sm text-muted-foreground">No events yet.</p>}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div onClick={(ev) => ev.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-card p-6 shadow-elegant max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl">{editing.id ? "Edit event" : "Add event"}</h3>
            <div className="mt-4 space-y-3">
              <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Description" value={editing.description ?? ""} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
              <Field label="Date & time" type="datetime-local"
                value={editing.event_date ? new Date(editing.event_date).toISOString().slice(0, 16) : ""}
                onChange={(v) => setEditing({ ...editing, event_date: v || null })} />
              <Field label="Location" value={editing.location ?? ""} onChange={(v) => setEditing({ ...editing, location: v })} />
              <ImageInput folder="events" value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-input px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => save.mutate(editing)} disabled={save.isPending || !editing.title}
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
