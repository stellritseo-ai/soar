import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, ChevronDown, Sparkles, Wifi, WifiOff } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useChatHistory, sendChatMessageFn, ChatMessageType } from "@/lib/cms";

const SOCKET_URL = import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3001";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  const [liveMessages, setLiveMessages] = useState<ChatMessageType[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch db history if registered
  const { data: dbHistory } = useChatHistory(conversationId);

  // Read session cache from localStorage
  useEffect(() => {
    const cachedName = localStorage.getItem("chat_user_name");
    const cachedSession = localStorage.getItem("chat_conversation_id");

    if (cachedName && cachedSession) {
      setName(cachedName);
      setConversationId(cachedSession);
      setIsRegistered(true);
    }
  }, []);

  // Connect socket and handle incoming messages
  useEffect(() => {
    if (!conversationId) return;

    const socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[ChatWidget] Connected to Socket.io");
      setIsConnected(true);
      socket.emit("join", { conversationId });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connect_error", () => {
      setIsConnected(false);
    });

    socket.on("message", (msg: ChatMessageType) => {
      if (msg.conversationId === conversationId) {
        setLiveMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  // Sync DB history with client state
  useEffect(() => {
    if (dbHistory) {
      setLiveMessages(dbHistory);
    }
  }, [dbHistory]);

  // Scroll to bottom of message deck
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveMessages, isOpen]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newId = `session_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("chat_user_name", name.trim());
    localStorage.setItem("chat_conversation_id", newId);
    setConversationId(newId);
    setIsRegistered(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = typedMessage.trim();
    if (!text) return;

    setTypedMessage("");

    // Optimistically show the message immediately in the UI
    const optimisticMsg: ChatMessageType = {
      id: `optimistic_${Date.now()}`,
      conversationId,
      sender: "user",
      senderName: name,
      message: text,
      created_at: new Date().toISOString(),
    };
    setLiveMessages((prev) => [...prev, optimisticMsg]);

    try {
      setSendError(null);
      // Persist to DB via server function
      const saved = await sendChatMessageFn({
        conversationId,
        sender: "user" as const,
        senderName: name,
        message: text,
      });

      // Replace optimistic message with the real saved one
      setLiveMessages((prev) =>
        prev.map((m) => (m.id === optimisticMsg.id ? saved : m))
      );

      // Push to admin dashboard via socket for real-time notification
      if (socketRef.current?.connected) {
        socketRef.current.emit("message", saved);
      }
    } catch (err: any) {
      console.error("[ChatWidget] Failed to save message:", err);
      const errMsg = err?.message || "Failed to send. Check your connection.";
      setSendError(errMsg);
      // Mark message as failed visually
      setLiveMessages((prev) =>
        prev.map((m) =>
          m.id === optimisticMsg.id
            ? { ...m, id: `failed_${Date.now()}` }
            : m
        )
      );
    }
  };

  const handleClearSession = () => {
    localStorage.removeItem("chat_user_name");
    localStorage.removeItem("chat_conversation_id");
    setName("");
    setConversationId("");
    setIsRegistered(false);
    setLiveMessages([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[350px] sm:w-[380px] h-[500px] rounded-[24px] bg-[#0F081C]/95 border border-white/10 shadow-elegant overflow-hidden flex flex-col justify-between mb-4 animate-fade-in backdrop-blur-xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#5E2B97]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />

          {/* Top Brand Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-white/2 flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <div>
                <h4 className="text-xs font-extrabold text-white tracking-tight flex items-center gap-1">
                  SOAR Sisterhood Chat <Sparkles className="size-3 text-[#D4AF37] animate-pulse" />
                </h4>
                <p className="text-[10px] text-white/50 flex items-center gap-1">
                  {isRegistered ? (
                    isConnected ? (
                      <><Wifi className="size-2.5 text-green-400" /> Real-time connected</>
                    ) : (
                      <><WifiOff className="size-2.5 text-yellow-400" /> Polling mode active</>
                    )
                  ) : (
                    "Typically replies in a few minutes"
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition cursor-pointer"
            >
              <ChevronDown className="size-5" />
            </button>
          </div>

          {/* Chat Content Body */}
          <div className="flex-1 p-5 overflow-y-auto z-10 flex flex-col justify-between scrollbar-thin">
            {!isRegistered ? (
              /* Register Form */
              <form onSubmit={handleRegister} className="h-full flex flex-col justify-center items-center text-center px-4">
                <div className="size-14 rounded-2xl bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] grid place-items-center text-white shadow-soft mb-4">
                  <MessageSquare className="size-6" />
                </div>
                <h5 className="text-sm font-bold text-white leading-tight">Start a conversation</h5>
                <p className="text-xs text-white/40 mt-1 max-w-[240px] leading-relaxed">
                  Welcome to SOAR. Introduce yourself to connect with a sisterhood coordinator.
                </p>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-[#D4AF37] text-white"
                />
                <button
                  type="submit"
                  className="w-full mt-3 rounded-xl bg-gradient-to-r from-primary to-accent py-3 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer shadow-soft"
                >
                  Start Chat
                </button>
              </form>
            ) : (
              /* Message List */
              <div className="space-y-4 h-full flex flex-col justify-between">
                <div className="flex-1 overflow-y-auto space-y-3.5 scrollbar-thin">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-[10px] text-white/60 leading-relaxed">
                    Hello <strong>{name}</strong>! Welcome to SOAR Support. We are here to answer your questions.
                    <button
                      onClick={handleClearSession}
                      className="block mt-1 text-[#D4AF37] hover:underline font-bold"
                    >
                      Clear session &amp; restart
                    </button>
                  </div>

                  {liveMessages.map((msg, i) => {
                    const isSelf = msg.sender === "user";
                    return (
                      <div
                        key={msg.id || i}
                        className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs leading-normal shadow-soft ${
                            isSelf
                              ? "bg-gradient-to-tr from-[#5E2B97] to-[#8042c9] text-white rounded-tr-none"
                              : "bg-white/5 border border-white/10 text-white rounded-tl-none"
                          }`}
                        >
                          <p className="leading-relaxed font-sans">{msg.message}</p>
                          <span className="block text-[8px] text-white/30 text-right mt-1">
                            {new Date(msg.created_at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={scrollRef} />
                </div>
              </div>
            )}
          </div>

          {/* Error Banner */}
          {isRegistered && sendError && (
            <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 z-10">
              <p className="text-[10px] text-red-400 text-center">⚠ {sendError}</p>
            </div>
          )}

          {/* Bottom input area */}
          {isRegistered && (
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/2 flex gap-2.5 z-10">
              <input
                type="text"
                placeholder="Message SOAR..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-[#D4AF37] text-white"
              />
              <button
                type="submit"
                disabled={!typedMessage.trim()}
                className="size-10 rounded-xl bg-gradient-to-r from-primary to-accent grid place-items-center text-white hover:scale-105 active:scale-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="size-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 rounded-full bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] shadow-elegant hover:scale-105 active:scale-95 transition-all duration-300 grid place-items-center text-white relative cursor-pointer group"
      >
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] opacity-40 blur-sm group-hover:opacity-60 transition duration-300" />
        {isOpen ? <X className="size-6 relative z-10" /> : <MessageSquare className="size-6 relative z-10" />}
      </button>
    </div>
  );
}
