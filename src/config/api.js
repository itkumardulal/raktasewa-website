/**
 * Backend origin from VITE_API_URL (e.g. https://raktasewa-server-production.up.railway.app).
 * Routes are always under /api on the server.
 */
const RAW_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export const API_URL = RAW_URL.endsWith("/api")
  ? RAW_URL
  : `${RAW_URL}/api`;

/** Build a full API path, e.g. apiUrl("/public/stats") */
export function apiUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalized}`;
}
