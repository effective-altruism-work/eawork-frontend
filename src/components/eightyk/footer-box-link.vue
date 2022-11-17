<script setup lang="ts">
import EightyKLink from "~/components/eightyk/eightyk-link.vue";
const props = defineProps<{ href: string; external?: boolean }>();
const { href, external } = props;
</script>

<template>
  <a class="text-gray-lightest hover:underline" v-if="external" is-external :href="href"
    ><slot
  /></a>
  <EightyKLink v-else :class="'text-gray-lightest hover:underline'" :path="href"
    ><slot
  /></EightyKLink>
</template>
