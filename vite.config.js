import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      routes: "/src/routes",
      pages: "/src/pages",
      services: "/src/services",
      config: "/src/config",
      features: "/src/features",
    },
  },
});
