<script setup lang="ts">
import { useHead, useRuntimeConfig, useRoute, useRouter } from "#app";
// import { chakra, CFlex, CVStack, CLink, CBox, CText } from "@chakra-ui/vue-next";
import { useBreakpoints, useThrottleFn, useElementVisibility } from "@vueuse/core";
import algoliasearch from "algoliasearch";
// import { AisInstantSearch, AisInfiniteHits } from "vue-instantsearch/vue3/es";
import { onBeforeMount, onMounted, ref, watch, onBeforeUnmount } from "vue";
// import CurrentRefinements from "~/components/algolia/current-refinements.vue";
// import Refinements from "~/components/algolia/refinements.vue";
// import BtnJobsAlert from "~~/src/components/alerts-button.vue";
// import SearchBox from "~/components/algolia/search-box.vue";
// import FiltersFooter from "~/components/eightyk/filters-footer.vue";
// import JobCardSkeleton from "~/components/card/job-card-skeleton.vue";
// import JobCard from "~/components/card/job-card.vue";
import { useComp, useHooks } from "~/utils/structs";
import { tracking } from "~/utils/tracking";
import queryToJson from "~/utils/queryToJson";
import { JobAlgolia } from "~/utils/types";
import riveted from "~/utils/riveted";
import { breakpointsChakra } from "../constants";
import log from "../utils/log";
// import InternalTrigger from "~/components/internal-trigger.vue";

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

const target = ref<HTMLDivElement>(null);
const targetIsVisible = useElementVisibility(target);

const throttleFn = useThrottleFn((fn: () => void) => {
  fn();
}, 1000);

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

<template><p>yo</p></template>
