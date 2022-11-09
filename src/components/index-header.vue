<script setup lang="ts">
import {
  chakra,
  CFlex,
  CHeading,
  CButton,
  CVStack,
  CLink,
  CBox,
  CText,
} from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { breakpointsChakra } from "../constants";
import CurrentRefinements from "./algolia/current-refinements.vue";
import EightyKLink from "~/components/eightyk/eightyk-link.vue";

const breakpoints = useBreakpoints(breakpointsChakra);

const props = defineProps<{ filterCount: number }>();
const emit = defineEmits(["showMobile"]);
</script>

<template>
  <CBox>
    <CVStack :mt="[8, null, null, 14]" :mb="[6, null, null, 14]" :gap="[4, null, null, 3]">
      <CFlex justify="space-between" align="center">
        <CHeading line-height="0.8" :font-size="['2.7rem', null, null, '5xl']">
          Jobs
        </CHeading>
      </CFlex>
      <CText font-size="lg"
        >Handpicked to help you tackle the
        <EightykLink path="/problem-profiles/"> world’s most pressing problems </EightykLink>
        with your career.
      </CText>
    </CVStack>

    <CFlex
      gap="7"
      :mt="{ lg: -2 }"
      :mb="{ base: 8, lg: 6 }"
      :font-size="{ base: 'sm', md: 'md' }"
      align="center"
    >
      <EightyKLink
        display="flex"
        align-items="center"
        path="/job-board/top-orgs/"
        text-decoration="underline"
        color="gray.400"
      >
        <OhVueIcon name="md-starrate-round" scale="1.1" style="margin-bottom: 1px" />
        <chakra.span ml="1">Top recommended organisations</chakra.span>
      </EightyKLink>
      <EightyKLink
        display="flex"
        align-items="center"
        path="/job-board/faq/"
        text-decoration="underline"
        color="gray.400"
      >
        <OhVueIcon name="bi-question-circle-fill" scale="1" style="margin-right: 4px" />
        <chakra.span ml="px">FAQ</chakra.span>
      </EightyKLink>
    </CFlex>
    <CFlex v-if="breakpoints.smaller('lg').value" justify-content="center" mb="4">
      <CButton width="100%" @click="emit('showMobile')">
        <OhVueIcon name="md-filterlist-round" scale="1.1" style="margin-bottom: 1px" />
        <chakra.span ml="2">Filters and alerts</chakra.span>
      </CButton>
    </CFlex>
    <!-- <AisInstantSearch
      show-loading-indicator
      :routing="routing"
      :search-client="hooks.searchClient"
      :search-function="searchFunction"
      :index-name="hooks.config.public.algoliaJobsIndex"
    >
      <CurrentRefinements v-if="breakpoints.smaller('lg').value" />
    </AisInstantSearch> -->
  </CBox>
</template>
