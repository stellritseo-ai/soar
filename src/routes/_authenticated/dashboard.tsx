import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Users, Calendar, Newspaper, Image as ImageIcon, Mail, Sparkles, Home, ChevronRight, BarChart3, Clock, MessageSquare, Megaphone } from "lucide-react";
import { TeamManager } from "@/components/admin/TeamManager";
import { EventsManager } from "@/components/admin/EventsManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { HeroManager, ContactManager } from "@/components/admin/SettingsManagers";
import { InboxManager } from "@/components/admin/InboxManager";
import { LiveChatManager } from "@/components/admin/LiveChatManager";
import { PopupManager } from "@/components/admin/PopupManager";
import { useTeam, useEventsList, useAllPosts, useGallery, useInquiries, useChatConversations } from "@/lib/cms";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — SOAR Global Foundation" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"team" | "events" | "blog" | "gallery" | "hero" | "contact" | "inbox" | "chat" | "popup">("team");

  // Fetching data for statistics counters in the sidebar/dashboard
  const { data: team } = useTeam();
  const { data: events } = useEventsList();
  const { data: posts } = useAllPosts();
  const { data: gallery } = useGallery();
  const { data: inquiries } = useInquiries();
  const { data: activeChats } = useChatConversations();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    localStorage.removeItem("admin_auth");
    if (typeof document !== "undefined") {
      document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  const TABS = [
    { key: "team", label: "Team Directory", icon: Users, count: team?.length ?? 0, group: "Collections" },
    { key: "events", label: "Upcoming Events", icon: Calendar, count: events?.length ?? 0, group: "Collections" },
    { key: "blog", label: "Blog Editorial", icon: Newspaper, count: posts?.length ?? 0, group: "Collections" },
    { key: "gallery", label: "Media Gallery", icon: ImageIcon, count: gallery?.length ?? 0, group: "Collections" },
    { key: "inbox", label: "Web Email", icon: Mail, count: inquiries?.filter(i => !i.read).length ?? 0, group: "Communications" },
    { key: "chat", label: "Live Chat", icon: MessageSquare, count: activeChats?.length ?? 0, group: "Communications" },
    { key: "hero", label: "Hero Banner Copy", icon: Sparkles, group: "Customization" },
    { key: "contact", label: "Contact Information", icon: Mail, group: "Customization" },
    { key: "popup", label: "Website Pop Up", icon: Megaphone, group: "Customization" },
  ] as const;

  const Active = {
    team: TeamManager,
    events: EventsManager,
    blog: BlogManager,
    gallery: GalleryManager,
    inbox: InboxManager,
    chat: LiveChatManager,
    hero: HeroManager,
    contact: ContactManager,
    popup: PopupManager,
  }[tab];

  const currentDateString = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-dvh bg-[#07000F] text-white flex flex-col lg:flex-row relative overflow-hidden">
      {/* Decorative ambient gradient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#5E2B97]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-[140px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-[290px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0B0315]/85 backdrop-blur-xl flex flex-col justify-between z-20">
        <div>
          {/* Logo Brand Header */}
          <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#5E2B97] to-[#D4AF37] opacity-70 blur-xs" />
              <img src={logoImg} alt="SOAR Logo" className="relative h-10 w-auto object-contain rounded-lg" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-extrabold tracking-tight text-white">SOAR Global</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mt-1">Admin Suite</span>
            </div>
          </div>

          {/* Quick Stats Panel in Sidebar */}
          <div className="px-6 py-4 border-b border-white/10 hidden lg:block bg-white/2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2.5">
              <BarChart3 className="size-3.5" /> Database Metrics
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
              <div className="bg-white/5 border border-white/5 rounded-lg p-2">
                <div>Team</div>
                <div className="font-display text-base font-extrabold text-white mt-1">{team?.length ?? 0}</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-lg p-2">
                <div>Events</div>
                <div className="font-display text-base font-extrabold text-white mt-1">{events?.length ?? 0}</div>
              </div>
            </div>
          </div>

          {/* Navigation Tab Links */}
          <nav className="p-4 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible lg:space-y-6 scrollbar-none">
            {/* Category Groups */}
            {(["Collections", "Communications", "Customization"] as const).map((groupName) => (
              <div key={groupName} className="flex flex-col shrink-0 lg:shrink w-full">
                <span className="hidden lg:block text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold px-3 mb-2">
                  {groupName}
                </span>
                <div className="flex gap-1.5 lg:flex-col">
                  {TABS.filter((t) => t.group === groupName).map((t) => {
                    const isActive = tab === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`group inline-flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 w-full cursor-pointer border ${
                          isActive
                            ? "bg-gradient-to-r from-[#5E2B97]/30 to-[#D4AF37]/15 border-[#D4AF37]/35 text-white shadow-glow"
                            : "border-transparent text-white/50 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <t.icon className={`size-4 transition-colors duration-300 ${isActive ? "text-[#D4AF37]" : "text-white/30 group-hover:text-white/70"}`} />
                          {t.label}
                        </span>
                        {"count" in t && (
                          <span className={`hidden lg:inline-flex size-5 place-items-center rounded-md text-[10px] font-extrabold transition-all duration-300 ${
                            isActive ? "bg-[#D4AF37] text-[#0C1220]" : "bg-white/5 text-white/40 group-hover:bg-white/10"
                          }`}>
                            {t.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Profile Card / Footer inside Sidebar */}
        <div className="p-4 border-t border-white/10 bg-[#07000F]/60 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-9 rounded-full bg-gradient-to-tr from-[#5E2B97] to-[#D4AF37] grid place-items-center text-xs font-bold text-white uppercase tracking-wider shrink-0">
              AD
            </div>
            <div className="flex flex-col min-w-0 leading-none">
              <span className="text-xs font-bold text-white truncate">Administrator</span>
              <span className="text-[9px] text-white/40 mt-1 truncate">{user?.email || "sistersoar14@gmail.com"}</span>
            </div>
          </div>
          <button
            onClick={signOut}
            title="Sign Out"
            className="size-8 rounded-lg border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-white/60 hover:text-red-400 grid place-items-center transition cursor-pointer"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </aside>

      {/* Main Workspace Panel */}
      <div className="flex-1 flex flex-col overflow-y-auto z-10">
        {/* Workspace Top Header Bar */}
        <header className="px-6 py-5 lg:px-10 border-b border-white/10 bg-[#07000F]/60 backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/50 font-bold uppercase tracking-wider">
              <Clock className="size-3.5 text-[#D4AF37]" /> {currentDateString}
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#D4AF37]">Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-soft"
            >
              <Home className="size-3.5 text-[#D4AF37]" /> Live Website
            </Link>
          </div>
        </header>

        {/* Dynamic Analytics Counters Banner */}
        <div className="px-6 pt-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Team Members", count: team?.length ?? 0, icon: Users, color: "text-[#D4AF37]" },
            { label: "Public Events", count: events?.length ?? 0, icon: Calendar, color: "text-purple-400" },
            { label: "Articles Published", count: posts?.length ?? 0, icon: Newspaper, color: "text-blue-400" },
            { label: "Gallery Assets", count: gallery?.length ?? 0, icon: ImageIcon, color: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4.5 flex items-center justify-between shadow-soft hover:bg-white/8 transition-colors duration-300">
              <div className="leading-none">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">{stat.label}</span>
                <div className="font-display text-2xl font-extrabold text-white mt-1.5">{stat.count}</div>
              </div>
              <div className="size-10 rounded-xl bg-white/5 border border-white/5 grid place-items-center">
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Workspace Panel Body */}
        <main className="flex-grow p-6 lg:p-10">
          <div className="bg-white/3 border border-white/10 rounded-[28px] p-6 lg:p-8 shadow-soft backdrop-blur-sm relative">
            {/* Top ambient color-glow overlay within the workspace */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />
            <Active />
          </div>
        </main>
      </div>
    </div>
  );
}
