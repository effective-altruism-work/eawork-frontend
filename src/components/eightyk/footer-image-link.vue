<script setup lang="ts">
import { CLink } from "@chakra-ui/vue-next";

const props = defineProps<{ href: string; alt: string; src: string; src2: string }>();
const { href, alt, src, src2 } = props;
</script>

<template>
  <CLink
    border="2px solid #484e51"
    display="flex"
    justify-content="center"
    align-items="center"
    border-radius="4px"
    width="84px"
    height="84px"
    mr="10px"
    is-external
    :href="href"
  >
    <noscript
      ><img
        width="84px"
        height="84px"
        :alt="alt"
        :src="src"
        :srcset="`${src}    1x,
          ${src2} 2x`"
    /></noscript>
    <img
      loading="lazy"
      :alt="alt"
      :src="src"
      :data-src="src"
      :data-srcset="`${src} 1x, ${src2} 2x`"
      :srcset="`
        ${src}    1x,
        ${src2} 2x
      `"
      width="84"
      height="84"
    />
  </CLink>
</template>
