import { supabase } from "@/integrations/supabase/client";

// ~100 years — bucket is private, so we serve via a long-lived signed URL.
const SIGNED_URL_EXPIRY = 60 * 60 * 24 * 365 * 100;

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from("site-media")
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type || undefined,
    });
  if (upErr) throw upErr;

  const { data, error } = await supabase.storage
    .from("site-media")
    .createSignedUrl(path, SIGNED_URL_EXPIRY);
  if (error || !data) throw error ?? new Error("Failed to sign URL");
  return data.signedUrl;
}
