import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  // modules: ["@nuxt/ui", "@formkit/nuxt"],
  // modules: ["@nuxt/ui", "nuxt-purgecss"],
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  build: {
    transpile: ["oh-vue-icons"],
  },
  runtimeConfig: {
    public: {
      apiBase: "https://backend.eawork.org/api",
      env: "prod",
      algoliaApplicationId: "S2T38ZKE0P",
      algoliaApiKey: "b0e9cd27b37d64ac5bbb0b0671e1e84b",
      algoliaTagsIndex: "tags_prod",
      algoliaJobsIndex: "jobs_prod",
      segmentId: "",
    },
  },
  ssr: false,
  srcDir: "src/",
});
