import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Users, Calendar, Newspaper, Image as ImageIcon, Mail, Sparkles } from "lucide-react";

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
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const sections = [
    { title: "Team Members", icon: Users, copy: "Add, edit, or remove team member cards." },
    { title: "Events", icon: Calendar, copy: "Manage upcoming events." },
    { title: "Blog Posts", icon: Newspaper, copy: "Publish articles and news." },
    { title: "Gallery", icon: ImageIcon, copy: "Curate gallery images." },
    { title: "Contact Info", icon: Mail, copy: "Update site contact details." },
    { title: "Hero & Copy", icon: Sparkles, copy: "Edit homepage headline and stats." },
  ];

  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full gradient-brand shadow-glow">
              <span className="font-display text-sm font-bold text-primary-foreground">S</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight">SOAR Admin</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Dashboard</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground md:inline">{user.email}</span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <h1 className="font-display text-4xl md:text-5xl">Welcome back.</h1>
        <p className="mt-2 text-muted-foreground">Manage your website content from here.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <div
              key={s.title}
              className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="grid size-12 place-items-center rounded-2xl gradient-brand text-primary-foreground shadow-glow">
                <s.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
              <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary/70">
                Coming next
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
