import { defineNuxtPlugin } from "#app";
import pkg from "vue3-observe-visibility";
const { ObserveVisibility } = pkg;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("observe-visibility", ObserveVisibility);
});
