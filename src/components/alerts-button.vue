<script setup lang="ts">
import { CFlex, CButton, CInput, CText, CBox } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";

defineProps<{ filtered: boolean }>();

const emit = defineEmits(["showModal"]);
</script>

<template>
  <CButton color-scheme="blue" @click="emit('showModal')">
    <OhVueIcon name="md-addalert-round" scale="1" color="white" />
    <CText ml="2">
      <span>Set up alerts</span>
      <span v-if="filtered"> for this filter</span>
    </CText>
  </CButton>
</template>
