<script lang="ts" setup>
import { useRuntimeConfig, useState } from "#app";
import { CHeading, CFlex, CBox, CButton, CLink, CInput, CText, chakra } from "@chakra-ui/vue-next";
import { FormKitNode } from "@formkit/core";
import { captureEvent } from "@sentry/hub";
import axios from "axios";
import { onMounted, onUpdated, ref } from "vue";
import NuxtCkeditor from "~/components/nuxt-ckeditor.vue";
import { msg } from "~/constants";

const props = defineProps<{ jobPk: number | string; commentParentPk?: number; isCancelBtnVisible?: boolean; }>();

const emit = defineEmits<{
  (event: "commentPosted"): void;
  (event: "cancelClicked"): void;
}>();

const state = {
  replyContent: ref(""),
  config: useRuntimeConfig(),
}

async function submitComment(data: { email: string; first_name: string }, node: FormKitNode) {
  node.setErrors([]);
  try {
    const res = await axios.post(`${state.config.public.apiBase}/comments/`, {
      author: data,
      content: state.replyContent.value,
      post: props.jobPk,
      parent: props.commentParentPk ?? null,
    });
    node.reset();
    emit("commentPosted");
  } catch (error) {
    node.setErrors([msg.error]);
    captureEvent(error);
  }
}

</script>

<template>
  <CBox class="comment comment-form">
    <FormKit type="form" :actions="false" @submit="submitComment">
      <CFlex gap="3">
        <FormKit
          name="email"
          validation="required|email"
          placeholder="joe@example.com"
        />
        <FormKit
          name="first_name"
          validation="required"
          placeholder="Joe"
        />
      </CFlex>
      <NuxtCkeditor v-model="state.replyContent.value" />
      
      <CFlex justify="flex-start" mt="3" gap="3">
        <FormKit
          type="submit"
          label="Send"
          size="sm"
        />
        <CButton
          v-if="props.isCancelBtnVisible"
          @click="emit('cancelClicked')"
          variant="outline"
          size="sm"
        >
          Cancel
        </CButton>
      </CFlex>
    </FormKit>

  </CBox>
</template>

<style lang="scss">
.comment {

  .formkit-outer {
    width: fit-content;
    margin-bottom: var(--space-3);

    .formkit-input[type='submit'] {
      display: flex;
      margin-right: auto;
      margin-left: 0;
      margin-bottom: var(--space-6);
    }
  }
}
</style>
