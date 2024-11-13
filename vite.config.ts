import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically updates the service worker
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ], // Custom assets
      manifest: {
        name: "Sudoku",
        short_name: "Sudoku",
        description:
          "An amazing Sudoku app that lets you play and choose from three different difficulties, place your score on the score board, solve boards from scratch or by uploading an image of an existing board!",
        theme_color: "#1e1e2e",
        display: "standalone", // for better mobile support
        icons: [
          {
            src: "favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
