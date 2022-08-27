<script setup lang="ts">
import { useFetch, useHead, useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CLink, CText, CSpinner } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { onMounted, onUpdated, ref, watch } from "vue";
import axios from "axios";

const props = defineProps<{ jobPk: number | string, isVisible: boolean; }>();

const state = {
  job: ref<Job | null>(null),
  isVisible: ref(false),
  config: useRuntimeConfig(),
};

onUpdated(loadJob);

onMounted(loadJob);

async function loadJob() {
  if (props.isVisible && !state.job.value) {
    const jobPostVersionRes = await axios.get(`${state.config.public.apiBase}/jobs/${props.jobPk}`);
    state.job.value = jobPostVersionRes.data;
  }
}

const space = 6;

interface Job {
  title: string;
  description_short: string;
  description: string;
  url_external: string;

  created_at: string;
  posted_at: string;
  closes_at: string | null;
  experience_min: number | null;
  experience_avg: number | null;
  salary_min: number | null;
  salary_max: number | null;
  
  post: {
    company: {
      name: string;
      logo_url: string | null;
      url: string;
      created_at: string;
      updated_at: string;
    };
  };
  
  tags_area: TagRaw[];
  tags_degree_required: TagRaw[];
  tags_country: TagRaw[];
  tags_city: TagRaw[];
  tags_role_type: TagRaw[];
  tags_location_type: TagRaw[];
  tags_skill: TagRaw[];
}

interface TagRaw { pk: number; name: string; }
</script>

<template>
  <CFlex align="center" justify="center" :h="state.job.value ? 'initial' : '312px'">
    <CBox display="block" v-if="state.job.value">
  
      <CBox display="block">
        <CFlex>
          <CLink :href="state.job.value.post.company.url">
            <chakra.img
              v-if="state.job.value.post.company.logo_url"
              :src="state.job.value.post.company.logo_url"
              w="56px"
              h="56px"
              bg="gray.200"
              border="1px solid #E2E8F0"
            />
          </CLink>
  
          <CFlex
            :ml="state.job.value.post.company.logo_url ? 3 : 0"
            mt="1"
            mb="1"
            justiy="space-between"
            direction="column"
          >
            <CText font-size="lg" font-weight="bold" line-height="1">
              {{state.job.value.title}}
            </CText>
  
            <CFlex mt="5px" gap="3" align="center" display="flex">
              <CText>{{state.job.value.post.company.name}}</CText>
              <CBox v-if="state.job.value.tags_city[0]" w="3px" h="3px" mt="2px" bg="gray.300" />
              <CText v-if="state.job.value.tags_city[0]">{{ state.job.value.tags_city[0].name }}</CText>
            </CFlex>
          </CFlex>
        </CFlex>
  
        <CBox :mt="space / 2">
          {{ state.job.value.description_short }}
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
  
          <CButton size="sm" variant="link">Edit</CButton>
          <CButton size="sm" variant="link">Flag</CButton>
        </CFlex>
  
        <CFlex gap="3" align="center">
        </CFlex>
      </CFlex>
  
    </CBox>
    <CSpinner v-else></CSpinner>
  </CFlex>
</template>
