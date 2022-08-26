<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";
import {
  CBox,
  CFlex,
  CFormLabel,
  CAlert,
  CAlertIcon,
  CAlertDescription,
} from "@chakra-ui/vue-next";
import { FormKitNode } from "@formkit/core";
import axios from "axios";
import { ref } from "vue";
import "@formkit/themes/genesis";
import TagsInput from "~/components/tags-input.vue";
import { theme } from "~/theme/theme";
import { Tag, TagTypeName } from "~/utils/types";
import NuxtCkeditor from "~/components/nuxt-ckeditor.vue";
import FormHelperText from "~/components/chakra/form-helper-text.vue";

const state = {
  description: ref(""),
  description_short: ref(""),
  tags: ref({} as { [Property in keyof TagTypeName]: string }),
  config: useRuntimeConfig(),
  isSuccess: ref(false),
};

async function postJob(
  data: {
    email: string;
    title: string;
    company_logo_url?: string;
    url_external: string;
  },
  node: FormKitNode,
) {
  state.isSuccess.value = false;
  const errorMsg =
    "An error occurred, our team has been notified. Please try again or contact support at support@eawork.org.";
  try {
    const res = await axios.post(`${state.config.public.apiBase}/jobs/create`, {
      ...data,
      ...state.tags.value,
      description: state.description.value,
      description_short: state.description_short.value,
    });
    if (res.data.success === true) {
      state.isSuccess.value = true;
      node.reset();
    } else {
      node.setErrors([errorMsg]);
    }
  } catch (e) {
    node.setErrors([errorMsg]);
  }
}

function tagsChanged(tagTypeName: TagTypeName, tagsNew: Tag[]) {
  state.tags.value[tagTypeName] = tagsNew.map((tag) => tag.text);
}

useHead({ title: "Post Job" });
</script>

<template>
  <CBox :mb="theme.spaces.md * 10">
    <CAlert status="info" border-radius="md" :mb="theme.spaces.md * 2" bg="gray.500">
      <CAlertIcon />
      <CAlertDescription
        >You post will be reviewed and published within several days.</CAlertDescription
      >
    </CAlert>

    <FormKit type="form" submit-label="Post" @submit="postJob">
      <FormKit
        name="email"
        label="Email"
        validation="required|email"
        placeholder="joe@example.com"
      />
      <CFlex :gap="theme.spaces.md">
        <FormKit name="company_name" label="Company name" validation="required" />
        <FormKit
          name="company_logo_url"
          label="Company logo URL"
          placeholder="https://img.com/image.jpg"
        />
      </CFlex>
      <FormKit name="title" label="Title" validation="required" />
      <FormKit
        name="url_external"
        label="Application form URL"
        validation="required"
        placeholder="https://comapny.com/careers/role"
      />

      <CBox :mt="theme.spaces.md">
        <CFormLabel size="lg" font-weight="normal">Intro</CFormLabel>
        <NuxtCkeditor
          v-model="state.description_short.value"
          :toolbar-items="['bold', 'italic', 'link']"
        />
        <FormHelperText text="Both intro and description will be searchable on the board." />
      </CBox>

      <CBox :mt="theme.spaces.md">
        <CFormLabel size="lg" font-weight="normal">Description</CFormLabel>
        <NuxtCkeditor v-model="state.description.value" />
      </CBox>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          type-label="Cause areas"
          type-name="tags_area"
          @tags-changed="tagsChanged"
        />
        <TagsInput
          type-label="Roles"
          type-name="tags_role_type"
          @tags-changed="tagsChanged"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput type-label="Skills" type-name="tags_skill" @tags-changed="tagsChanged" />
        <TagsInput
          type-label="Educational requirements"
          type-name="tags_degree_required"
          @tags-changed="tagsChanged"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          type-label="Workload"
          type-name="tags_workload"
          @tags-changed="tagsChanged"
          help-text="Full-time, Contract, Part-time, etc"
        />
        <TagsInput
          type-label="Immigration support"
          type-name="tags_immigration"
          @tags-changed="tagsChanged"
          help-text="Complete support, Potential, For US-relaxed countries only, etc"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput type-label="City" type-name="tags_city" @tags-changed="tagsChanged" />
        <TagsInput
          type-label="Country"
          type-name="tags_country"
          @tags-changed="tagsChanged"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          type-label="Work type"
          type-name="tags_location_type"
          @tags-changed="tagsChanged"
          help-text="Remote, Remote-friendly, Half-remote, etc"
        />
        <TagsInput
          type-label="Generic tags"
          type-name="tags_generic"
          @tags-changed="tagsChanged"
          help-text="Anything else you would like your job to be filtering by"
        />
      </CFlex>
    </FormKit>

    <CFlex v-if="state.isSuccess.value" justify-content="flex-end" color="green.500"
      >Submitted successfully!</CFlex
    >
  </CBox>
</template>

<style lang="scss">
@import "~/theme/styles.scss";

.formkit-actions {
  margin-top: var(--space-6);
}

.formkit-outer {
  max-width: 100%;
  width: 100%;

  .formkit-wrapper {
    max-width: 100%;

    .formkit-label {
      @extend .chakra-label;
      padding-bottom: 0;
    }
  }
  .formkit-help {
    @extend .chakra-form-help-text;
  }
  .formkit-inner {
    box-shadow: none;

    .formkit-input {
      @include chakra-input;
    }
  }

  .formkit-input[type="submit"] {
    display: flex;
    justify-self: flex-end;
    margin-left: auto;
    background: var(--colors-blue-500);
    font-size: 1.1rem;
    &:hover {
      background: var(--colors-blue-600);
    }
    &:active {
      background: var(--colors-blue-700);
    }
  }
}

:root {
  --fk-border-radius: var(--radii-md);
}
</style>
