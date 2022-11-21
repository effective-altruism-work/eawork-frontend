<script setup lang="ts">
import { AisInstantSearch, AisInfiniteHits, AisConfigure } from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch";
import { useHooks } from "../utils/structs";
import { OrgAlgolia } from "../utils/types";
import { useThrottleFn } from "@vueuse/shared";
import queryToJson from "../utils/queryToJson";
import OrgCard from "~/components/organisations/org-card.vue";
import OrgHeader from "~/components/organisations/header.vue";
import SearchBox from "../components/algolia/search-box.vue";
import CurrentRefinements from "../components/algolia/current-refinements.vue";
import FiltersFooter from "../components/eightyk/filters-footer.vue";
import OrgRefinements from "~/components/organisations/org-refinements.vue";
import log from "../utils/log";

useHead({
  title: "Job board | Organisations",
});

const hooks = useHooks(() => {
  const config = useRuntimeConfig();
  return {
    config,
    searchClient: algoliasearch(
      config.public.algoliaApplicationId,
      config.public.algoliaApiKey,
    ),
  };
});

const state = {
  searchIndex: hooks.searchClient.initIndex(hooks.config.public.algoliaCompaniesIndex),
  queryJson: ref<null | { query: string; facetFilters: string[][] }>(null),

  orgPkCurrent: ref<string | null>(null),
  orgFromUrlQuery: ref<OrgAlgolia | null>(null),
  otherParams: ref(null),
  isShowModalFilters: ref(false),
};

interface RouteState {
  query: string;
  refinementList: { [key: string]: string[] };
  orgPk: string;
}

function stateToRoute(uiState: { [indexId: string]: RouteState }): RouteState {
  console.log({ uiState });
  const indexUiState: RouteState = uiState[hooks.config.public.algoliaCompaniesIndex];

  return {
    query: indexUiState.query,
    refinementList: indexUiState.refinementList,
    ...(state.orgPkCurrent.value
      ? { orgPk: String(state.orgPkCurrent.value) }
      : { orgPk: undefined }),
    ...state.otherParams.value, // don't lose our other params
  };
}

function routeToState(routeState: RouteState): { [indexId: string]: RouteState } {
  console.log({ routeState });

  let refinementList = routeState?.refinementList;

  // side effect
  if (routeState?.orgPk) {
    state.orgPkCurrent.value = routeState.orgPk;
  }

  return {
    [hooks.config.public.algoliaCompaniesIndex]: {
      query: routeState.query,
      refinementList: refinementList,
      orgPk: routeState.orgPk,
    },
  };
}

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
  console.log("helper state", helper.state);
  state.queryJson.value = queryToJson(helper.state);
  helper.search();
}

const stateMapping = { stateToRoute, routeToState };
const routing = { stateMapping };

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
</script>

<template>
  <div class="flex justify-center">
    <div class="max-w-2xl">
      <OrgHeader @show-modal="() => (state.isShowModalFilters.value = true)" />
      <AisInstantSearch
        show-loading-indicator
        :routing="routing"
        :search-client="hooks.searchClient"
        :search-function="searchFunction"
        :index-name="hooks.config.public.algoliaCompaniesIndex"
      >
        <div class="lg:hidden">
          <!-- <CurrentRefinements /> -->
        </div>
        <div class="flex mb-24">
          <div class="flex flex-col">
            <div>
              <AisInfiniteHits>
                <template
                  v-slot="{
                    items,
                  }: {
                    items: OrgAlgolia[],
                    refinePrevious: () => void,
                    refineNext: () => void,
                    isLastPage: boolean,
                    sendEvent: (x: any) => void,
                  }"
                >
                  <OrgCard
                    v-for="org in items.filter((x) => x.is_top_recommended_org)"
                    :org="org"
                    :is-hidden="
                      org.objectID === state.orgFromUrlQuery?.value?.objectID &&
                      !state.queryJson.value
                    "
                    :is-has-text-query="Boolean(state.queryJson.value?.query)"
                    :key="org.objectID"
                    @card-expanded="state.orgPkCurrent.value = org.objectID"
                    @card-collapsed="
                      () => {
                        if (state.orgPkCurrent.value === org.objectID) {
                          state.orgPkCurrent.value = null;
                        }
                      }
                    "
                  />
                </template>

                <!-- this overrides the 'show more results' button that pops up -->
                <template v-slot:loadMore="{ page, isLastPage, refineNext }"
                  ><span
                /></template>
              </AisInfiniteHits>
            </div>
          </div>

          <!-- <div
          class="lg:flex flex-col lg:min-w-[30%] lg:max-w-[30%] xl:min-w-[26%] xl:max-w-[26%] sticky pl-10"
        >
          <NuxtLink class="flex items-center text-xl text-eightyk-400 font-bold mb-4" to="/">
            <OhVueIcon name="md-starrate-round" scale="1.1" class="mb-[1px]" />
            <span class="ml-1">See all jobs</span>
          </NuxtLink>
          <SearchBox :is-show-results-count="true" />
          <CurrentRefinements />

          <div class="mb-1">
            <LazyAlerts
              :total-filters-length="totalFiltersLength"
              :query-json="state.queryJson.value"
            />
          </div>
          <OrgRefinements :index="state.searchIndex" />
          <FiltersFooter />
        </div> -->

          <!-- filters and search -->
          <LazyOrganisationsModal
            :total-filters-length="totalFiltersLength"
            :index="state.searchIndex"
            :is-show-mobile-filters="state.isShowModalFilters.value"
            :query-json="state.queryJson.value"
            @hide-mobile="() => (state.isShowModalFilters.value = false)"
          />
        </div>
      </AisInstantSearch>
    </div>
  </div>
</template>
