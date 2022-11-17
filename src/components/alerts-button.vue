<script setup lang="ts">
import { OhVueIcon } from "oh-vue-icons";
import KButton from "~/components/generics/kButton.vue";

defineProps<{ filtered: boolean }>();

const emit = defineEmits(["showModal"]);
</script>

<template>
  <KButton @click="emit('showModal')">
    <OhVueIcon name="md-addalert-round" scale="1" color="white" />
    <p class="ml-2 text-white">
      <span>Set up alerts</span>
      <span v-if="filtered"> for this filter</span>
    </p>
  </KButton>
</template>
