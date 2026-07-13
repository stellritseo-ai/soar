import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ChatWidget } from "./ChatWidget";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Nav />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
