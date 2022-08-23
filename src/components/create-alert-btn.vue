<script setup lang="ts">

import { CBox, CFlex, CButton, CInput, CText } from "@chakra-ui/vue-next";
import { ref } from "vue";
import { config } from "~/theme/config";

const props = defineProps<{ query: any; queryRaw: string }>();

const isShowModal = ref(false);

const submitted = ref(false)
const submitHandler = async () => {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000))
  submitted.value = true
}

</script>

<template>
  <CButton color-scheme="blue" @click="isShowModal = true">Create Alert</CButton>

  <VueFinalModal
    v-model="isShowModal"
    :lock-scroll="false"
    :click-to-close="true"
    :esc-to-close="true"
  >
    <CFlex
      pos="absolute"
      top="0"
      bottom="0"
      right="0"
      left="0"
      max-w="380px"
      max-h="fit-content"
      m="auto"
      :gap="config.spaces.md"
      :p="config.spaces.md"
      direction="column"
      bg="white"
      border-radius="md"
    >
      <CFlex direction="column">
        <CText w="fit-content">Receive emails for your current search query.</CText>
        
      </CFlex>
      <CInput type="email" placeholder="joe@example.com"/>
      <CButton mt="-3" max-w="fit-content" color-scheme="blue">Subscribe</CButton>
      <CText mt="-0.5" w="fit-content" color="gray.400" font-size="sm">You can unsubscribe anytime.</CText>
    </CFlex>
  </VueFinalModal>
</template>
