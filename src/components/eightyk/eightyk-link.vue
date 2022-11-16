<script setup lang="ts">
defineProps<{
  path: string;
}>();

const eightyKRoot = "https://80000hours.org";
const jbSource = "/?int_source=job-board";
</script>

<template>
  <a target="_blank" :href="`${eightyKRoot}${path}${jbSource}`">
    <slot />
  </a>
</template>
