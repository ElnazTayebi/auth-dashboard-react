import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // 👈 این را امپورت کن

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,

    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    devtools(),
    tailwindcss(),

    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    viteReact(),
  ],
  server: {
    port: 3000,
  },
});

export default config;
