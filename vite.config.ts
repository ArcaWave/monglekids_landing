import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// Side-effect import: pulls vite-react-ssg's module augmentation that adds
// `ssgOptions` to `UserConfig`.
import "vite-react-ssg";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Force a single copy of these libs across the user code and the
    // vite-react-ssg runtime. Without this, two copies of HelmetProvider /
    // its context coexist and the SSG's HelmetProvider never sees our
    // <Helmet> registrations, so per-page <title> / <meta> silently vanish.
    dedupe: ["react", "react-dom", "react-helmet-async", "react-router", "react-router-dom"],
  },
  ssgOptions: {
    entry: "src/main.tsx",
    // /about → /about/index.html (clean URLs without .html)
    dirStyle: "nested",
    formatting: "none",
    // Disable Critters/Beasties for now to keep CSS handling simple
    crittersOptions: false,
  },
});
