<script setup lang="ts">
import { useFetch, useHead, useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CLink, CText, CSpinner } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { OhVueIcon } from "oh-vue-icons";
import { onMounted, onUpdated, ref, watch } from "vue";
import FlagBtn from "~/components/btn-job-flag.vue";
import JobViewHead from "~/components/job-view-head.vue";
import { useStateVar } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";
import { urls } from "~/constants";

const props = defineProps<{ jobPk: number | string, isVisible: boolean; job?: JobAlgolia; }>();

const state = useStateVar(() => {
  const config = useRuntimeConfig();
  const searchClient = algoliasearch(
    config.public.algoliaApplicationId,
    config.public.algoliaApiKey,
  );
  return {
    config,
    job: ref<JobAlgolia | null>(null),
    isVisible: ref(false),
    searchIndex: searchClient.initIndex(config.public.algoliaJobsIndex),
  }
});

onUpdated(loadJob);

onMounted(loadJob);

async function loadJob() {
  if (props.isVisible && !state.job.value) {
    state.job.value = await state.searchIndex.getObject(props.jobPk as string);
  } else if (props.job) {
    state.job.value = props.job;
  }
}

const space = 6;

interface TagRaw { pk: number; name: string; }
</script>

<template>
  <CFlex align="center" justify="center" :h="state.job.value ? 'initial' : '264px'">
    <CBox v-if="state.job.value" w="100%">
  
      <JobViewHead :job="state.job.value" />

      <CFlex mt="5" justify="space-between" align="baseline">
        <CFlex :gap="space">
  
          <CLink
            :href="state.job.value.url_external"
            is-external
            :_hover="{ textDecoration: 'none !important' }"
            display="flex"
            align-items="center"
          >
            <CButton size="sm" color-scheme="blue" variant="solid">
              Apply
              <OhVueIcon
                name="ri-external-link-line"
                scale="0.7"
                color="white"
                style="margin-left: 5px; margin-top: 1px;"
              />
            </CButton>
          </CLink>
  
          <CFlex align="center">
            <NuxtLink :to="urls.jobs.edit(state.job.value.post_pk)">
              <CButton size="sm" variant="link">
                Edit
              </CButton>
            </NuxtLink>
          </CFlex>

          <FlagBtn :job="state.job.value"/>
        </CFlex>
  
        <CFlex gap="3" align="center">
        </CFlex>
      </CFlex>
      
      <JobComments :job-pk="state.job.value.post_pk" :is-should-load="true"/>
  
    </CBox>
    <CSpinner v-else></CSpinner>
  </CFlex>
</template>
