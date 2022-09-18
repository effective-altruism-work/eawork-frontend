import ChakraUIVuePlugin, { chakra, extendTheme } from "@chakra-ui/vue-next";
import { domElements } from "@chakra-ui/vue-system";
import { defineNuxtPlugin } from "#app";
import { feActivity, feChevronDown, feUser, feX } from "feather-icons-paths";
import { FaDiscord, IoMenu, RiArrowDownSFill } from "oh-vue-icons/icons";
import { IconType } from "oh-vue-icons/types/icons";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ChakraUIVuePlugin, {
    extendTheme: theme,
    icons: {
      library: {
        feX,
        feChevronDown,
      },
      extend: {
        ...getIconProps(FaDiscord),
        ...getIconProps(IoMenu),
        ...getIconProps(RiArrowDownSFill),
      },
    },
  });

  domElements.forEach((tag) => {
    nuxtApp.vueApp.component(`chakra.${tag}`, chakra(tag));
  });
});

const theme = extendTheme({
  fonts: {
    heading: `Open Sans, Helvetica, Arial, sans-serif`,
    body: `Open Sans, Helvetica, Arial, sans-serif`,
    proxima: `"proxima-nova", "Helvetica Neue", Helvetica, Arial, sans-serif`,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
      variants: {
        solid: {
          fontWeight: "normal",
        },
        outline: {
          borderColor: "blue.500",
          fontWeight: "normal",
        },
        link: {
          fontWeight: "normal",
        },
      },
    },
    Link: {
      baseStyle: {
        color: "blue.500",
        _hover: {
          color: "blue.700",
          textDecoration: "none",
        },
        _active: {
          color: "blue.800",
        }
      },
      colorScheme: "blue",
    },
    FormLabel: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
  },
});

function getIconProps(icon: IconType) {
  return {
    [icon.name]: {
      path: icon.raw,
      viewBox: `${icon.minX} ${icon.minY} ${icon.width} ${icon.height}`,
    }
  }
}
