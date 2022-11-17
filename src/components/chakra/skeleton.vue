<script setup lang="ts">
const props = defineProps<{ w: string; h: string }>();
</script>

<template>
  <div
    :style="`width: ${props.w}; height: ${props.h}`"
    class="chakra-skeleton rounded border-gray-100 bg-gray-300 animate-pulse border"
  />
</template>

<!-- <style lang="scss" scoped>
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
</style> -->
