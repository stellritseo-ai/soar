import { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";

export function ImageInput({
  value,
  onChange,
  folder,
  label = "Image",
}: {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-3">
        {value ? (
          <div className="relative">
            <img src={value} alt="" className="size-20 rounded-xl border border-border object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-background border border-border shadow-soft"
              aria-label="Remove"
            >
              <X className="size-3" />
            </button>
          </div>
        ) : (
          <div className="grid size-20 place-items-center rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground">
            <Upload className="size-5" />
          </div>
        )}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {busy ? "Uploading…" : value ? "Replace" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
