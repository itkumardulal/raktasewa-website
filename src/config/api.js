/**
 * Backend API base URL.
 * Ignores placeholder VITE_API_URL values (e.g. api.yourdomain.com)
 * that may still be set in Railway build variables.
 */
const PROD_ORIGIN = "https://raktasewa-server-production.up.railway.app";
const DEV_ORIGIN = "http://localhost:5000";

function resolveOrigin() {
  const fromEnv = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");

  // Ignore empty or placeholder domains left from templates / Railway vars
  if (
    !fromEnv ||
    fromEnv.includes("yourdomain") ||
    fromEnv.includes("example.com")
  ) {
    return import.meta.env.PROD ? PROD_ORIGIN : DEV_ORIGIN;
  }

  return fromEnv;
}

const RAW_URL = resolveOrigin();

export const API_URL = RAW_URL.endsWith("/api") ? RAW_URL : `${RAW_URL}/api`;

/** Build a full API path, e.g. apiUrl("/public/stats") */
export function apiUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalized}`;
}
