<script setup lang="ts">
import { CBox, CLink } from "@chakra-ui/vue-next";
import HoverTextInformationSecurity from "~/components/hover-text/information-security.vue";
import HoverTextOtherPolicy from "~/components/hover-text/other-policy.vue";

const props = defineProps<{
  area: string;
}>();
</script>

<template>
  <CBox position="absolute" z-index="10" bottom="4" left="12">
    <p>{{ area }}</p>
    <CBox
      margin="4"
      padding="6"
      background-color="rgba(255, 255, 255, 0.95)"
      border-radius="md"
      font-size="sm"
      width="250px"
      shadow="inset 0 0 0 1px #E1E6EA"
      color="black"
    >
      <HoverTextInformationSecurity v-if="area === 'Information security'" />
      <HoverTextOtherPolicy v-if="area === 'Other policy-focused'" />
    </CBox>
  </CBox>
</template>
