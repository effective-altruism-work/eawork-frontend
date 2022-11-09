<script setup lang="ts">
import { CLink } from "@chakra-ui/vue-next";
import EightyKLink from "~/components/eightyk/eightyk-link.vue";
const props = defineProps<{ href: string; external?: boolean }>();
const { href, external } = props;
</script>

<template>
  <CLink
    v-if="external"
    color="lightest-gray"
    is-external
    :_hover="{ textDecoration: 'underline' }"
    :href="href"
    ><slot
  /></CLink>
  <CLink v-else color="lightest-gray" :_hover="{ textDecoration: 'underline' }" :path="href"
    ><slot
  /></CLink>
</template>
