<script setup lang="ts">

import { useRuntimeConfig } from "#app";
import { CBox, CFlex, CButton, CInput, CText } from "@chakra-ui/vue-next";
import axios from "axios";
import { ref } from "vue";
import { config } from "~/theme/config";

const props = defineProps<{ query: any; queryRaw: string }>();
const nuxtConfig = useRuntimeConfig();

const state = {
  isShowModal: ref(false),
  email: ref(""),
  isSubmitting: ref(false),
  isSuccess: ref(null),
  isError: ref(false),
}

async function createJobAlert() {
  state.isSubmitting.value = true;
  state.isSuccess.value = null;
  state.isError.value = false;
  try {
    const res = await axios.post(`${nuxtConfig.public.apiBase}/jobs/subscribe/`, {
      email: state.email.value,
      query: props.query,
      queryRaw: props.queryRaw,
    });
    if (res.data.success) {
      state.isSuccess.value = true;
    } else {
      state.isError.value = true;
    }
  } catch (e) {
    state.isError.value = true;
  }
  state.isSubmitting.value = false;
}

</script>

<template>
  <CButton color-scheme="blue" @click="state.isShowModal.value = true">Create Alert</CButton>

  <VueFinalModal
    v-model="state.isShowModal.value"
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
      <CInput v-model="state.email.value" type="email" placeholder="joe@example.com"/>
      <CButton
        @click="createJobAlert()"
        :is-loading="state.isSubmitting.value"
        mt="-3"
        max-w="fit-content"
        color-scheme="blue"
      >
        Subscribe
      </CButton>
      <CText mt="-0.5" w="fit-content" color="gray.400" font-size="sm">You can unsubscribe anytime.</CText>
    </CFlex>
  </VueFinalModal>
</template>
