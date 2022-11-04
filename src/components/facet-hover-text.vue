<script setup lang="ts">
import { CBox, CLink } from "@chakra-ui/vue-next";

const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <CBox position="absolute" z-index="10" bottom="4" left="12">
    <CBox
      margin="4"
      padding="6"
      background-color="rgba(255, 255, 255, 0.95)"
      border-radius="md"
      font-size="sm"
      width="250px"
      shadow="inset 0 0 0 1px #E1E6EA"
    >
      {{ props.text }}
    </CBox>
  </CBox>
</template>
