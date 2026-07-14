import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Trash2, CheckCircle2, ChevronRight, Search, Clock, User, MessageSquare } from "lucide-react";
import { useInquiries, markInquiryReadFn, deleteInquiryFn, ContactInquiry } from "@/lib/cms";

export function InboxManager() {
  const { data: inquiries, isLoading } = useInquiries();
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const invalidate = () => qc.invalidateQueries({ queryKey: ["cms", "inquiries"] });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await markInquiryReadFn(id);
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await deleteInquiryFn(id);
    },
    onSuccess: () => {
      invalidate();
      if (selectedId === remove.variables) {
        setSelectedId(null);
      }
    },
  });

  const filtered = inquiries?.filter((inq) => {
    const term = searchTerm.toLowerCase();
    return (
      inq.name.toLowerCase().includes(term) ||
      inq.email.toLowerCase().includes(term) ||
      (inq.subject || "").toLowerCase().includes(term) ||
      inq.message.toLowerCase().includes(term)
    );
  }) ?? [];

  const selectedInquiry = inquiries?.find((inq) => inq.id === selectedId);

  const handleSelect = (inq: ContactInquiry) => {
    setSelectedId(inq.id);
    if (!inq.read) {
      markRead.mutate(inq.id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">Web Email Inbox</h2>
          <p className="text-xs text-white/50 mt-1">Review contact inquiries and portal submissions from the website.</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-[#D4AF37] text-white"
          />
        </div>
      </div>

      {isLoading ? (
        <p className="mt-6 text-sm text-white/50">Loading inbox...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
          {/* Inquiry List Panel */}
          <div className="lg:col-span-5 border border-white/10 rounded-2xl bg-white/2 overflow-hidden flex flex-col h-[500px]">
            <div className="p-3 border-b border-white/10 bg-white/5 text-[10px] uppercase font-bold tracking-wider text-white/40 flex justify-between">
              <span>Submissions ({filtered.length})</span>
              <span>Latest First</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-thin">
              {filtered.map((inq) => {
                const isSelected = inq.id === selectedId;
                return (
                  <button
                    key={inq.id}
                    onClick={() => handleSelect(inq)}
                    className={`w-full text-left p-4 transition-all duration-200 cursor-pointer flex gap-3 items-start ${
                      isSelected
                        ? "bg-gradient-to-r from-[#5E2B97]/20 to-transparent border-l-4 border-l-[#D4AF37]"
                        : "hover:bg-white/5 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="relative shrink-0 mt-0.5">
                      <div className={`size-8 rounded-full grid place-items-center ${inq.read ? "bg-white/5 text-white/40" : "bg-primary/20 text-[#D4AF37]"}`}>
                        <Mail className="size-4" />
                      </div>
                      {!inq.read && (
                        <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-[#D4AF37] ring-2 ring-[#07000F]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className={`text-xs font-bold truncate ${inq.read ? "text-white/60" : "text-white"}`}>
                          {inq.name}
                        </span>
                        <span className="text-[9px] text-white/30 shrink-0">
                          {new Date(inq.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <div className={`text-[11px] font-semibold truncate mt-0.5 ${inq.read ? "text-[#D4AF37]/60" : "text-[#D4AF37]"}`}>
                        {inq.subject || "General Inquiry"}
                      </div>
                      <p className="text-[10px] text-white/40 line-clamp-2 mt-1 leading-relaxed">
                        {inq.message}
                      </p>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-8 text-center text-xs text-white/30 my-auto">
                  No inquiries found.
                </div>
              )}
            </div>
          </div>

          {/* Reading Pane Panel */}
          <div className="lg:col-span-7 border border-white/10 rounded-2xl bg-[#0B0315]/95 p-6 flex flex-col justify-between h-[500px]">
            {selectedInquiry ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-start justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white leading-tight">
                        {selectedInquiry.subject || "General Inquiry"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50 mt-1">
                        <span className="flex items-center gap-1"><User className="size-3.5 text-[#D4AF37]" /> {selectedInquiry.name}</span>
                        <span>•</span>
                        <a href={`mailto:${selectedInquiry.email}`} className="hover:text-primary transition">{selectedInquiry.email}</a>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm("Delete this inquiry?")) {
                          remove.mutate(selectedInquiry.id);
                        }
                      }}
                      className="size-8 rounded-lg border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-white/40 hover:text-red-400 grid place-items-center transition cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="py-6 overflow-y-auto max-h-[300px] text-xs text-white/80 leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center bg-white/2 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <Clock className="size-3.5" />
                    Submitted: {new Date(selectedInquiry.created_at).toLocaleString()}
                  </div>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=RE: ${selectedInquiry.subject || "SOAR Inquiry"}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white hover:scale-[1.03] transition shadow-soft"
                  >
                    <MessageSquare className="size-3.5" /> Reply by Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="size-16 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/20 mb-4 animate-pulse">
                  <Mail className="size-8" />
                </div>
                <h3 className="text-sm font-bold text-white">Select a message</h3>
                <p className="text-xs text-white/40 mt-1 max-w-xs leading-relaxed">
                  Click on any contact inquiry in the inbox list to read the message details, mark as read, or send an email reply.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
