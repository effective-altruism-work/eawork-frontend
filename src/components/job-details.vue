<script setup lang="ts">
import { useFetch, useHead, useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CLink, CText, CSpinner } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";

const props = defineProps<{ jobPk: number | string }>();
const space = 6;

const config = useRuntimeConfig();
const jobPostVersionRes = useFetch(`${config.public.apiBase}/jobs/${props.jobPk}`);
const job: Job = jobPostVersionRes.data;

useHead({ title: job.title });

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
  <CFlex align="center" justify="center" :h="job ? 'initial' : '312px'">
    <CBox display="block" v-if="job">
  
      <CBox display="block">
        <CFlex>
          <CLink :href="job.post.company.url">
            <chakra.img
              v-if="job.post.company.logo_url"
              :src="job.post.company.logo_url"
              w="56px"
              h="56px"
              bg="gray.200"
              border="1px solid #E2E8F0"
            />
          </CLink>
  
          <CFlex
            :ml="job.post.company.logo_url ? 3 : 0"
            mt="1"
            mb="1"
            justiy="space-between"
            direction="column"
          >
            <CText font-size="lg" font-weight="bold" line-height="1">
              {{job.title}}
            </CText>
  
            <CFlex mt="5px" gap="3" align="center" display="flex">
              <CText>{{job.post.company.name}}</CText>
              <CBox v-if="job.tags_city[0]" w="3px" h="3px" mt="2px" bg="gray.300" />
              <CText v-if="job.tags_city[0]">{{ job.tags_city[0].name }}</CText>
            </CFlex>
          </CFlex>
        </CFlex>
  
        <CBox :mt="space / 2">
          {{ job.description_short }}
        </CBox>
  
        <CBox v-if="job.description" :mt="space / 2" v-html="job.description"/>
      </CBox>
  
      <CFlex mt="5" justify="space-between" align="baseline">
        <CFlex :gap="space">
  
          <CLink
            :href="job.url_external"
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
