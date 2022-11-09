<script setup lang="ts">
import { CFlex, CBox, CText, CLink } from "@chakra-ui/vue-next";
import EightykLink from "~/components/eightyk/eightyk-link.vue";
import { OhVueIcon } from "oh-vue-icons";

const props = defineProps<{
  area: "Other policy-focused" | "Information security";
  isHovering: boolean;
}>();
</script>

<template>
  <CBox position="relative" w="4" h="4">
    <OhVueIcon
      name="io-information-circle"
      scale="0.8"
      top="-1.5px"
      ml="0.5"
      position="relative"
    />

    <CBox v-if="isHovering" position="absolute" z-index="10" bottom="0" left="-12">
      <CBox
        margin="4"
        padding="6"
        background-color="rgba(255, 255, 255, 0.95)"
        border-radius="md"
        font-size="sm"
        width="400px"
        shadow="inset 0 0 0 1px #E1E6EA"
        color="black"
      >
        <HoverTextInformationSecurity v-if="area === 'Information security'" />
        <HoverTextOtherPolicy v-else />
      </CBox>
    </CBox>
  </CBox>
</template>
