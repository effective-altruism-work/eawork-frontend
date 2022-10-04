import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@formkit/nuxt"],
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
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
