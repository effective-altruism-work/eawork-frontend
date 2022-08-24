<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CButton, CInput, CText } from "@chakra-ui/vue-next";
import axios from "axios";
import { ref } from "vue";
import { config } from "~/theme/config";

const props = defineProps<{
  queryJson: null | {
    query: string;
    facetFilters: string[];
  };
}>();
const nuxtConfig = useRuntimeConfig();

const state = {
  isShowModal: ref(false),
  email: ref(""),
  isSubmitting: ref(false),
  isSuccess: ref(null),
  isError: ref(false),
};

async function createJobAlert() {
  state.isSubmitting.value = true;
  state.isSuccess.value = null;
  state.isError.value = false;
  try {
    const res = await axios.post(`${nuxtConfig.public.apiBase}/jobs/subscribe/`, {
      email: state.email.value,
      query_json: props.queryJson,
      query_string: window.location.search,
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
      max-w="390px"
      max-h="fit-content"
      m="auto"
      :gap="config.spaces.md"
      :p="config.spaces.md"
      direction="column"
      bg="white"
      border-radius="md"
    >
      <CText v-if="props.queryJson" w="fit-content"
        >Subscribe to new jobs that match your query:</CText
      >
      <CText v-else w="fit-content"
        >Subscribe to all new job posts, because your search query is unspecified.</CText
      >

      <CText
        v-if="props.queryJson"
        bg="gray.100"
        border-radius="md"
        py="3"
        px="4"
        mt="-1"
        font-size="xs"
      >
        <CText v-if="props.queryJson.query">Query: {{ props.queryJson.query }}</CText>
        <CText v-for="filter in props.queryJson.facetFilters">{{ filter }}</CText>
      </CText>

      <CInput
        v-model="state.email.value"
        type="email"
        name="email"
        placeholder="joe@example.com"
      />
      <CButton
        @click="createJobAlert()"
        :is-loading="state.isSubmitting.value"
        max-w="fit-content"
        align-self="flex-end"
        color-scheme="blue"
      >
        Subscribe
      </CButton>

      <CText v-if="state.isSuccess.value" color="green.500">Subscribed!</CText>
      <CText v-if="state.isError.value" color="red.500">An error occured</CText>
    </CFlex>
  </VueFinalModal>
</template>
