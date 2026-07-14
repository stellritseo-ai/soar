import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Send, User, Clock, Shield } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useChatConversations, useChatHistory, sendChatMessageFn, ChatMessageType } from "@/lib/cms";

const SOCKET_URL = import.meta.env.VITE_CHAT_SERVER_URL || "http://localhost:3001";

export function LiveChatManager() {
  const qc = useQueryClient();
  const { data: conversations, isLoading: loadingConvs } = useChatConversations();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [liveMessages, setLiveMessages] = useState<ChatMessageType[]>([]);
  const [isSending, setIsSending] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch db history for selected conversation
  const { data: dbHistory, isLoading: loadingHistory } = useChatHistory(selectedSessionId || "");

  // Initialize socket client
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[ChatAdmin] Connected to Socket.io server");
      // Re-join current conversation room on reconnect
      if (selectedSessionId) {
        socket.emit("join", { conversationId: selectedSessionId });
      }
    });

    socket.on("message", (msg: ChatMessageType) => {
      // Append message if it belongs to currently selected session
      if (msg.conversationId === selectedSessionId) {
        setLiveMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
        // Also invalidate history so DB state is authoritative
        qc.invalidateQueries({ queryKey: ["chat", "history", msg.conversationId] });
      }
      // Always invalidate conversation list to show latest summaries
      qc.invalidateQueries({ queryKey: ["chat", "conversations"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedSessionId]);

  // Sync DB history with live state when selected session changes or db data arrives
  useEffect(() => {
    if (dbHistory) {
      setLiveMessages(dbHistory);
    } else {
      setLiveMessages([]);
    }
  }, [dbHistory, selectedSessionId]);

  // Join selected conversation room
  useEffect(() => {
    if (selectedSessionId && socketRef.current) {
      socketRef.current.emit("join", { conversationId: selectedSessionId });
    }
  }, [selectedSessionId]);

  // Scroll to bottom of message list
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !selectedSessionId || isSending) return;

    const messageText = typedMessage.trim();
    setTypedMessage("");
    setIsSending(true);

    try {
      const saved = await sendChatMessageFn({
        data: {
          conversationId: selectedSessionId,
          sender: "admin",
          senderName: "Admin",
          message: messageText,
        }
      });

      // Add to local messages immediately
      setLiveMessages((prev) => {
        if (prev.some((m) => m.id === saved.id)) return prev;
        return [...prev, saved];
      });

      // Also emit via socket for real-time push to user's chat widget
      if (socketRef.current?.connected) {
        socketRef.current.emit("message", saved);
      }

      // Invalidate conversation list to show latest summaries
      qc.invalidateQueries({ queryKey: ["chat", "conversations"] });
    } catch (err) {
      console.error("[ChatAdmin] Failed to send message:", err);
      setTypedMessage(messageText);
    } finally {
      setIsSending(false);
    }
  };

  const selectedConv = conversations?.find(c => c.conversationId === selectedSessionId);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Live Chat Console</h2>
          <p className="text-xs text-white/50 mt-1">Chat in real-time with active site visitors via Socket.io.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Active chats list */}
        <div className="lg:col-span-4 border border-white/10 rounded-2xl bg-white/2 overflow-hidden flex flex-col h-[500px]">
          <div className="p-3 border-b border-white/10 bg-white/5 text-[10px] uppercase font-bold tracking-wider text-white/40">
            Active Dialogues ({conversations?.length ?? 0})
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-thin">
            {loadingConvs ? (
              <p className="p-4 text-xs text-white/40">Loading conversations...</p>
            ) : conversations && conversations.length > 0 ? (
              conversations.map((c) => {
                const isActive = c.conversationId === selectedSessionId;
                return (
                  <button
                    key={c.conversationId}
                    onClick={() => setSelectedSessionId(c.conversationId)}
                    className={`w-full text-left p-4 transition-all duration-200 cursor-pointer flex gap-3 items-center ${
                      isActive
                        ? "bg-gradient-to-r from-[#5E2B97]/20 to-transparent border-l-4 border-l-[#D4AF37]"
                        : "hover:bg-white/5 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="size-9 rounded-xl bg-[#5E2B97]/15 border border-[#5E2B97]/20 flex items-center justify-center shrink-0">
                      <User className="size-4 text-[#D4AF37]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-white truncate">
                          {c.senderName}
                        </span>
                        <span className="text-[9px] text-white/30 shrink-0">
                          {new Date(c.created_at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/40 truncate mt-1">
                        {c.latestMessage}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-white/30 my-auto">
                No active conversations yet.
              </div>
            )}
          </div>
        </div>

        {/* Messaging Box */}
        <div className="lg:col-span-8 border border-white/10 rounded-2xl bg-[#0B0315]/95 flex flex-col justify-between h-[500px] overflow-hidden">
          {selectedSessionId ? (
            <div className="flex flex-col h-full justify-between">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/10 bg-white/2 flex items-center gap-3">
                <div className="size-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/35 flex items-center justify-center">
                  <User className="size-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{selectedConv?.senderName || "Visitor"}</h3>
                  <span className="text-[9px] text-[#D4AF37] font-semibold flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green-500 animate-ping" />
                    Real-time Socket Active
                  </span>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin">
                {loadingHistory ? (
                  <p className="text-center text-xs text-white/40 my-auto">Loading message history...</p>
                ) : (
                  liveMessages.map((msg, i) => {
                    const isAdmin = msg.sender === "admin";
                    return (
                      <div
                        key={msg.id || i}
                        className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-xs shadow-soft ${
                            isAdmin
                              ? "bg-gradient-to-tr from-[#5E2B97] to-[#8042c9] text-white rounded-tr-none"
                              : "bg-white/5 border border-white/10 text-white rounded-tl-none"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/40 mb-1">
                            {isAdmin ? <Shield className="size-2.5 text-[#D4AF37]" /> : null}
                            {msg.senderName}
                          </div>
                          <p className="leading-relaxed font-sans">{msg.message}</p>
                          <span className="block text-[8px] text-white/30 text-right mt-1">
                            {new Date(msg.created_at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={scrollRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/2 flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  disabled={isSending}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-[#D4AF37] text-white disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSending || !typedMessage.trim()}
                  className="size-10 rounded-xl bg-gradient-to-r from-primary to-accent grid place-items-center text-white hover:scale-105 active:scale-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="size-4.5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="size-16 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/20 mb-4 animate-pulse">
                <MessageSquare className="size-8" />
              </div>
              <h3 className="text-sm font-bold text-white">Select a dialogue</h3>
              <p className="text-xs text-white/40 mt-1 max-w-xs leading-relaxed">
                Choose an active visitor session from the sidebar to start a real-time conversation over Socket.io.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
