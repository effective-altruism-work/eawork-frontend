<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CHeading, CButton, CInput, CBox } from "@chakra-ui/vue-next";
import { simple } from "instantsearch.js/es/lib/stateMappings";
import algoliasearch from "algoliasearch";
import RefinementList from "~/components/aloglia/refinement-list.vue";
import AlgoliaLogo from "~/components/aloglia/algolia-logo.vue";
import JobCard from "~/components/job-card.vue";

const config = useRuntimeConfig();

const searchClient = algoliasearch("S2T38ZKE0P", "b0e9cd27b37d64ac5bbb0b0671e1e84b");

const space = 6;

const routing = { stateMapping: simple() };
</script>

<template>
  <CHeading mt="12">Effective Altruism Jobs</CHeading>

  <AisInstantSearch :routing="routing" :search-client="searchClient" index-name="jobs_prod">
    <CFlex :mt="space * 2" :mb="space * 4">
      <CFlex direction="column" min-w="31%" pr="12" position="sticky">
        <AisSearchBox>
          <template v-slot="{ currentRefinement, isSearchStalled, refine }">
            <CInput
              type="search"
              :value="currentRefinement"
              @input="refine($event.currentTarget.value)"
              placeholder="Search here..."
            />
            <CBox :mt="space / 2" max-h="10px" justify-content="flex-end">
              <AlgoliaLogo />
            </CBox>
          </template>
        </AisSearchBox>

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
        <CFlex justify="space-between">
          <CFlex>
            <CInput max-w="300px" placeholder="joe@gmail.com" border-right-radius="0" />
            <CButton border-left-radius="0" px="7" color-scheme="blue">Subscribe</CButton>
          </CFlex>
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
</template>
