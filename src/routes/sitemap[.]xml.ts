import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const entries = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/about", priority: "0.8", changefreq: "monthly" as const },
  { path: "/programs", priority: "0.9", changefreq: "monthly" as const },
  { path: "/success-stories", priority: "0.7", changefreq: "monthly" as const },
  { path: "/events", priority: "0.7", changefreq: "weekly" as const },
  { path: "/gallery", priority: "0.6", changefreq: "monthly" as const },
  { path: "/blog", priority: "0.7", changefreq: "weekly" as const },
  { path: "/volunteer", priority: "0.8", changefreq: "monthly" as const },
  { path: "/donate", priority: "0.9", changefreq: "monthly" as const },
  { path: "/partners", priority: "0.7", changefreq: "monthly" as const },
  { path: "/contact", priority: "0.7", changefreq: "monthly" as const },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" as const },
  { path: "/terms", priority: "0.3", changefreq: "yearly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
