<script setup lang="ts">
import { OhVueIcon } from "oh-vue-icons";

const props = defineProps<{
  area: "Other policy-focused" | "Information security";
  isHovering: boolean;
}>();
</script>

<template>
  <div class="w-4 h-4" w="4" h="4">
    <OhVueIcon
      name="io-information-circle"
      scale="0.8"
      top="-1.5px"
      ml="0.5"
      style="opacity: 0.6"
      position="relative"
    />

    <div class="z-10 bottom-2 group-hover:oaewihweoihgw left-0 absolute" v-if="isHovering">
      <div
        class="m-4 p-6 opacity-95 rounded text-sm w-[400px] shadow text-black bg-white"
        background-color="rgba(255, 255, 255, 0.95)"
        shadow="inset 0 0 0 1px #E1E6EA"
      >
        <HoverTextInformationSecurity v-if="area === 'Information security'" />
        <HoverTextOtherPolicy v-else />
      </div>
    </div>
  </div>
</template>
