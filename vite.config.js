import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Keep for dev server if needed
    port: 3000,
  },
  base: "/", // Adjust if deploying to a subdirectory (e.g., '/myapp/')
  build: {
    outDir: "dist", // Explicitly set output directory
    sourcemap: false, // Disable sourcemaps for production
  },
});
