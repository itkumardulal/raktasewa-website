import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  base: "/", // Adjust if deploying to a subdirectory (e.g., '/myapp/')
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
