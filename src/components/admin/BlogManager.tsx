import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAllPosts, type BlogPost } from "@/lib/cms";
import { ImageInput } from "./ImageInput";
import { Field } from "./TeamManager";

type Draft = Partial<BlogPost> & { title: string; slug: string };

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

export function BlogManager() {
  const { data, isLoading } = useAllPosts();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["cms", "blog", "all"] });
    qc.invalidateQueries({ queryKey: ["cms", "blog", "published"] });
  };

  const save = useMutation({
    mutationFn: async (r: Draft) => {
      const payload = {
        title: r.title, slug: r.slug, excerpt: r.excerpt ?? null,
        content: r.content ?? null, image_url: r.image_url ?? null,
        published_at: r.published_at ? new Date(r.published_at).toISOString() : null,
      };
      const q = r.id
        ? supabase.from("blog_posts").update(payload).eq("id", r.id)
        : supabase.from("blog_posts").insert(payload);
      const { error } = await q;
      if (error) throw error;
    },
    onSuccess: () => { invalidate(); setEditing(null); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Blog Posts</h2>
        <button onClick={() => setEditing({ title: "", slug: "" })}
          className="inline-flex items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant">
          <Plus className="size-4" /> New post
        </button>
      </div>

      {isLoading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> : (
        <ul className="mt-6 space-y-3">
          {data?.map((p) => (
            <li key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              {p.image_url ? <img src={p.image_url} className="size-16 rounded-lg object-cover" alt="" />
                : <div className="size-16 rounded-lg bg-muted" />}
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-muted-foreground">/{p.slug} · {p.published_at
                  ? `Published ${new Date(p.published_at).toLocaleDateString()}`
                  : <span className="text-amber-600">Draft</span>}</div>
              </div>
              <button onClick={() => setEditing(p)} className="rounded-full border border-input px-3 py-1 text-xs">Edit</button>
              <button onClick={() => { if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id); }}
                className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1 text-xs text-destructive">
                <Trash2 className="size-3" /> Delete
              </button>
            </li>
          ))}
          {data?.length === 0 && <p className="text-sm text-muted-foreground">No posts yet.</p>}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div onClick={(ev) => ev.stopPropagation()} className="w-full max-w-2xl rounded-3xl bg-card p-6 shadow-elegant max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl">{editing.id ? "Edit post" : "New post"}</h3>
            <div className="mt-4 space-y-3">
              <Field label="Title" value={editing.title} onChange={(v) => setEditing({
                ...editing, title: v, slug: editing.id ? editing.slug : slugify(v),
              })} />
              <Field label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: slugify(v) })} />
              <Field label="Excerpt" value={editing.excerpt ?? ""} onChange={(v) => setEditing({ ...editing, excerpt: v })} textarea />
              <Field label="Content (markdown/plain)" value={editing.content ?? ""} onChange={(v) => setEditing({ ...editing, content: v })} textarea />
              <ImageInput folder="blog" value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!editing.published_at}
                  onChange={(e) => setEditing({ ...editing, published_at: e.target.checked ? new Date().toISOString() : null })} />
                Published
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-input px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => save.mutate(editing)} disabled={save.isPending || !editing.title || !editing.slug}
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
