import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const robotsTxt = `User-agent: *
Allow: /

# Disallow non-public dashboard and auth routes
Disallow: /_authenticated/
Disallow: /dashboard
Disallow: /auth

# Official XML Sitemap
Sitemap: https://soarglobalfoundation.org/sitemap.xml
`;
        return new Response(robotsTxt, {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
