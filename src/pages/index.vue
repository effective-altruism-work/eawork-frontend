<script setup lang="ts">
import { useHead, useRuntimeConfig, useRoute, useRouter } from "#app";
import { chakra, CFlex, CVStack, CLink, CBox, CText } from "@chakra-ui/vue-next";
import { useBreakpoints } from "@vueuse/core";
import algoliasearch from "algoliasearch";
import { onBeforeMount, onMounted, ref, watch, onBeforeUnmount } from "vue";
import CurrentRefinements from "~/components/aloglia/current-refinements.vue";
import Refinements from "~/components/aloglia/refinements.vue";
import BtnJobsAlert from "~/components/btn-jobs-alert.vue";
import SearchBox from "~/components/aloglia/search-box.vue";
import FiltersFooter from "~/components/eightyk/filters-footer.vue";
import JobCardSkeleton from "~/components/job-card-skeleton.vue";
import JobCard from "~/components/job-card.vue";
import { history } from "instantsearch.js/es/lib/routers";
import { useComp, useHooks } from "~/utils/structs";
import { tracking } from "~/utils/tracking";
import queryToJson from "~/utils/queryToJson";
import { JobAlgolia } from "~/utils/types";
import riveted from "~/utils/riveted";
import { breakpointsChakra } from "../constants";

const hooks = useHooks(() => {
  const config = useRuntimeConfig();
  return {
    breakpoints: useBreakpoints(breakpointsChakra),
    config,
    searchClient: algoliasearch(
      config.public.algoliaApplicationId,
      config.public.algoliaApiKey,
    ),
  };
});

const state = {
  searchIndex: hooks.searchClient.initIndex(hooks.config.public.algoliaJobsIndex),
  queryJson: ref<null | { query: string; facetFilters: string[][] }>(null),
  jobPkCurrent: ref<number | null>(null),
  jobFromUrlQuery: ref<JobAlgolia | null>(null),
  otherParams: ref(null),
  isShowMobileFilters: ref(false),
};

const comp = useComp(() => ({
  cardW: { base: "100%", lg: "70%", xl: "74%" },
  filtersW: { base: 0, lg: "30%", xl: "26%" },
  filtersDisplay: { base: "none", lg: "flex" },
  space: 6,
}));

async function loadJobIfSpecified() {
  const url = new URL(window.location as any);
  const jobPkCurrent = url.searchParams.get("jobPk");
  if (jobPkCurrent) {
    state.jobPkCurrent.value = Number(jobPkCurrent);
    state.jobFromUrlQuery.value = await state.searchIndex.getObject(jobPkCurrent);
  }
}

function pageTrack() {
  const url = new URL(window.location.href);

  const source = url.searchParams.get("utm_source");
  const campaign = url.searchParams.get("utm_campaign");
  tracking.page("Home", { source, campaign });
}

onBeforeMount(async () => {
  const url = new URL(window.location.href);
  const params: { [key: string]: any } = {};
  for (const [key, val] of url.searchParams.entries()) {
    if (key.includes("refinement") || key.includes("query")) continue;
    params[key] = val;
  }

  state.otherParams = params;

  await tracking.init(hooks.config.public.segmentId);

  pageTrack();
});

onMounted(async () => {
  await loadJobIfSpecified();
});

// track page-stays
onMounted(() => {
  riveted();
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
});

function searchFunction(helper: {
  search: () => void;
  state: {
    query: string;
    disjunctiveFacetsRefinements: Map<string, string[]>;
    numericRefinements: {
      company_is_recommended_org: any;
    };
  };
}) {
  state.queryJson.value = queryToJson(helper.state);
  helper.search();
}

interface RouteState {
  query: string;
  refinementList: { [key: string]: string[] };
  jobPk: string;
}
</script>

<template>
  <CBox>
    <IndexHeader :on-show-mobile="() => (state.isShowMobileFilters.value = true)" />

    <AisInstantSearch
      show-loading-indicator
      :routing="{
        router: history(),
        stateMapping: {
          stateToRoute(uiState: { [indexId: string]: RouteState }): RouteState {
            const indexUiState: RouteState = uiState[hooks.config.public.algoliaJobsIndex];
            return {
              query: indexUiState.query,
              refinementList: indexUiState.refinementList,
              ...(state.jobPkCurrent.value ? { jobPk: String(state.jobPkCurrent.value) } : {jobPk: undefined}),
              ...state.otherParams // don't lose our other params
            };
          },
          routeToState(routeState): { [indexId: string]: RouteState } {
            if (routeState?.jobPk) {
              state.jobPkCurrent.value = Number(routeState.jobPk);
            }
            
            return {
              [hooks.config.public.algoliaJobsIndex]: {
                query: routeState.query,
                refinementList: routeState.refinementList,
                jobPk: routeState.jobPk
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
            <CBox>
              <AisInfiniteHits>
                <template
                  v-slot="{ items, refinePrevious, refineNext, isLastPage, sendEvent }"
                >
                  <JobCard
                    v-if="state.jobFromUrlQuery.value && !state.queryJson.value"
                    :job="state.jobFromUrlQuery.value"
                    :jobFromURLQuery="true"
                    :is-expanded="true"
                    :is-missing-algolia-context="true"
                    @card-expanded="
                      state.jobPkCurrent.value = state.jobFromUrlQuery.value?.post_pk
                    "
                    @card-collapsed="
                      () => {
                        if (
                          Number(state.jobPkCurrent.value) ===
                          state.jobFromUrlQuery.value?.post_pk
                        ) {
                          state.jobPkCurrent.value = null;
                        }
                      }
                    "
                  />
                  <JobCard
                    v-for="job in items"
                    :job="job"
                    :is-hidden="
                      job.post_pk === state.jobFromUrlQuery?.value?.post_pk &&
                      !state.queryJson.value
                    "
                    :is-has-text-query="Boolean(state.queryJson.value?.query)"
                    :key="job.post_pk"
                    @card-expanded="state.jobPkCurrent.value = job.post_pk"
                    @card-collapsed="
                      () => {
                        if (state.jobPkCurrent.value === job.post_pk) {
                          state.jobPkCurrent.value = null;
                        }
                      }
                    "
                  />

                  <CBox v-if="!isLastPage">
                    <JobCardSkeleton
                      v-observe-visibility="{
                      callback: (isVisible: boolean) => {
                        if (isVisible && !isLastPage) {
                          refineNext();
                        }
                      },
                    }"
                    />
                    <JobCardSkeleton />
                    <JobCardSkeleton />
                  </CBox>
                </template>
              </AisInfiniteHits>
            </CBox>
          </CBox>
        </CFlex>

        <CFlex
          v-if="!hooks.breakpoints.smaller('lg').value"
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

        <!-- mobile -->
        <FilterModal
          v-else
          :is-show-mobile-filters="state.isShowMobileFilters.value"
          :query-json="state.queryJson.value"
          :on-hide-mobile="() => (state.isShowMobileFilters.value = false)"
        />
      </CFlex>
    </AisInstantSearch>
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";

html,
html.dark {
  background: #f4f6f7;
}
</style>
