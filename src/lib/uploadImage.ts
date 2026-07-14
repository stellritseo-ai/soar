import { createServerFn } from "@tanstack/react-start";
import * as fs from "fs/promises";
import * as path from "path";

// Server-side function to save uploaded images to the local public/uploads directory
export const uploadFileServerFn = createServerFn({ method: "POST" })
  .validator((payload: { name: string; type: string; base64: string }) => payload)
  .handler(async ({ data: { name, base64 } }) => {
    const ext = name.split(".").pop() ?? "bin";
    const filename = `${crypto.randomUUID()}.${ext}`;
    
    const uploadDir = path.resolve(process.cwd(), "public/uploads");
    
    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    const buffer = Buffer.from(base64, "base64");
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    
    return { url: `/uploads/${filename}` };
  });

// Client-side helper function to convert files to base64 and call the server function
export async function uploadImage(file: File, folder: string): Promise<string> {
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
    name: file.name,
    type: file.type,
    base64
  });

  return res.url;
}
