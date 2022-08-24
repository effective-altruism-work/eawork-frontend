<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CHeading, CButton, CBox } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { ref } from "vue";
import RefinementList from "~/components/aloglia/refinement-list.vue";
import CreateAlertBtn from "~/components/create-alert-btn.vue";
import JobCard from "~/components/job-card.vue";
import { history } from "instantsearch.js/es/lib/routers";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";

const config = useRuntimeConfig();

const searchClient = algoliasearch("S2T38ZKE0P", "b0e9cd27b37d64ac5bbb0b0671e1e84b");

const space = 6;
const indexName = "jobs_prod";
const queryJson = ref<any>(null);

const routing = {
  router: history(),
  stateMapping: singleIndex(indexName),
};

function searchFunction(helper) {
  const query = helper.state.query;
  const facetsRaw: Map<string, string[]> = helper.state.disjunctiveFacetsRefinements;
  const facetFilters: string[] = [];
  for (const [facetName, facetValueArr] of Object.entries(facetsRaw)) {
    for (const facetValue of facetValueArr) {
      facetFilters.push(`${facetName}:${facetValue}`);
    }
  }
  if (query || facetFilters.length) {
    queryJson.value = {
      query: query,
      facetFilters: facetFilters,
    };
  } else {
    queryJson.value = null;
  }
  helper.search();
}
</script>

<template>
  <CBox>
    <CHeading mt="12">Effective Altruism Jobs</CHeading>

    <AisInstantSearch
      :routing="routing"
      :search-client="searchClient"
      :search-function="searchFunction"
      index-name="jobs_prod"
    >
      <CFlex :mt="space * 2" :mb="space * 4">
        <CFlex direction="column" min-w="31%" pr="12" position="sticky">
          <AisSearchBox />

          <CBox :mt="space / 2">
            <ais-current-refinements>
              <template v-slot="{ items, createURL }">
                <ul>
                  <li v-for="item in items" :key="item.attribute">
                    {{ item.label }}:
                    <ul>
                      <li
                        v-for="refinement in item.refinements"
                        :key="
                          [
                            refinement.attribute,
                            refinement.type,
                            refinement.value,
                            refinement.operator,
                          ].join(':')
                        "
                      >
                        <a
                          :href="createURL(refinement)"
                          @click.prevent="item.refine(refinement)"
                        >
                          {{ refinement.label }} X
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </template>
            </ais-current-refinements>
          </CBox>

          <RefinementList attribute="tags_area" label="Areas" />
          <RefinementList attribute="tags_role_type" label="Roles" />
          <RefinementList attribute="tags_degree_required" label="Roles" />

          <CBox mt="6">
            <CHeading size="sm">Country</CHeading>
            <AisRefinementList
              attribute="tags_country"
              :limit="6"
              :show-more-limit="20"
              :searchable="true"
            />
          </CBox>

          <CBox mt="6">
            <CHeading size="sm">City</CHeading>
            <AisRefinementList
              attribute="tags_city"
              :limit="6"
              :show-more-limit="20"
              :searchable="true"
            />
          </CBox>

          <CBox mt="6">
            <CHeading size="sm">Company</CHeading>
            <AisRefinementList
              attribute="company_name"
              :limit="6"
              :show-more-limit="20"
              :searchable="true"
            />
          </CBox>

          <RefinementList attribute="tags_location_type" label="Type" />
          <RefinementList attribute="tags_skill" label="Skills" />
          <RefinementList attribute="tags_generic" label="Tags" />
        </CFlex>

        <CFlex direction="column">
          <CFlex justify="flex-end" :gap="space">
            <CreateAlertBtn :query-json="queryJson" />

            <CButton color-scheme="blue" variant="outline">Post Job</CButton>
          </CFlex>

          <CBox mt="12">
            <AisStateResults>
              <template v-slot="{ state: { query }, results: { hits } }">
                <AisInfiniteHits>
                  <template v-slot:item="{ item, index, insights }">
                    <JobCard :job="item" />
                  </template>
                </AisInfiniteHits>
              </template>
            </AisStateResults>
          </CBox>
        </CFlex>
      </CFlex>
    </AisInstantSearch>
  </CBox>
</template>
