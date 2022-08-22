import InstantSearch from "vue-instantsearch/vue3/es";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(InstantSearch);
});
