import axios from "axios";
import VueAxios from "vue-axios";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAxios, axios);
});
