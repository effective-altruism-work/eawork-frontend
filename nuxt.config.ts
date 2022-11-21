import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["vue-final-modal", "@nuxtjs/tailwindcss"],
  // modules: ["@nuxt/ui", "vue-final-modal", "@formkit/nuxt"],
  // modules: ["@nuxt/ui", "vue-final-modal", "nuxt-purgecss"],
  meta: [{ viewport: "name", content: "width=device-width, initial-scale=1" }],
  build: {
    transpile: ["oh-vue-icons"],
    // transpile: ["oh-vue-icons", "vue-instantsearch","instantsearch.js/es","vue3-observe-visibility",
  },
  runtimeConfig: {
    public: {
      apiBase: "https://backend.eawork.org/api",
      env: "prod",
      algoliaApplicationId: "S2T38ZKE0P",
      algoliaApiKey: "b0e9cd27b37d64ac5bbb0b0671e1e84b",
      algoliaTagsIndex: "tags_prod",
      algoliaCompaniesIndex: "companies_prod",
      algoliaJobsIndex: "jobs_prod",
      segmentId: "",
    },
  },
  tailwindcss: {
    cssPath: "~/styles/tailwind.css",
  },
  ssr: false,
  srcDir: "src/",
});
