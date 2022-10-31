<script setup lang="ts">
import { CLink } from "@chakra-ui/vue-next";

const props = defineProps<{ href: string; external?: boolean }>();
const { href, external } = props;
</script>

<template>
  <CLink
    color="lightest-gray"
    is-external
    :_hover="{ textDecoration: 'underline' }"
    :href="external ? href : `https://80000hours.org${href}`"
    ><slot
  /></CLink>
</template>
