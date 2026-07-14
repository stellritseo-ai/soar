import { createServer } from "http";
import mongoose from "mongoose";

let Server;
try {
  const ioModule = await import("socket.io");
  Server = ioModule.Server;
} catch (err) {
  console.warn("[SocketServer] socket.io is not installed, loading fallback mock");
  const mockModule = await import("../src/lib/socket-mock.ts");
  Server = mockModule.Server;
}

import fs from "fs";
import path from "path";

// Securely load .env file if run directly from Node terminal (standalone chat server)
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
    console.error("[SocketServer] Failed to parse .env file:", err);
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.CHAT_PORT || 3001;

if (!MONGODB_URI) {
  throw new Error("[SocketServer] Please define MONGODB_URI in your .env file");
}

if (global.socketServerStarted) {
  console.log("[SocketServer] Already running, skipping startup");
} else {
  global.socketServerStarted = true;

  // Define ChatMessage schema for pure node environment
  const ChatMessageSchema = new mongoose.Schema({
    conversationId: { type: String, required: true },
    sender: { type: String, required: true }, // "user" | "admin"
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
  });

  const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", ChatMessageSchema);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log(`[SocketServer] Connected to MongoDB at ${MONGODB_URI}`))
  .catch((err) => console.error("[SocketServer] MongoDB connection error:", err));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow all origins for dev simplicity
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`[SocketServer] Client connected: ${socket.id}`);

  // Handle joining a room (identified by session ID or conversation ID)
  socket.on("join", ({ conversationId }) => {
    socket.join(conversationId);
    console.log(`[SocketServer] Client ${socket.id} joined room: ${conversationId}`);
  });

  // Handle incoming messages
  socket.on("message", async ({ conversationId, sender, senderName, message }) => {
    console.log(`[SocketServer] Message in ${conversationId} from ${senderName}: ${message}`);

    try {
      // Save message to MongoDB
      const chatMsg = await ChatMessage.create({
        conversationId,
        sender,
        senderName,
        message,
        created_at: new Date()
      });

      // Broadcast the message to everyone in the room
      io.to(conversationId).emit("message", {
        id: chatMsg._id.toString(),
        conversationId,
        sender,
        senderName,
        message,
        created_at: chatMsg.created_at.toISOString()
      });
    } catch (err) {
      console.error("[SocketServer] Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`[SocketServer] Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[SocketServer] Socket.io server listening on port ${PORT}`);
});
}
