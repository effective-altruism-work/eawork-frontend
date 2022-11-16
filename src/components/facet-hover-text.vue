<script setup lang="ts">
import HoverTextInformationSecurity from "~/components/hover-text/information-security.vue";
import HoverTextOtherPolicy from "~/components/hover-text/other-policy.vue";

const props = defineProps<{
  area: string;
}>();
</script>

<template>
  <div
    class="z-10 absolute bottom-4 left-12"
    position="absolute"
    z-index="10"
    bottom="4"
    left="12"
  >
    <div
      class="m-4 p-6 opacity-95 rounded-md text-sm w-64 shadow text-black bg-white"
      shadow="inset 0 0 0 1px #E1E6EA"
    >
      <HoverTextInformationSecurity v-if="area === 'Information security'" />
      <HoverTextOtherPolicy v-if="area === 'Other policy-focused'" />
    </div>
  </div>
</template>
