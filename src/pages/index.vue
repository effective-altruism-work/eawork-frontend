<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CHeading, CButton, CBox, CText } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { subDays, startOfYear, getUnixTime, endOfYear, addDays } from "date-fns";
import { OhVueIcon } from "oh-vue-icons";
import { ref } from "vue";
import CurrentRefinements from "~/components/aloglia/current-refinements.vue";
import RefinementList from "~/components/aloglia/refinement-list.vue";
import SearchBox from "~/components/aloglia/search-box.vue";
import CreateAlertBtn from "~/components/create-alert-btn.vue";
import JobCard from "~/components/job-card.vue";
import { history } from "instantsearch.js/es/lib/routers";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";
import Pagination from "~/components/aloglia/pagination";

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
const indexName = "jobs_prod";

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
        stateMapping: singleIndex(indexName),
      }"
      :search-client="searchClient"
      :search-function="searchFunction"
      :index-name="indexName"
    >
      <CFlex :mb="space * 4">
        <CFlex direction="column" min-w="31%" max-w="31%" pr="12" position="sticky">
          <SearchBox />

          <CBox :mt="space / 2">
            <CurrentRefinements />
          </CBox>

          <RefinementList attribute="tags_area" label="Areas" />
          <RefinementList attribute="tags_role_type" label="Roles" />
          <RefinementList
            attribute="tags_degree_required"
            label="Educational requirements"
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

          <CBox>
            <CHeading size="sm" :mt="space">Posted at</CHeading>
            <ais-numeric-menu
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
          </CBox>

          <CBox :mt="space">
            <CHeading size="sm">Closes in</CHeading>
            <ais-numeric-menu
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
          </CBox>
        </CFlex>

        <CFlex direction="column" min-w="69%">
          <CFlex justify="flex-end" :gap="space">
            <CreateAlertBtn :query-json="queryJson" />

            <NuxtLink href="/post-job">
              <CButton color-scheme="blue" variant="outline">
                <OhVueIcon name="hi-solid-plus" scale="1" color="var(--colors-blue-600)" />
                <CText ml="2">Post Job</CText>
              </CButton>
            </NuxtLink>
          </CFlex>

          <CBox mt="12">
            <CBox min-h="100vh">
              <AisStateResults>
                <template v-slot="{ state: { query }, results: { hits } }">
                  <AisHits>
                    <template v-slot:item="{ item, index, insights }">
                      <JobCard :job="item" />
                    </template>
                  </AisHits>
                </template>
              </AisStateResults>
            </CBox>

            <Pagination />
          </CBox>
        </CFlex>
      </CFlex>
    </AisInstantSearch>
  </CBox>
</template>
