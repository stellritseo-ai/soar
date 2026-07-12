import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useGallery } from "@/lib/cms";
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
        const { error } = await supabase.from("gallery_images").insert({
          image_url: url, title: f.name.replace(/\.[^.]+$/, ""),
          sort_order: (data?.length ?? 0),
        });
        if (error) throw error;
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
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Gallery</h2>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant">
          {busy ? <Loader2 className="size-4 animate-spin" /> : "Upload images"}
          <input type="file" multiple accept="image/*" className="hidden" disabled={busy}
            onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ""; }} />
        </label>
      </div>
      {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
      {isLoading ? <p className="mt-6 text-sm text-muted-foreground">Loading…</p> : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {data?.map((g) => (
            <div key={g.id} className="group relative overflow-hidden rounded-xl border border-border">
              <img src={g.image_url} alt={g.title ?? ""} className="aspect-square w-full object-cover" />
              <button onClick={() => { if (confirm("Delete this image?")) remove.mutate(g.id); }}
                className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-background/90 opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
                <Trash2 className="size-4 text-destructive" />
              </button>
            </div>
          ))}
          {data?.length === 0 && <p className="text-sm text-muted-foreground">No images yet.</p>}
        </div>
      )}
    </div>
  );
}
