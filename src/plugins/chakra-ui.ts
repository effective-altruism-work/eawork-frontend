import ChakraUIVuePlugin, { chakra, extendTheme } from "@chakra-ui/vue-next";
import { domElements } from "@chakra-ui/vue-system";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ChakraUIVuePlugin, {
    extendTheme: theme,
  });

  domElements.forEach((tag) => {
    nuxtApp.vueApp.component(`chakra.${tag}`, chakra(tag));
  });
});

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
    },
    FormLabel: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
  },
});
