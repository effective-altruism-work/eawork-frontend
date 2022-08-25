import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@formkit/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiBase: "https://backend.eawork.org/api",
      env: "prod",
      algoliaApplicationId: "S2T38ZKE0P",
      algoliaApiKey: "b0e9cd27b37d64ac5bbb0b0671e1e84b",
      algoliaTagsIndex: "tags_prod",
      algoliaJobsIndex: "jobs_prod",
    },
  },
  ssr: false,
  srcDir: "src/",
});
