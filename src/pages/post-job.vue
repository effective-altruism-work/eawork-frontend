<script setup lang="ts">
import {
  CBox,
  CFlex,
  CFormLabel,
  CAlert,
  CAlertIcon,
  CAlertDescription,
} from "@chakra-ui/vue-next";
import { ref } from "vue";
import "@formkit/themes/genesis";
import FormHelperText from "~/components/form-helper-text.vue";
import TagsInput from "~/components/tags-input.vue";
import { theme } from "~/theme/theme";
import { Tag, TagTypeName } from "~/utils/types";
import NuxtCkeditor from "~/components/nuxt-ckeditor";

const state = {
  email: ref(""),
  description: ref(""),
  description_short: ref(""),
  tags: ref({} as { [Property in keyof TagTypeName]: Tag[] }),
};

async function postJob(data: { email: string; title: string }) {}

function tagsChanged(tagTypeName: TagTypeName, tagsNew: Tag[]) {
  state.tags.value[tagTypeName] = tagsNew;
}
</script>

<template>
  <CBox :mb="theme.spaces.md * 10">
    <CAlert status="info" border-radius="md" :mb="theme.spaces.md * 2" bg="gray.500">
      <CAlertIcon />
      <CAlertDescription
        >You changes will be reviewed and published within several days.</CAlertDescription
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
          validation="required|url"
          placeholder="https://img.com/image.jpg"
        />
      </CFlex>
      <FormKit name="title" label="Title" validation="required" />
      <FormKit
        name="url_external"
        label="Application form URL"
        validation="required|url"
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
          help-text="Full, Possible, For US-relaxed countries only, etc"
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
      @extend .chakra-input;
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
