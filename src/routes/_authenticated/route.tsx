import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true";
    if (!isAuthenticated) {
      throw redirect({ to: "/auth", search: { redirect: location.href } });
    }
    return { user: { email: "admin@soarglobal.org" } };
  },
  component: () => <Outlet />,
});
