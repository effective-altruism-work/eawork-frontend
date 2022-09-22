<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";
import { CFlex, CHeading, CButton, CVStack, CLink, CSpacer, CBox, CText } from "@chakra-ui/vue-next";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import algoliasearch from "algoliasearch";
import { subDays, startOfYear, getUnixTime, endOfYear, addDays } from "date-fns";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import CurrentRefinements from "~/components/aloglia/current-refinements.vue";
import Refinements from "~/components/aloglia/refinements.vue";
import Filters from "~/components/aloglia/refinements.vue";
import BtnJobsAlert from "~/components/btn-jobs-alert.vue";
import SearchBox from "~/components/aloglia/search-box.vue";
import FiltersFooter from "~/components/eightyk/filters-footer.vue";
import JobCardSkeleton from "~/components/job-card-skeleton.vue";
import JobCard from "~/components/job-card.vue";
import { history } from "instantsearch.js/es/lib/routers";
import { IndexUiState } from "instantsearch.js/es/types/ui-state";
import { useComp, useHooks, useStateVar } from "~/utils/structs";
import { tracking } from "~/utils/tracking";
import { JobAlgolia } from "~/utils/types";
import { OhVueIcon } from "oh-vue-icons";


const hooks = useHooks(() => {
  const config = useRuntimeConfig();
  return {
    breakpoints: useBreakpoints(breakpointsTailwind),
    config,
    searchClient: algoliasearch(
      config.public.algoliaApplicationId,
      config.public.algoliaApiKey,
    ),
  };
});

const state = {
  searchIndex: hooks.searchClient.initIndex(hooks.config.public.algoliaJobsIndex),
  queryJson: ref<null | { query: string; facetFilters: string[]; }>(null),
  jobPkCurrent: ref<number | null>(null),
  jobFromUrlQuery: ref<JobAlgolia | null>(null),
  isShowMobileFilters: ref(false),
};

const comp = useComp(() => {
  return {
    cardW: { base: "100%", lg: "70%", xl: "74%" },
    filtersW: { base: 0, lg: "30%", xl: "26%" },
    filtersDisplay: { base: "none", lg: "flex" },
    space: 6,
  }
});

onBeforeMount(async () => {
  await tracking.init(hooks.config.public.segmentId);
});

onMounted(async () => {
  const url = new URL(window.location as any);
  const jobPkCurrent = url.searchParams.get("jobPk");
  if (jobPkCurrent) {
    state.jobPkCurrent.value = Number(jobPkCurrent);
    state.jobFromUrlQuery.value = await state.searchIndex.getObject(jobPkCurrent);
  }
});

watch(state.jobPkCurrent, (jobPkCurrentNew: number | null) => {
  const url = new URL(window.location as any);
  if (jobPkCurrentNew) {
    url.searchParams.set("jobPk", jobPkCurrentNew as any);
    window.history.pushState({}, "", url);
  } else {
    url.searchParams.delete("jobPk");
    window.history.pushState({}, "", url);
  }
});

useHead({
  title: "Job board",
  meta: [
    {
      "og:title": "80,000 Hours Job Board",
      "og:description": "A curated list of the most promising vacancies we're aware of. If you’re a good fit for one of these, it could be your best opportunity to help solve one of the world’s most pressing problems.",
      "og:image": "https://80000hours.org/wp-content/uploads/2017/03/job_board_share_logos3.png",
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:url": "https://jobs.80000hours.org/",
      "og:site_name": "80,000 Hours",
      "article:publisher": "https://www.facebook.com/80000Hours",
      "twitter:card": "summary_large_image",
      "twitter:description": "If you’re a good fit for one of these roles, it could be your best opportunity to help solve one of the world’s most pressing problems.",
      "twitter:site": "@80000hours",
    },
  ],
});

function searchFunction(helper) {
  saveQueryJson(helper.state);
  helper.search();
}

function saveQueryJson(uiState: {
  query: string;
  disjunctiveFacetsRefinements: Map<string, string[]>;
}) {
  const queryString = uiState.query;
  const facetsRaw: Map<string, string[]> = uiState.disjunctiveFacetsRefinements;
  const facetFilters: string[] = [];
  for (const [facetName, facetValueArr] of Object.entries(facetsRaw)) {
    for (const facetValue of facetValueArr) {
      facetFilters.push(`${facetName}:${facetValue}`);
    }
  }
  const isQuerySpecified = queryString || facetFilters.length;
  if (isQuerySpecified) {
    state.queryJson.value = {
      query: queryString,
      facetFilters: facetFilters,
    };
  } else {
    state.queryJson.value = null;
  }
}

interface RouteState {
  query: string;
  refinementList: { [key: string]: string[] };
  jobPk: string;
}
</script>

<template>
  <CBox>

    <CVStack :mt="[8, null, null, 14]" :mb="[6, null, null, 14]" :gap="[4, null, null, 3]">
      <CFlex justify="space-between" align="center">
        <CHeading
          line-height="0.8"
          :font-size="['2.7rem', null, null, '5xl']"
          font-family="Open Sans"
        >
          Jobs
        </CHeading>

        <CButton
          v-if="hooks.breakpoints.isSmaller('lg')"
          size="lg"
          @click="state.isShowMobileFilters.value = true"
        >
          <OhVueIcon
            name="md-filterlist-round"
            scale="1.1"
            style="margin-bottom: 1px"
          />
          <chakra.span ml="2">Filters</chakra.span>
        </CButton>

      </CFlex>
      <CText font-size="lg">Handpicked to help you tackle the world’s most pressing problems with your career.</CText>
    </CVStack>

    <CFlex gap="7" :mt="{ lg: -2 }" :mb="{ base: 8, lg: 6 }">
      <CLink
        href="https://80000hours.org/job-board/top-orgs/"
        text-decoration="underline"
        color="gray.400"
      >
        <OhVueIcon
          name="md-starrate-round"
          scale="1.1"
          style="margin-bottom: 1px"
        />
        <chakra.span ml="1">Top recommended organisations</chakra.span>
      </CLink>
      <CLink
        href="https://80000hours.org/job-board/faq/"
        text-decoration="underline"
        color="gray.400"
      >
        <OhVueIcon
          name="bi-question-circle-fill"
          scale="1"
          style="margin-right: 4px"
        />
        <chakra.span ml="px">FAQ</chakra.span>
      </CLink>
    </CFlex>


    <AisInstantSearch
      show-loading-indicator
      :routing="{
        router: history(),
        stateMapping: {
          stateToRoute(uiState: { [indexId: string]: IndexUiState }): RouteState {
            const indexUiState: IndexUiState = uiState[hooks.config.public.algoliaJobsIndex];
            return {
              query: indexUiState.query,
              refinementList: indexUiState.refinementList,
              ...(state.jobPkCurrent.value ? { jobPk: state.jobPkCurrent.value } : {}),
            };
          },
          routeToState(routeState: RouteState): { [indexId: string]: IndexUiState } {
            if (routeState.jobPk) {
              state.jobPkCurrent.value = routeState.jobPk;
            }
            return {
              [hooks.config.public.algoliaJobsIndex]: {
                query: routeState.query,
                refinementList: routeState.refinementList,
              },
            };
          },
        },
      }"
      :search-client="hooks.searchClient"
      :search-function="searchFunction"
      :index-name="hooks.config.public.algoliaJobsIndex"
    >
      <CFlex :mb="comp.space * 4">

        <CFlex direction="column" :min-w="comp.cardW">
          <CFlex justify="flex-end" :gap="comp.space">
            <!--<NuxtLink :to="urls.jobs.post">-->
            <!--  <CButton color-scheme="blue" variant="outline">-->
            <!--    <OhVueIcon name="hi-solid-plus" scale="1" color="var(&#45;&#45;colors-blue-600)" />-->
            <!--    <CText ml="2">Post Job</CText>-->
            <!--  </CButton>-->
            <!--</NuxtLink>-->
          </CFlex>

          <CBox>
            <CBox min-h="100vh">
              <AisInfiniteHits>
                <template
                  v-slot="{
                    items,
                    refinePrevious,
                    refineNext,
                    isLastPage,
                    sendEvent,
                 }"
                >
                  <JobCard
                    v-if="state.jobFromUrlQuery.value"
                    :job="state.jobFromUrlQuery.value"
                    :is-expanded="true"
                    :is-missing-algolia-context="true"
                    @card-expanded="state.jobPkCurrent.value = state.jobFromUrlQuery.value?.post_pk"
                    @card-collapsed="() => {
                      if (Number(state.jobPkCurrent.value) === state.jobFromUrlQuery.value?.post_pk) {
                        state.jobPkCurrent.value = null;                        
                      }
                    }"
                  />
                  <JobCard
                    v-for="job in items"
                    :job="job"
                    :is-hidden="job.post_pk === state.jobFromUrlQuery?.value?.post_pk"
                    :is-has-text-query="Boolean(state.queryJson.value?.query)"
                    :key="job.post_pk"
                    @card-expanded="state.jobPkCurrent.value = job.post_pk"
                    @card-collapsed="() => {
                      if (state.jobPkCurrent.value === job.post_pk) {
                        state.jobPkCurrent.value = null;                        
                      }
                    }"
                  />
                  
                  <CBox v-if="!isLastPage">
                    <JobCardSkeleton v-observe-visibility="{
                      callback: (isVisible: boolean) => {
                        if (isVisible && !isLastPage) {
                          refineNext();
                        }
                      },
                    }"/>
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                  </CBox>

                </template>
              </AisInfiniteHits>
            </CBox>
          </CBox>

        </CFlex>

        <CFlex
          v-if="hooks.breakpoints.isGreaterOrEqual('lg')"
          :display="comp.filtersDisplay"
          direction="column"
          :min-w="comp.filtersW"
          :max-w="comp.filtersW"
          pl="10"
          position="sticky"
        >
          <SearchBox :is-show-results-count="true" />
          <CurrentRefinements />
          <CBox mb="7">
            <BtnJobsAlert :query-json="state.queryJson.value" />
          </CBox>
          <Refinements />
          <FiltersFooter />
        </CFlex>
        
        <VueFinalModal
          v-else
          v-model="state.isShowMobileFilters.value"
          :click-to-close="true"
          :esc-to-close="true"
        >
          <CFlex
            pos="absolute"
            left="0"
            bottom="0"
            w="100vw"
            h="94vh"
            gap="6"
            p="6"
            pt="7"
            direction="column"
            bg="white"
            border-radius="12px"
            border-bottom-radius="0"
            overflow="scroll"
          >
            <CFlex justify="space-between" align="center" my="-1">
              <CHeading size="lg" line-height="none">Filters</CHeading>
              <CButton
                @click="state.isShowMobileFilters.value = false"
                size="sm"
                color-scheme="gray"
                border-radius="full"
                color="blue.500"
                bg="#F4F6F7"
              >
                <OhVueIcon
                  name="io-close"
                  scale="1"
                  style="position: absolute"
                />
              </CButton>
            </CFlex>

            <SearchBox :is-show-results-count="true" />
            <CBox mt="3">
              <CurrentRefinements />
            </CBox>
            <CBox mb="7">
              <BtnJobsAlert :query-json="state.queryJson.value" />
            </CBox>
            <Refinements />
            <FiltersFooter />

            <CSpacer mt="12" />
            <CFlex
              pos="fixed"
              bottom="0"
              left="0"
              w="100vw"
              h="fit-content"
              p="4"
              px="6"
              justify="center"
              bg="#F4F6F7"
            >
              <CButton
                @click="state.isShowMobileFilters.value = false"
                font-weight="normal"
              >
                <chakra.span mr="2">SHOW RESULTS:</chakra.span>
                <AisStats>
                  <template v-slot="{ nbHits }">{{ nbHits }}</template>
                </AisStats>
              </CButton>
            </CFlex>
      
          </CFlex>
        </VueFinalModal>

      </CFlex>
    </AisInstantSearch>
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";

html, html.dark {
  background: #F4F6F7;
}
</style>
