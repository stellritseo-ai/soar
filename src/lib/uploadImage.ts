import { createServerFn } from "@tanstack/react-start";

// Server-side function to upload images directly to Cloudinary
export const uploadFileServerFn = createServerFn({ method: "POST" })
  .validator((payload: { name: string; type: string; base64: string; folder?: string }) => payload)
  .handler(async ({ data: { type, base64, folder = "general" } }) => {
    const dataUri = `data:${type || "image/jpeg"};base64,${base64}`;

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      try {
        const { v2: cloudinary } = await import("cloudinary");
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET || "",
          secure: true,
        });

        const result = await cloudinary.uploader.upload(dataUri, {
          folder: `soar/${folder}`,
          resource_type: "auto",
        });

        if (result && result.secure_url) {
          return { url: result.secure_url };
        }
      } catch (err: any) {
        console.warn("Cloudinary upload failed, falling back to base64 Data URI:", err?.message);
      }
    }

    return { url: dataUri };
  });

// Client-side helper function to convert files to base64 and upload to Cloudinary
export async function uploadImage(file: File, folder: string = "general"): Promise<string> {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });

  const res = await uploadFileServerFn({
    data: {
      name: file.name,
      type: file.type,
      base64,
      folder,
    },
  });

  return res.url;
}
