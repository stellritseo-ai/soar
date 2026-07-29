import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    if (typeof window !== "undefined") {
      const isAuthLocal = localStorage.getItem("admin_auth") === "true";
      const isAuthCookie = document.cookie.includes("admin_auth=true");
      if (!isAuthLocal && !isAuthCookie) {
        throw redirect({ to: "/auth", search: { redirect: location.href } });
      }
    }
    return { user: { email: "shoutgospelworship@gmail.com" } };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
