<script setup lang="ts">
import { CInput, CBox } from "@chakra-ui/vue-next";
import { createInput } from "@formkit/vue";
import { ref } from "vue";
import "@formkit/themes/genesis";
import TagsInput from "~/components/tags-input.vue";
import { Tag, TagTypeName } from "~/utils/types";

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

      <TagsInput type-label="Role" type-name="tags_role_type" @tags-changed="tagsChanged" />

      <TagsInput type-label="City" type-name="tags_city" @tags-changed="tagsChanged" />
    </FormKit>
  </CBox>
</template>
