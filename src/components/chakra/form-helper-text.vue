<script lang="ts" setup>

const props = defineProps<{ text: string }>();
</script>

<template>
  <div class="mt-2 text-gray-400 text-sm leading-normal">
    {{ props.text }}
  </div>
</template>
