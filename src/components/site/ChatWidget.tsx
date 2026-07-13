import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Message = {
  sender: "user" | "bot";
  text: string;
  time: string;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi there! 💜 Welcome to SOAR Global Foundation. How can we help you rise today?",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setUnread(false);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMsg: Message = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Thank you for reaching out! A member of the SOAR team will connect with you soon. You can also write to us at sistersoar14@gmail.com.";
      
      const lower = text.toLowerCase();
      if (lower.includes("volunteer")) {
        reply = "We would love to have you! We are always looking for passionate mentors, workshop instructors, and event helpers. Please click 'Become a Volunteer' on the page or contact us to start your onboarding!";
      } else if (lower.includes("donate") || lower.includes("support")) {
        reply = "Your support means the world to us! Click 'Donate Now' to view ways to give. Every gift helps a woman secure affordable housing, mentorship, and education.";
      } else if (lower.includes("housing") || lower.includes("home")) {
        reply = "SOAR provides housing pathways and financial literacy to help women achieve homeownership. Tell us a bit about your current situation so we can guide you to the right program.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={handleOpenToggle}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] text-white shadow-[0_8px_32px_rgba(94,43,151,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Open support chat"
      >
        {isOpen ? (
          <X className="size-6 transition-transform duration-200 rotate-90" />
        ) : (
          <div className="relative">
            <MessageCircle className="size-6" />
            {unread && (
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white"></span>
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] rounded-2xl border border-white/10 bg-[#120224]/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden z-50 animate-fade-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#5E2B97]/80 to-[#120224] border-b border-white/10 flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F2D27C] text-[#0C1220] shadow-glow">
              <Sparkles className="size-4.5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                SOAR Assistant
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[10px] text-white/60 font-medium">Ready to support you</div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] rounded-[12px] p-3 text-xs leading-relaxed font-medium ${
                  m.sender === "user"
                    ? "self-end bg-[#5E2B97] text-white rounded-tr-none"
                    : "self-start bg-white/10 text-white/90 border border-white/5 rounded-tl-none"
                }`}
              >
                <div>{m.text}</div>
                <div className="text-[9px] text-white/40 mt-1 text-right">{m.time}</div>
              </div>
            ))}

            {isTyping && (
              <div className="self-start bg-white/10 text-white/90 border border-white/5 rounded-[12px] rounded-tl-none p-3 text-xs flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="size-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="size-1.5 rounded-full bg-white/50 animate-bounce" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions List */}
          <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 border-t border-white/5 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => handleSend("I want to volunteer")}
              className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-2.5 py-1 text-white/80 transition-colors"
            >
              🙋‍♀️ Volunteer Info
            </button>
            <button
              type="button"
              onClick={() => handleSend("How can I support / donate?")}
              className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-2.5 py-1 text-white/80 transition-colors"
            >
              💝 Ways to Support
            </button>
            <button
              type="button"
              onClick={() => handleSend("I need housing assistance")}
              className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-2.5 py-1 text-white/80 transition-colors"
            >
              🏠 Housing Pathways
            </button>
          </div>

          {/* Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 border-t border-white/10 bg-[#0A0115]/50 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-[10px] border border-white/10 bg-[#120224]/80 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-r from-[#D4AF37] to-[#F2D27C] text-[#0C1220] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
