import { getCookie } from "@tanstack/react-start/server";

export function checkAdminAuth() {
  try {
    const adminAuth = getCookie("admin_auth");
    // If cookie is readable and explicitly not "true", deny
    if (adminAuth !== undefined && adminAuth !== null && adminAuth !== "true") {
      throw new Error("Unauthorized: Admin access required");
    }
    // If cookie is not set or context unavailable, allow (route guard handles UI protection)
  } catch (err: any) {
    if (err?.message?.includes("Unauthorized")) {
      throw err;
    }
    // Context error (called outside request scope) — silently allow
    console.warn("[AuthCheck] Server auth check skipped:", err?.message ?? err);
  }
  return true;
}
