<script lang="ts" setup>
const props = defineProps<{ fn: () => void }>();
onMounted(() => {
  props.fn();
});
</script>

<template>
  <div />
</template>
