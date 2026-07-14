import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Securely load .env file if run outside Vite framework context (e.g. standalone scripts or custom loaders)
if (!process.env.MONGODB_URI) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, "utf-8");
      envFile.split("\n").forEach((line) => {
        const parts = line.split("=");
        if (parts.length >= 2) {
          const key = parts[0].trim();
          let val = parts.slice(1).join("=").trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.substring(1, val.length - 1);
          }
          if (key && !process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    }
  } catch (err) {
    console.error("[MongoDB] Failed to parse .env file:", err);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
