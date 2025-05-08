import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Log all module IDs for debugging
          console.log("Module ID:", id);

          // Split node_modules into package-specific chunks
          if (id.includes("node_modules")) {
            const packageName = id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
            console.log(`Creating chunk for package: ${packageName}`);
            return packageName; // Creates chunks like react-[hash].js, lodash-[hash].js
          }

          // Split CSS files into a separate chunk
          if (id.includes(".css")) {
            console.log("Creating styles chunk for:", id);
            return "styles";
          }

          // Split your app's code based on folder structure or file name
          if (id.includes("src/")) {
            const parts = id.split("/");
            const fileName = parts[parts.length - 1].split(".")[0];
            console.log(`Creating app chunk for: ${fileName}`);
            return `app-${fileName}`; // Creates chunks like app-main-[hash].js
          }
        },
      },
    },
  },
});
