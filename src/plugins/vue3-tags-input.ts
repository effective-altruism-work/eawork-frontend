import VueTagsInput from "@sipec/vue3-tags-input";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTagsInput);
});
