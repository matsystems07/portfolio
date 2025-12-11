import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  css: {
    postcss: "./postcss.config.js",
  },

  build: {
    assetsInlineLimit: 0,
  },

  server: {
    port: 5173,

    // ✅ Proxy backend routes to localhost:5000 during development
    proxy: {
      "/ai": "http://localhost:5000",
      "/contact": "http://localhost:5000",
      "/projects": "http://localhost:5000",
      "/warmup": "http://localhost:5000",
    }
  }
});
