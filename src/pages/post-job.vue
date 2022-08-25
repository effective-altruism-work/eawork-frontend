<script setup lang="ts">
import { CInput, CBox, CFlex } from "@chakra-ui/vue-next";
import { createInput } from "@formkit/vue";
import { ref } from "vue";
import "@formkit/themes/genesis";
import TagsInput from "~/components/tags-input.vue";
import { theme } from "~/theme/theme";
import { Tag, TagTypeName } from "~/utils/types";
import NuxtCkeditor from "~/components/nuxt-ckeditor";

const FormkitCInput = createInput(CInput);

const state = {
  email: ref(""),
  tags: ref({} as { [Property in keyof TagTypeName]: Tag[] }),
};

async function postJob(data: { email: string }) {}

function tagsChanged(tagTypeName: TagTypeName, tagsNew: Tag[]) {
  state.tags.value[tagTypeName] = tagsNew;
}
</script>

<template>
  <CBox>
    <FormKit type="form" submit-label="Save" @submit="postJob">
      <FormKit name="email" label="Email" validation="required|email" />
      <FormKit name="title" label="Title" validation="required" />
      <FormKit
        name="short_description"
        label="Intro"
        validation="required"
        type="textarea"
        help="Both intro and description will be searchable on the board."
      />

      <NuxtCkeditor />

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          type-label="Role"
          type-name="tags_role_type"
          @tags-changed="tagsChanged"
        />

        <TagsInput type-label="City" type-name="tags_city" @tags-changed="tagsChanged" />
      </CFlex>
    </FormKit>
  </CBox>
</template>
