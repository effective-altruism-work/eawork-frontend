<script setup lang="ts">
import { useHead, useRuntimeConfig, useRoute, useRouter } from "#app";
import { chakra, CFlex, CVStack, CLink, CBox, CText } from "@chakra-ui/vue-next";
import { useBreakpoints } from "@vueuse/core";
import algoliasearch from "algoliasearch/lite";
import { AisInstantSearch, AisInfiniteHits } from "vue-instantsearch/vue3/es";
import { onBeforeMount, onMounted, ref, watch, onBeforeUnmount } from "vue";
import CurrentRefinements from "~/components/algolia/current-refinements.vue";
import Refinements from "~/components/algolia/refinements.vue";
import BtnJobsAlert from "~/components/btn-jobs-alert.vue";
import SearchBox from "~/components/algolia/search-box.vue";
import FiltersFooter from "~/components/eightyk/filters-footer.vue";
import JobCardSkeleton from "~/components/card/job-card-skeleton.vue";
import JobCard from "~/components/card/job-card.vue";
import { useComp, useHooks } from "~/utils/structs";
import { tracking } from "~/utils/tracking";
import queryToJson from "~/utils/queryToJson";
import { JobAlgolia } from "~/utils/types";
import riveted from "~/utils/riveted";
import { breakpointsChakra } from "../constants";
import log from "../utils/log";

const breakpoints = useBreakpoints(breakpointsChakra);

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
  // featuredList: ref([])
};

const totalFiltersLength = computed(() => {
  let tL = 0;

  if (!state?.queryJson.value?.facetFilters) {
    return tL;
  }

  for (const FF of state.queryJson.value?.facetFilters) {
    for (const f of FF) {
      tL += 1;
    }
  }

  return tL;
});

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

  // if (window.location.href.includes("tags_location_type")) {
  //   const url = window.location.href;
  //   window.history.replaceState(
  //     {},
  //     "",
  //     url
  //       .replace("refinementList%5Btags_location_type%5D%5B0%5D=Remote", "")
  //       .replace("refinementList[tags_location_type][0]=Remote", ""),
  //   );
  // }

  state.otherParams = params;

  await tracking.init(hooks.config.public.segmentId);

  pageTrack();
});

// track page-stays
onMounted(() => {
  riveted();
});

onMounted(async () => {
  await loadJobIfSpecified();
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

function stateToRoute(uiState: { [indexId: string]: RouteState }): RouteState {
  const indexUiState: RouteState = uiState[hooks.config.public.algoliaJobsIndex];
  return {
    query: indexUiState.query,
    refinementList: indexUiState.refinementList,
    ...(state.jobPkCurrent.value
      ? { jobPk: String(state.jobPkCurrent.value) }
      : { jobPk: undefined }),
    ...state.otherParams, // don't lose our other params
  };
}

function routeToState(routeState: RouteState): { [indexId: string]: RouteState } {
  let refinementList = routeState?.refinementList;

  // let { tags_location_type, ...remaining } =
  //   typeof refinementList !== "object"
  //     ? { tags_location_type: undefined }
  //     : "tags_location_type" in refinementList
  //     ? refinementList
  //     : { tags_location_type: undefined, ...refinementList };

  // side effect
  if (routeState?.jobPk) {
    state.jobPkCurrent.value = Number(routeState.jobPk);
  }

  return {
    [hooks.config.public.algoliaJobsIndex]: {
      query: routeState.query,
      refinementList: refinementList,
      jobPk: routeState.jobPk,
    },
  };
}

const stateMapping = { stateToRoute, routeToState };
const routing = { stateMapping };
</script>

<template>
  <CBox>
    <IndexHeader
      :filter-count="totalFiltersLength"
      @show-mobile="() => (state.isShowMobileFilters.value = true)"
    />
    <AisInstantSearch
      show-loading-indicator
      :routing="routing"
      :search-client="hooks.searchClient"
      :search-function="searchFunction"
      :index-name="hooks.config.public.algoliaJobsIndex"
    >
      <CurrentRefinements v-if="breakpoints.smaller('lg').value" />
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
                  <!-- <p style="position: fixed; top: 0; left: 0">
                    {{ items.length }} lastpage: {{ isLastPage }}
                  </p> -->
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
                  <CBox
                    ><button
                      @click="
                        () => {
                          log('refine next');
                          refineNext();
                        }
                      "
                    >
                      click me
                    </button></CBox
                  >
                </template>

                <!-- this overrides the 'show more results' button that pops up -->
                <template v-slot:loadMore="{ page, isLastPage, refineNext }"
                  ><span
                /></template>
              </AisInfiniteHits>
            </CBox>
          </CBox>
        </CFlex>

        <CFlex
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
            <BtnJobsAlert
              :total-filters-length="totalFiltersLength"
              :query-json="state.queryJson.value"
            />
          </CBox>
          <Refinements :index="state.searchIndex" />
          <FiltersFooter />
        </CFlex>

        <!-- mobile -->
        <!-- v-else -->
        <FilterModal
          :total-filters-length="totalFiltersLength"
          :index="state.searchIndex"
          :is-show-mobile-filters="state.isShowMobileFilters.value"
          :query-json="state.queryJson.value"
          @hide-mobile="() => (state.isShowMobileFilters.value = false)"
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
