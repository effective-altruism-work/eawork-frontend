<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CText } from "@chakra-ui/vue-next";
import { formatDistance } from "date-fns";

const props = defineProps<{ job: Job }>();

const space = 6;

interface Job {
  objectID: string;
  title: string;
  location: string;
  description: string;
  url_external: string;
  tags_city: string[];

  created_at: number;

  company_logo_url: string;
  company_name: string;
  company_url: string;
}
</script>

<template>
  <CBox mb="12" :key="job.objectID" display="block">
    <CBox display="block">
      <CFlex>
        <CLink :href="job.company_url">
          <chakra.img
            :src="job.company_logo_url"
            max-w="60px"
            max-h="60px"
            bg="gray.200"
            border="1px solid #E2E8F0"
          />
        </CLink>

        <CFlex ml="3" mt="1" mb="1" justiy="space-between" direction="column">
          <CText font-size="lg" font-weight="bold" line-height="1">
            <ais-snippet :hit="job" attribute="title" />
          </CText>

          <CFlex mt="5px" gap="3" align="center" display="flex">
            <CText><ais-snippet :hit="job" attribute="company_name" /></CText>
            <CBox w="3px" h="3px" mt="2px" bg="gray.300" />
            <CText v-if="job.tags_city[0]">{{ job.tags_city[0] }}</CText>
          </CFlex>
        </CFlex>
      </CFlex>

      <CBox :mt="space / 2">
        <ais-snippet :hit="job" attribute="description" />
      </CBox>
    </CBox>

    <CFlex mt="3" justify="space-between" align="baseline">
      <CFlex :gap="space">
        <CLink :href="job.url_external" target="_blank">
          <CButton size="sm" right-icon="arrow-up" color-scheme="blue" variant="outline"
            >Open</CButton
          >
        </CLink>

        <CButton size="sm" variant="link">Claim</CButton>
        <CButton size="sm" variant="link">Flag</CButton>
      </CFlex>

      <CFlex gap="3" align="center">
        <CText v-if="props.job.closes_at" mt="1" color="gray.500" font-size="sm"
          >Closes
          {{
            formatDistance(new Date(props.job.closes_at * 1000), new Date(), {
              addSuffix: true,
            })
          }}</CText
        >
        <CBox v-if="props.job.closes_at" w="3px" h="3px" mt="5px" bg="gray.300" />
        <CText mt="1" color="gray.500" font-size="sm"
          >Posted
          {{
            formatDistance(new Date(props.job.posted_at * 1000), new Date(), {
              addSuffix: true,
            })
          }}</CText
        >
      </CFlex>
    </CFlex>
  </CBox>
</template>
