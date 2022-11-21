<script setup lang="ts">
import { AisInstantSearch, AisInfiniteHits } from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch";
import { useHooks } from "../utils/structs";
import { OrgAlgolia } from "../utils/types";
import { useThrottleFn } from "@vueuse/shared";
import { useElementVisibility } from "@vueuse/core";
import queryToJson from "../utils/queryToJson";
import OrgCard from "~/components/organisations/org-card.vue";
import OrgHeader from "~/components/organisations/header.vue";
import SearchBox from "../components/algolia/search-box.vue";
import CurrentRefinements from "../components/algolia/current-refinements.vue";
import FiltersFooter from "../components/eightyk/filters-footer.vue";
import OrgRefinements from "~/components/organisations/org-refinements.vue";
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
  isShowMobileFilters: ref(false),
};

interface RouteState {
  query: string;
  refinementList: { [key: string]: string[] };
  orgPk: string;
}

function stateToRoute(uiState: { [indexId: string]: RouteState }): RouteState {
  const indexUiState: RouteState = uiState[hooks.config.public.algoliaCompaniesIndex];
  return {
    query: indexUiState.query,
    refinementList: indexUiState.refinementList,
    ...(state.orgPkCurrent.value
      ? { orgPk: String(state.orgPkCurrent.value) }
      : { orgPk: undefined }),
    ...state.otherParams, // don't lose our other params
  };
}

function routeToState(routeState: RouteState): { [indexId: string]: RouteState } {
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
  state.queryJson.value = queryToJson(helper.state);
  helper.search();
}

const stateMapping = { stateToRoute, routeToState };
const routing = { stateMapping };

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

const target = ref<HTMLDivElement>(null);
const targetIsVisible = useElementVisibility(target);
</script>

<template>
  <div>
    <OrgHeader />
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
        <div class="flex flex-col min-w-full lg:min-w-[70%] xl:min-w-[74%]">
          <div class="flex justify-end gap-6">
            <!--<NuxtLink :to="urls.jobs.post">-->
            <!--  <CButton color-scheme="blue" variant="outline">-->
            <!--    <OhVueIcon name="hi-solid-plus" scale="1" color="var(&#45;&#45;colors-blue-600)" />-->
            <!--    <CText ml="2">Post Job</CText>-->
            <!--  </CButton>-->
            <!--</NuxtLink>-->
          </div>

          <div>
            <AisInfiniteHits>
              <template
                v-slot="{
                  items,
                  refineNext,
                  isLastPage,
                }: {
                  items: OrgAlgolia[],
                  refinePrevious: () => void,
                  refineNext: () => void,
                  isLastPage: boolean,
                  sendEvent: (x: any) => void,
                }"
              >
                <div
                  class="flex flex-wrap gap-2 flex-col"
                  :style="`height: ${290 * (items.length / 2)}px`"
                >
                  <OrgCard
                    v-if="state.orgFromUrlQuery.value && !state.queryJson.value"
                    :org="state.orgFromUrlQuery.value"
                    :orgFromUrlQuery="true"
                    :is-expanded="true"
                    :is-missing-algolia-context="true"
                    @card-expanded="
                      state.orgPkCurrent.value = state.orgFromUrlQuery.value?.objectID
                    "
                    @card-collapsed="
                      () => {
                        if (
                          state.orgPkCurrent.value === state.orgFromUrlQuery.value?.objectID
                        ) {
                          state.orgPkCurrent.value = null;
                        }
                      }
                    "
                  />
                  <OrgCard
                    v-for="org in items.map((o) => ({ ...o, locations: ['Oxford, UK'] }))"
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
                </div>

                <!-- <div ref="target" v-if="!isLastPage">
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                </div> -->
                <!-- this is a hack to trigger refineNext, because useElementVisibility doesn't include a way to trigger a callback -->
                <InternalTrigger v-if="targetIsVisible" :fn="() => throttleFn(refineNext)" />
              </template>

              <!-- this overrides the 'show more results' button that pops up -->
              <template v-slot:loadMore="{ page, isLastPage, refineNext }"
                ><span
              /></template>
            </AisInfiniteHits>
          </div>
        </div>

        <div
          class="lg:flex flex-col lg:min-w-[30%] lg:max-w-[30%] xl:min-w-[26%] xl:max-w-[26%] sticky pl-10"
        >
          <SearchBox :is-show-results-count="true" />
          <CurrentRefinements />

          <div class="mb-1">
            <LazyAlerts
              :total-filters-length="totalFiltersLength"
              :query-json="state.queryJson.value"
            />
          </div>
          <!-- <OrgRefinements :index="state.searchIndex" /> -->
          <FiltersFooter />
        </div>

        <!-- mobile -->
        <!-- <LazyFilterModal
          :total-filters-length="totalFiltersLength"
          :index="state.searchIndex"
          :is-show-mobile-filters="state.isShowMobileFilters.value"
          :query-json="state.queryJson.value"
          @hide-mobile="() => (state.isShowMobileFilters.value = false)"
        /> -->
      </div>
    </AisInstantSearch>
  </div>
</template>
