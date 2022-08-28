<script setup lang="ts">
import { useFetch, useHead, useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CLink, CText, CSpinner } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { OhVueIcon } from "oh-vue-icons";
import { onMounted, onUpdated, ref, watch } from "vue";
import FlagBtn from "~/components/btn-job-flag.vue";
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
    <CBox display="block" v-if="state.job.value">
  
      <CBox display="block">
        <CFlex>
          <CLink :href="state.job.value.company_url">
            <chakra.img
              v-if="state.job.value.company_logo_url"
              :src="state.job.value.company_logo_url"
              w="56px"
              h="56px"
              bg="gray.200"
              border="1px solid #E2E8F0"
            />
          </CLink>
  
          <CFlex
            :ml="state.job.value.company_logo_url ? 3 : 0"
            mt="1"
            mb="1"
            justiy="space-between"
            direction="column"
          >
            <CText font-size="lg" font-weight="bold" line-height="1">
              {{state.job.value.title}}
            </CText>
  
            <CFlex mt="5px" gap="3" align="center" display="flex">
              <CText>{{state.job.value.company_name}}</CText>
              <CBox v-if="state.job.value.tags_city[0]" w="3px" h="3px" mt="2px" bg="gray.300" />
              <CText v-if="state.job.value.tags_city[0]">{{ state.job.value.tags_city[0] }}</CText>
            </CFlex>
          </CFlex>
        </CFlex>
  
        <CBox :mt="space / 2">
          {{ state.job.value.description_short }}<span v-if="state.job.value.id_external_80_000_hours"> [...]</span>
        </CBox>
  
        <CBox v-if="state.job.value.description" :mt="space / 2" v-html="state.job.value.description"/>
      </CBox>
  
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
            <NuxtLink :to="urls.jobs.edit(props.job.post_pk)">
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
  
    </CBox>
    <CSpinner v-else></CSpinner>
  </CFlex>
</template>
