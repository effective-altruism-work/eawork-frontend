<script lang="ts">
import { CBox } from "@chakra-ui/vue-next";
import { vueThemingProps } from "@chakra-ui/vue-utils";

export default {
  props: vueThemingProps,
  components: {
    CBox,
  },
};
</script>

<template>
  <CBox class="chakra-skeleton" v-bind="$props" />
</template>

<style lang="scss" scoped>
@import "~/styles/chakra-ui.scss";

@keyframes blink {
  0% {
    background-color: var(--colors-gray-300);
  }
  50% {
    background-color: var(--colors-gray-100);
  }
  100% {
    background-color: var(--colors-gray-300);
  }
}

.chakra-skeleton {
  border-radius: var(--radii-md);
  border-color: var(--colors-gray-100);
  background: padding-box var(--colors-gray-300);
  animation: blink normal 1.2s infinite linear;
}
</style>
