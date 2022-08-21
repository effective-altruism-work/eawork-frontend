import { defineNuxtPlugin } from "#app";
import ChakraUIVuePlugin, { chakra } from "@chakra-ui/vue-next";
import { domElements } from "@chakra-ui/vue-system";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ChakraUIVuePlugin);
  domElements.forEach((tag) => {
    nuxtApp.vueApp.component(`chakra.${tag}`, chakra(tag));
  });
});
