<script setup lang="ts">
const props = defineProps<{ w: string; h: string }>();
</script>

<template>
  <div
    :style="`width: ${props.w}; height: ${props.h}`"
    class="chakra-skeleton rounded border-gray-100 bg-gray-300 animate-pulse border"
  />
</template>
