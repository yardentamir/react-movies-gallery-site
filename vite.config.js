import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(projectRootDir, "src"),
      components: path.resolve(projectRootDir, "src/components"),
      routes: path.resolve(projectRootDir, "src/routes"),
      pages: path.resolve(projectRootDir, "src/pages"),
      services: path.resolve(projectRootDir, "src/services"),
      config: path.resolve(projectRootDir, "src/config"),
      features: path.resolve(projectRootDir, "src/features"),
    },
  },
});
