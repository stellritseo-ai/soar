import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Loader2 } from "lucide-react";
import { useGallery, upsertGalleryImageFn, deleteGalleryImageFn } from "@/lib/cms";
import { uploadImage } from "@/lib/uploadImage";

export function GalleryManager() {
  const { data, isLoading } = useGallery();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["cms", "gallery"] });

  async function handleFiles(files: FileList) {
    setBusy(true); setErr(null);
    try {
      for (const f of Array.from(files)) {
        const url = await uploadImage(f, "gallery");
        const res = await upsertGalleryImageFn({
          image_url: url, title: f.name.replace(/\.[^.]+$/, ""),
          sort_order: (data?.length ?? 0),
        });
        if (!res.success) throw new Error("Failed to insert gallery image record");
      }
      invalidate();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteGalleryImageFn(id);
      if (!res.success) throw new Error("Failed to delete gallery image");
    },
    onSuccess: invalidate,
  });

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Gallery</h2>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0C1220] hover:scale-[1.03] active:scale-[0.98] shadow-glow transition duration-200 cursor-pointer">
          {busy ? <Loader2 className="size-4 animate-spin" /> : "Upload images"}
          <input type="file" multiple accept="image/*" className="hidden" disabled={busy}
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ""; }} />
        </label>
      </div>
      {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
      {isLoading ? <p className="mt-6 text-sm text-white/50">Loading…</p> : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {data?.map((g) => (
            <div key={g.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-[#D4AF37]/30 hover:shadow-glow hover:-translate-y-0.5 transition duration-300">
              <img src={g.image_url} alt={g.title ?? ""} className="aspect-square w-full object-cover" />
              <button onClick={() => { if (confirm("Delete this image?")) remove.mutate(g.id); }}
                className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-[#110123]/95 border border-white/15 text-red-400 hover:text-red-300 opacity-0 shadow-soft transition-opacity group-hover:opacity-100 cursor-pointer">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          {data?.length === 0 && <p className="text-sm text-white/40">No images yet.</p>}
        </div>
      )}
    </div>
  );
}
