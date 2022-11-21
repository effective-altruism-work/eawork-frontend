<script lang="ts" setup>
const isOpen = ref(false);

function handleClick() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <button
    class="mb-3 bg-white p-4 group lg:p-6 rounded-xl hover:cursor-pointer outline-gray-200"
    :class="isOpen ? 'outline' : 'hover:outline'"
    @click="handleClick"
  ></button>
</template>
