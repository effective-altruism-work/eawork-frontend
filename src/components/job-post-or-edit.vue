<!-- <script setup lang="ts">
import { useRuntimeConfig } from "#app";
import {
  CBox,
  CFlex,
  CFormLabel,
  CAlert,
  CAlertIcon,
  CAlertDescription,
} from "@chakra-ui/vue-next";
import { FormKitNode } from "@formkit/core";
import { FormKit } from "@formkit/vue";
import algoliasearch from "algoliasearch";
import axios from "axios";
import { onMounted, ref } from "vue";
import "@formkit/themes/genesis";
import TagsInput from "~/components/tags-input.vue";
import { msg } from "~/constants";
import { theme } from "~/styles/theme";
import { useStateVar } from "~/utils/structs";
import { JobAlgolia, Tag, TagTypeName, AlgoliaTagFields, tagTypes } from "~/utils/types";
import NuxtCkeditor from "~/components/nuxt-ckeditor.vue";

const props = defineProps<{ jobPk: string | number }>();

const state = useStateVar(() => {
  const config = useRuntimeConfig();
  const searchClient = algoliasearch(
    config.public.algoliaApplicationId,
    config.public.algoliaApiKey,
  );
  return {
    job: ref<JobAlgolia | null>(null),
    form: {
      title: ref(""),
      email: ref(""),
      company_name: ref(""),
      company_logo_url: ref(""),
      url_external: ref(""),
      description_short: ref(""),
      description: ref(""),
      tags: ref({} as AlgoliaTagFields),
    },
    searchIndex: searchClient.initIndex(config.public.algoliaJobsIndex),
    config: useRuntimeConfig(),
    isSuccess: ref(false),
    isLoaded: ref(false),
  };
});

onMounted(async () => {
  if (props.jobPk) {
    const jobPost: JobAlgolia = await state.searchIndex.getObject(props.jobPk as string);
    state.job.value = jobPost;
    state.form.description.value = jobPost.description;
    state.form.description_short.value = jobPost.description_short;
    state.form.title.value = jobPost.title;
    state.form.company_name.value = jobPost.company_name;
    state.form.company_logo_url.value = jobPost.company_logo_url;
    state.form.url_external.value = jobPost.url_external;
    for (const tagType of tagTypes) {
      state.form.tags.value[tagType] = jobPost[tagType];
    }
  }
  state.isLoaded.value = true;
});

async function postJob(
  data: {
    email: string;
    title: string;
    company_name: string;
    company_logo_url?: string;
    url_external: string;
    description_short: string;
  },
  node: FormKitNode,
) {
  state.isSuccess.value = false;
  try {
    const reqData: any = {
      description: state.form.description.value,
      ...data,
      ...state.form.tags.value,
    };
    if (props.jobPk) {
      reqData.job_post_pk = props.jobPk;
    }
    const res = await axios.post(`${state.config.public.apiBase}/jobs/post`, reqData);
    if (res.data.success === true) {
      state.isSuccess.value = true;
      node.reset();
    } else {
      node.setErrors([msg.error]);
    }
  } catch (e) {
    node.setErrors([msg.error]);
  }
}

function tagsChanged(tagTypeName: TagTypeName, tagsNew: Tag[]) {
  state.form.tags.value[tagTypeName] = tagsNew.map((tag) => tag.text);
}
</script> -->

<template>
  <div>coming soon...</div>
  <!-- <CBox :mb="theme.spaces.md * 4" pt="0.5" v-if="state.isLoaded.value">
    <FormKit
      type="form"
      :submit-label="props.jobPk ? 'Submit Revision' : 'Post'"
      @submit="postJob"
    >
      <FormKit
        v-model="state.form.email.value"
        name="email"
        label="Your Email"
        validation="required|email"
        placeholder="joe@example.com"
        help="Non public, for potential clarifications"
      />
      <CFlex :gap="theme.spaces.md * 2">
        <FormKit
          name="company_name"
          v-model="state.form.company_name.value"
          label="Company name"
          validation="required"
        />
        <FormKit
          name="company_logo_url"
          v-model="state.form.company_logo_url.value"
          label="Company logo URL"
          placeholder="https://img.com/image.jpg"
        />
      </CFlex>
      <FormKit
        v-model="state.form.title.value"
        name="title"
        label="Title"
        validation="required"
      />
      <FormKit
        v-model="state.form.url_external.value"
        name="url_external"
        label="Application form URL"
        validation="required"
        placeholder="https://comapny.com/careers/role"
      />

      <FormKit
        v-model="state.form.description_short.value"
        name="description_short"
        placeholder="Intro for this job's search card"
        label="Intro"
        validation="required"
        type="textarea"
        rows="7"
      />

      <CBox :mt="theme.spaces.md">
        <CFormLabel size="lg" font-weight="normal">Description</CFormLabel>
        <NuxtCkeditor v-model="state.form.description.value" height="lg" />
      </CBox>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          :tags="state.form.tags.value['tags_area']"
          @tags-changed="tagsChanged"
          type-label="Cause areas"
          type-name="tags_area"
        />
        <TagsInput
          :tags="state.form.tags.value['tags_role_type']"
          @tags-changed="tagsChanged"
          type-label="Roles"
          type-name="tags_role_type"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          :tags="state.form.tags.value['tags_skill']"
          type-label="Skills"
          type-name="tags_skill"
          @tags-changed="tagsChanged"
        />
        <TagsInput
          :tags="state.form.tags.value['tags_degree_required']"
          @tags-changed="tagsChanged"
          type-label="Educational requirements"
          type-name="tags_degree_required"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          :tags="state.form.tags.value['tags_workload']"
          @tags-changed="tagsChanged"
          type-label="Workload"
          type-name="tags_workload"
          help-text="Full-time, Contract, Part-time, etc"
        />
        <TagsInput
          :tags="state.form.tags.value['tags_immigration']"
          @tags-changed="tagsChanged"
          type-label="Immigration support"
          type-name="tags_immigration"
          help-text="Complete support, Potential, For US-relaxed countries only, etc"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          :tags="state.form.tags.value['tags_city']"
          @tags-changed="tagsChanged"
          type-label="City"
          type-name="tags_city"
        />
        <TagsInput
          :tags="state.form.tags.value['tags_country']"
          @tags-changed="tagsChanged"
          type-label="Country"
          type-name="tags_country"
        />
      </CFlex>

      <CFlex :gap="theme.spaces.md * 2">
        <TagsInput
          :tags="state.form.tags.value['tags_location_type']"
          @tags-changed="tagsChanged"
          type-label="Work type"
          type-name="tags_location_type"
          help-text="Remote, Remote-friendly, Half-remote, etc"
        />
        <TagsInput
          :tags="state.form.tags.value['tags_generic']"
          @tags-changed="tagsChanged"
          type-label="Generic tags"
          type-name="tags_generic"
          help-text="Anything else you would like your job to be filtering by"
        />
      </CFlex>
    </FormKit>

    <CFlex :gap="theme.spaces.md * 2" justify="flex-end">
      <CFlex w="50%" />
      <CAlert
        v-if="state.isSuccess.value"
        status="success"
        border-radius="md"
        w="50%"
        mt="6"
      >
        <CAlertIcon />
        <CAlertDescription>
          Submitted successfully and will be reviewed within several days.
        </CAlertDescription>
      </CAlert>
    </CFlex>
  </CBox> -->
</template>

<!-- <style lang="scss">
@import "~/styles/formkit.scss";
</style> -->
