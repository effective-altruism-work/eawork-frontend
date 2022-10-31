import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@nuxt/ui", "vue-final-modal"],
  // modules: ["@nuxt/ui", "vue-final-modal", "@formkit/nuxt"],
  // modules: ["@nuxt/ui", "vue-final-modal", "nuxt-purgecss"],
  meta: { viewport: "width=device-width, initial-scale=1" },
  build: {
    transpile: [
      "oh-vue-icons",
      "vue-instantsearch",
      "instantsearch.js/es",
      "vue3-observe-visibility",
    ],
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
  sentry: {
    dsn: "https://dd139303defc491b9710df6eac619379@o1376636.ingest.sentry.io/6685828",
  },
  ssr: false,
  srcDir: "src/",
});
