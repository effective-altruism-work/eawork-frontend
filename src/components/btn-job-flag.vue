<!-- <script setup lang="ts">
import { useRuntimeConfig } from "#app";
import {
  CFlex,
  CText,
  CButton,
  CAlert,
  CAlertIcon,
  CAlertDescription,
} from "@chakra-ui/vue-next";
import { FormKitNode } from "@formkit/core";
import axios from "axios";
import { ref } from "vue";
import { msg } from "~/constants";
import { theme } from "~/styles/theme";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{ job: JobAlgolia }>();

const state = {
  isShowModal: ref(false),
  isSuccess: ref(null),
  config: useRuntimeConfig(),
};

async function submit(data: { message: string; email?: string }, node: FormKitNode) {
  state.isSuccess.value = null;
  try {
    const res = await axios.post(`${state.config.public.apiBase}/jobs/flag`, {
      ...data,
      job_pk: props.job.objectID,
    });
    if (res.data.success) {
      state.isSuccess.value = true;
    } else {
      node.setErrors([msg.error]);
    }
  } catch (e) {
    node.setErrors([msg.error]);
  }
}
</script> -->

<template>
  <div>coming soon...</div>
  <!-- <CFlex align="center" class="flag-btn">
    <CButton @click="state.isShowModal.value = true" size="sm" variant="link" m="auto">
      Flag
    </CButton>

    <VueFinalModal
      v-if="state.isShowModal.value"
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
        max-w="450px"
        max-h="fit-content"
        m="auto"
        :gap="theme.spaces.md"
        :p="theme.spaces.md"
        direction="column"
        bg="white"
        border-radius="md"
      >
        <CText w="fit-content" mb="-4">
          What would you like to report about "<i>{{ props.job.title }}</i
          >" post?
        </CText>

        <FormKit type="form" submit-label="Send" @submit="submit">
          <FormKit
            name="message"
            placeholder="Outdated? Incorrect? Missing info?"
            validation="required"
            type="textarea"
          />

          <FormKit
            name="email"
            label="Your Email (optional)"
            validation="email"
            placeholder="joe@example.com"
          />
        </FormKit>

        <CAlert v-if="state.isSuccess.value" status="success" border-radius="md">
          <CAlertIcon />
          <CAlertDescription>Submitted, thank you!</CAlertDescription>
        </CAlert>
      </CFlex>
    </VueFinalModal>
  </CFlex> -->
</template>
<!-- 
<style lang="scss">
@import "~/styles/formkit.scss";
</style> -->
