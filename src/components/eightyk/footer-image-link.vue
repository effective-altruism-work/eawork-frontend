<script setup lang="ts">
const props = defineProps<{ href: string; alt: string; src: string; src2: string }>();
const { href, alt, src, src2 } = props;
</script>

<template>
  <a
    class="border-2 border-[#484e51] flex justify-center items-center rounded w-[84px] h-[84px] mr-2.5"
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
  </a>
</template>
