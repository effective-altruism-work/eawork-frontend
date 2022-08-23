import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
  ],
  runtimeConfig: {
    public: {
      apiBase: "https://backend.eawork.org/api",
    },
  },
  ssr: false,
  srcDir: "src/",
});
