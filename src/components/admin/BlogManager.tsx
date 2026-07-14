import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, Save, Newspaper } from "lucide-react";
import { useAllPosts, upsertBlogPostFn, deleteBlogPostFn, type BlogPost } from "@/lib/cms";
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
      const res = await upsertBlogPostFn(r);
      if (!res.success) throw new Error("Failed to save blog post");
    },
    onSuccess: () => { invalidate(); setEditing(null); },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteBlogPostFn(id);
      if (!res.success) throw new Error("Failed to delete blog post");
    },
    onSuccess: invalidate,
  });

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Blog Posts</h2>
        <button onClick={() => setEditing({ title: "", slug: "" })}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.03] active:scale-[0.98] shadow-glow transition duration-200 cursor-pointer">
          <Plus className="size-4" /> New post
        </button>
      </div>

      {isLoading ? <p className="mt-6 text-sm text-white/50">Loading…</p> : (
        <ul className="mt-6 space-y-3">
          {data?.map((p) => (
            <li key={p.id} className="flex items-center gap-4 rounded-[18px] border border-white/10 bg-white/5 p-4 hover:border-[#D4AF37]/30 hover:shadow-glow hover:-translate-y-0.5 transition duration-300">
              {p.image_url ? <img src={p.image_url} className="size-16 rounded-xl object-cover border border-white/10" alt="" />
                : <div className="size-16 rounded-xl bg-white/10 flex items-center justify-center text-white/20"><Newspaper className="size-6" /></div>}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-base leading-snug">{p.title}</div>
                <div className="text-xs text-white/60 mt-1">
                  /{p.slug} · {p.published_at
                    ? <span className="text-green-400 font-semibold">Published {new Date(p.published_at).toLocaleDateString()}</span>
                    : <span className="text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded-full text-[10px]">Draft</span>}
                </div>
              </div>
              <button onClick={() => setEditing(p)} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/10 transition cursor-pointer">Edit</button>
              <button onClick={() => { if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id); }}
                className="inline-flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition cursor-pointer">
                <Trash2 className="size-3" /> Delete
              </button>
            </li>
          ))}
          {data?.length === 0 && <p className="text-sm text-white/40">No posts yet.</p>}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#07000F]/80 backdrop-blur-md p-4" onClick={() => setEditing(null)}>
          <div onClick={(ev) => ev.stopPropagation()} className="w-full max-w-2xl rounded-[24px] bg-[#110123] border border-white/15 p-8 shadow-elegant max-h-[90vh] overflow-y-auto text-white">
            <h3 className="font-display text-xl font-bold border-b border-white/10 pb-3 text-white">{editing.id ? "Edit post" : "New post"}</h3>
            <div className="mt-6 space-y-4">
              <Field label="Title" value={editing.title} onChange={(v) => setEditing({
                ...editing, title: v, slug: editing.id ? editing.slug : slugify(v),
              })} />
              <Field label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: slugify(v) })} />
              <Field label="Excerpt" value={editing.excerpt ?? ""} onChange={(v) => setEditing({ ...editing, excerpt: v })} textarea />
              <Field label="Content (markdown/plain)" value={editing.content ?? ""} onChange={(v) => setEditing({ ...editing, content: v })} textarea />
              <ImageInput folder="blog" value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
              <label className="flex items-center gap-2.5 text-sm text-[#D4AF37]/90 font-bold uppercase tracking-wider cursor-pointer">
                <input type="checkbox" checked={!!editing.published_at}
                  className="rounded border-white/20 bg-white/5 text-[#D4AF37] focus:ring-[#D4AF37]"
                  onChange={(e) => setEditing({ ...editing, published_at: e.target.checked ? new Date().toISOString() : null })} />
                Published
              </label>
            </div>
            <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-4">
              <button onClick={() => setEditing(null)} className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition cursor-pointer">Cancel</button>
              <button onClick={() => save.mutate(editing)} disabled={save.isPending || !editing.title || !editing.slug}
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
