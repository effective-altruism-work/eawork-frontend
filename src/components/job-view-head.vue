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
import { formatDistance } from "date-fns";

const props = defineProps<{ job: JobAlgolia; }>();

const space = 6;

</script>

<template>
  <CBox>

    <CFlex>
      <CLink :href="props.job.company_url">
        <chakra.img
          :src="props.job.company_logo_url"
          w="80px"
          max-w="fit-content"
          h="80px"
          bg="white"
          border="1px solid #E2E8F0"
        />
      </CLink>

      <CFlex
        :ml="props.job.company_logo_url ? 3 : 0"
        w="100%"
        justify="space-between"
        direction="column"
      >
        <CFlex justify="space-between" pos="relative">
          <CText font-size="20px" font-weight="bold" line-height="1.1">
            {{props.job.title}}
          </CText>

<!--          <CButton-->
<!--            variant="outline"-->
<!--            size="xs"-->
<!--            ml="6"-->
<!--            h="5"-->
<!--            gap="1"-->
<!--            align="center"-->
<!--            justify="center"-->
<!--            color-scheme="gray"-->
<!--          >-->
<!--            <CBox w="4px" h="4px" bg="gray.400" />-->
<!--            <CBox w="4px" h="4px" bg="gray.400" />-->
<!--            <CBox w="4px" h="4px" bg="gray.400" />-->
<!--          </CButton>-->

          <CFlex
            direction="column"
            gap="2"
            align="flex-end"
            pos="absolute"
            right="0"
            top="0"
          >

            <CText color="gray.500" font-size="sm">
              {{
                formatDistance(new Date(props.job.posted_at * 1000), new Date(), {
                  addSuffix: true,
                })
              }}
            </CText>

            <CText v-if="props.job.closes_at" color="gray.500" font-size="sm">
              Closes
              {{
                formatDistance(new Date(props.job.closes_at * 1000), new Date(), {
                  addSuffix: true,
                })
              }}
            </CText>

          </CFlex>
        </CFlex>

        <CText mt="1px" color="blue.500">{{props.job.company_name}}</CText>
        
        <CFlex gap="2" align="center" display="flex">

          <CBox mx="-2px" my="-2px">
            <svg
              aria-hidden="true"
              width="17.28"
              height="17.28"
              viewBox="0 0 512 512"
            >
              <path
                stroke="var(--colors-gray-500)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
              />
              <circle
                cx="256"
                cy="192"
                r="48"
                fill="none"
                stroke="var(--colors-gray-500)"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
          </CBox>
          
          <CText v-if="props.job.tags_city[0]">{{ props.job.tags_city[0] }}</CText>
          <CBox v-if="false" w="3px" h="3px" mt="2px" bg="gray.300" />
        </CFlex>
      </CFlex>
    </CFlex>
    
    <CFlex w="100%" gap="3" mt="3" wrap="wrap">
      <CFlex
        v-for="area in job.tags_area"
        :key="area"
        direction="column"
        gap="3"
        bg="#f1faef"
        px="2"
      >
        <CText color="#386f2c">{{ area }}</CText>
      </CFlex>

      <CFlex
        v-for="workload in job.tags_workload"
        :key="workload"
        direction="column"
        gap="3"
        bg="#fbf6ed"
        px="2"
      >
        <CText color="#98702e">{{ workload }}</CText>
      </CFlex>

      <CFlex
        v-for="exp in job.tags_exp_required"
        :key="exp"
        direction="column"
        gap="3"
        bg="#edf1ff"
        px="2"
      >
        <CText color="#1d2c5b">{{ exp }}</CText>
      </CFlex>

      <CFlex
        v-for="location in job.tags_location_type"
        :key="location"
        direction="column"
        gap="3"
        bg="#E8F8F4"
        px="2"
      >
        <CText color="#0E6D6F">{{ location }}</CText>
      </CFlex>

    </CFlex>

    <CFlex mt="0">
      <JobSkills :job="props.job"/>
    </CFlex>
    
    <CBox v-if="props.job.description" :mt="space / 2" v-html="props.job.description"/>
  
  </CBox>
</template>
