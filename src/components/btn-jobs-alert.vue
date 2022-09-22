<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CButton, CInput, CText, CBox } from "@chakra-ui/vue-next";
import axios from "axios";
import { OhVueIcon } from "oh-vue-icons";
import { ref } from "vue";
import { theme } from "~/styles/theme";

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
    const res = await axios.post(`${nuxtConfig.public.apiBase}/jobs/subscribe`, {
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
  <CButton color-scheme="blue" @click="state.isShowModal.value = true">
    <OhVueIcon name="md-addalert-round" scale="1" color="white" />
    <CText ml="2">
      <span>Set up alerts</span>
      <span v-if="props.queryJson">for this filter</span>
    </CText>
  </CButton>

  <VueFinalModal
    v-model="state.isShowModal.value"
    :lock-scroll="false"
    :click-to-close="true"
    :esc-to-close="true"
  >
    <CFlex
      pos="absolute"
      top="44"
      right="0"
      left="0"
      max-w="390px"
      max-h="fit-content"
      m="auto"
      :gap="theme.spaces.md"
      :p="theme.spaces.md"
      direction="column"
      bg="white"
      border-radius="8"
    >
      <CFlex justify="space-between">
        <CText
          v-if="props.queryJson"
          w="fit-content"
          font-size="sm"
        >
          Subscribe to new jobs that match your query:
        </CText>
        <CBox v-else>
          <CText w="fit-content">Subscribe to all new job posts.</CText>
          <CText w="fit-content" color="gray.500" font-size="sm">(because your search query is unspecified)</CText>
        </CBox>

        <CBox
          font-size="xs"
          color="blue.500"
          border="1px solid"
          border-color="blue.500"
          border-radius="5"
          px="1"
          h="fit-content"
        >
          BETA
        </CBox>
      </CFlex>

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
        <CText v-for="filter in props.queryJson?.facetFilters ?? []" :key="filter">
          {{ filter.replace(/tags_\w*:/, "Filter: ") }}
        </CText>
      </CText>

      <CInput
        v-model="state.email.value"
        type="email"
        name="email"
        placeholder="joe@example.com"
      />
      
      <CFlex justify="space-between">
        <CText font-size="10px" max-w="200px" line-height="1.3" color="gray.600">
          You will receive updates daily (if there are new roles that match your query)
          and you can unsubscribe at any time
        </CText>
        
        <CButton
          @click="createJobAlert()"
          :is-loading="state.isSubmitting.value"
          max-w="fit-content"
          align-self="flex-end"
          color-scheme="blue"
        >
          Subscribe
        </CButton>
      </CFlex>

      <CText v-if="state.isSuccess.value" color="green.500">Subscribed!</CText>
      <CText v-if="state.isError.value" color="red.500">An error occurred</CText>
    </CFlex>
  </VueFinalModal>
</template>
