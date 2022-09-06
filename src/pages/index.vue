<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CHeading, CButton, CBox, CText } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { subDays, startOfYear, getUnixTime, endOfYear, addDays } from "date-fns";
import { OhVueIcon } from "oh-vue-icons";
import { ref } from "vue";
import CurrentRefinements from "~/components/aloglia/current-refinements.vue";
import NumericMenu from "~/components/aloglia/numeric-menu.vue";
import RefinementList from "~/components/aloglia/refinement-list.vue";
import SearchBox from "~/components/aloglia/search-box.vue";
import BtnJobsAlert from "~/components/btn-jobs-alert.vue";
import JobCardSkeleton from "~/components/job-card-skeleton.vue";
import JobCard from "~/components/job-card.vue";
import { history } from "instantsearch.js/es/lib/routers";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";
import { urls } from "~/constants";

const config = useRuntimeConfig();
const searchClient = algoliasearch(
  config.public.algoliaApplicationId,
  config.public.algoliaApiKey,
);
const queryJson = ref<null | {
  query: string;
  facetFilters: string[];
}>(null);

const space = 6;

function searchFunction(helper) {
  saveQueryJson(helper.state);
  helper.search();
}

function saveQueryJson(state: {
  query: string;
  disjunctiveFacetsRefinements: Map<string, string[]>;
}) {
  const queryString = state.query;
  const facetsRaw: Map<string, string[]> = state.disjunctiveFacetsRefinements;
  const facetFilters: string[] = [];
  for (const [facetName, facetValueArr] of Object.entries(facetsRaw)) {
    for (const facetValue of facetValueArr) {
      facetFilters.push(`${facetName}:${facetValue}`);
    }
  }
  const isQuerySpecified = queryString || facetFilters.length;
  if (isQuerySpecified) {
    queryJson.value = {
      query: queryString,
      facetFilters: facetFilters,
    };
  } else {
    queryJson.value = null;
  }
}
</script>

<template>
  <CBox>
    <AisInstantSearch
      show-loading-indicator
      :routing="{
        router: history(),
        stateMapping: singleIndex(config.public.algoliaJobsIndex),
      }"
      :search-client="searchClient"
      :search-function="searchFunction"
      :index-name="config.public.algoliaJobsIndex"
    >
      <CFlex :mb="space * 4">
        <CFlex direction="column" min-w="31%" max-w="31%" pr="12" position="sticky">
          <SearchBox />

          <CBox mt="6">
            <CurrentRefinements />
          </CBox>

          <RefinementList attribute="tags_area" label="Areas" :mt="0" />
          <RefinementList attribute="tags_role_type" label="Roles" />
          <RefinementList
            attribute="tags_degree_required"
            label="Educational requirements"
          />
          <RefinementList
            attribute="tags_exp_required"
            label="Experience requirements"
          />

          <RefinementList
            attribute="tags_country"
            label="Country"
            :limit="6"
            :show-more-limit="20"
            :searchable="true"
          />
          <RefinementList
            attribute="tags_city"
            label="City"
            :limit="6"
            :show-more-limit="20"
            :searchable="true"
          />
          <RefinementList
            attribute="company_name"
            label="Company"
            :limit="6"
            :show-more-limit="20"
            :searchable="true"
          />
          <RefinementList attribute="tags_location_type" label="Location" />
          <RefinementList attribute="tags_skill" label="Skills" />
          <RefinementList attribute="tags_generic" label="Tags" />

          <NumericMenu
            label="Posted at"
            attribute="posted_at"
            :items="[
              { label: 'Anytime' },
              { label: 'Today', start: getUnixTime(subDays(new Date(), 1)) },
              { label: 'A week ago', start: getUnixTime(subDays(new Date(), 7)) },
              { label: '30d ago', start: getUnixTime(subDays(new Date(), 30)) },
              { label: '3m ago', start: getUnixTime(subDays(new Date(), 91)) },
              { label: 'This year', start: getUnixTime(startOfYear(new Date())) },
            ]"
          />
          
          <NumericMenu
            label="Closes in"
            attribute="closes_at"
            :items="[
              { label: 'Anytime' },
              { label: 'Today', end: getUnixTime(addDays(new Date(), 1)) },
              { label: 'In a week', end: getUnixTime(addDays(new Date(), 7)) },
              { label: 'In 30d', end: getUnixTime(addDays(new Date(), 30)) },
              { label: 'In 3m', end: getUnixTime(addDays(new Date(), 91)) },
              { label: 'This year', end: getUnixTime(endOfYear(new Date())) },
            ]"
          />
        </CFlex>

        <CFlex direction="column" min-w="69%">
          <CFlex justify="flex-end" :gap="space">
            <BtnJobsAlert :query-json="queryJson" />

<!--            <NuxtLink :to="urls.jobs.post">-->
<!--              <CButton color-scheme="blue" variant="outline">-->
<!--                <OhVueIcon name="hi-solid-plus" scale="1" color="var(&#45;&#45;colors-blue-600)" />-->
<!--                <CText ml="2">Post Job</CText>-->
<!--              </CButton>-->
<!--            </NuxtLink>-->
          </CFlex>

          <CBox :mt="space">
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
                    v-for="job in items"
                    :job="job"
                    :is-has-text-query="Boolean(queryJson?.query)"
                    :key="job.post_pk"
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
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                    <JobCardSkeleton/>
                  </CBox>

                </template>
              </AisInfiniteHits>
            </CBox>
          </CBox>

        </CFlex>
      </CFlex>
    </AisInstantSearch>
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";


html, html.dark {
  background: var(--colors-gray-50);
}

</style>
