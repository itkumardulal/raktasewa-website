/**
 * Backend API base URL.
 * Uses VITE_API_URL when valid; never calls localhost from a deployed site.
 */
const PROD_ORIGIN = "https://raktasewa-server-production.up.railway.app";
const DEV_ORIGIN = "http://localhost:5000";

function isPlaceholderOrLocal(url) {
  if (!url) return true;
  const u = url.toLowerCase();
  return (
    u.includes("yourdomain") ||
    u.includes("example.com") ||
    u.includes("localhost") ||
    u.includes("127.0.0.1")
  );
}

function resolveOrigin() {
  const fromEnv = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");

  // Browser on a real host must never hit localhost (fixes bad production builds)
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isLocalHost = host === "localhost" || host === "127.0.0.1";
    if (!isLocalHost && isPlaceholderOrLocal(fromEnv)) {
      return PROD_ORIGIN;
    }
  }

  if (isPlaceholderOrLocal(fromEnv)) {
    return import.meta.env.PROD ? PROD_ORIGIN : DEV_ORIGIN;
  }

  return fromEnv;
}

const RAW_URL = resolveOrigin();

export const API_URL = RAW_URL.endsWith("/api") ? RAW_URL : `${RAW_URL}/api`;

/** Build a full API path, e.g. apiUrl("/public/donors/recent") */
export function apiUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Re-resolve at call time so deployed sites never keep a baked localhost base
  const origin = resolveOrigin();
  const base = origin.endsWith("/api") ? origin : `${origin}/api`;
  return `${base}${normalized}`;
}
