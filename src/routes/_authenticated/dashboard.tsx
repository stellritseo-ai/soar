import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Users, Calendar, Newspaper, Image as ImageIcon, Mail, Sparkles } from "lucide-react";
import { TeamManager } from "@/components/admin/TeamManager";
import { EventsManager } from "@/components/admin/EventsManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { HeroManager, ContactManager } from "@/components/admin/SettingsManagers";
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

const TABS = [
  { key: "team", label: "Team", icon: Users, C: TeamManager },
  { key: "events", label: "Events", icon: Calendar, C: EventsManager },
  { key: "blog", label: "Blog", icon: Newspaper, C: BlogManager },
  { key: "gallery", label: "Gallery", icon: ImageIcon, C: GalleryManager },
  { key: "hero", label: "Hero", icon: Sparkles, C: HeroManager },
  { key: "contact", label: "Contact", icon: Mail, C: ContactManager },
] as const;

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("team");

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const Active = TABS.find((t) => t.key === tab)!.C;

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoImg} alt="SOAR Logo" className="h-9 w-auto object-contain" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight">SOAR Admin</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Dashboard</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground md:inline">{user.email}</span>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary">
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr] lg:px-10">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                tab === t.key ? "bg-secondary text-primary" : "text-foreground/70 hover:bg-secondary/60"
              }`}>
              <t.icon className="size-4" /> {t.label}
            </button>
          ))}
        </nav>
        <main className="min-w-0">
          <Active />
        </main>
      </div>
    </div>
  );
}
