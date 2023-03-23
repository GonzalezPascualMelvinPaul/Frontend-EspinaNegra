import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInclude: [
      "**/*.js",
      "**/*.css",
      "**/*.html",
      "**/*.png",
      "**/*.svg",
      "**/*.jpg",
      "sw.js",
    ],
  },
  server: {
    port: 3000,
  },
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },

      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "Espina Negra",
        short_name: "Espina Negra",
        theme_color: "#ffffff",
        scope: "/espina-negra/#/",
        start_url: "/espina-negra/#/",
        icons: [
          {
            src: "EspinaNegra_5060x2154.png", // <== don't add slash, for testing
            sizes: "5060x2154",
            type: "image/png",
          },
          {
            src: "EspinaNegrax192.png", // <== don't add slash, for testing
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "EspinaNegrax128.png", // <== don't add slash, for testing
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "EspinaNegrax512.png", // <== don't remove slash, for testing
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable_512.png", // <== don't add slash, for testing
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
