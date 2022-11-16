<script setup lang="ts">
import { OhVueIcon } from "oh-vue-icons";

defineProps<{ filtered: boolean }>();

const emit = defineEmits(["showModal"]);
</script>

<template>
  <button @click="emit('showModal')">
    <OhVueIcon name="md-addalert-round" scale="1" color="white" />
    <p class="ml-2">
      <span>Set up alerts</span>
      <span v-if="filtered"> for this filter</span>
    </p>
  </button>
</template>
