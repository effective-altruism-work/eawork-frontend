<script setup lang="ts">
import { CFlex, CBox, CText, CLink } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";

defineProps<{
  path: string;
}>();

const eightyKRoot = "https://80000hours.org";
const jbSource = "/?int_source=job-board";
</script>

<template>
  <CLink is-external target="_blank" :href="`${eightyKRoot}${path}${jbSource}`">
    <slot />
  </CLink>
</template>
