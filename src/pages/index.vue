<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CHeading } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import JobCard from "~/components/job-card.vue";

const config = useRuntimeConfig();

const searchClient = algoliasearch("S2T38ZKE0P", "b0e9cd27b37d64ac5bbb0b0671e1e84b");
</script>

<template>
  <CHeading mt="12">Jobs</CHeading>

  <AisInstantSearch :search-client="searchClient" :index-name="'jobs_prod'">
    <CFlex mt="12" mb="24">
      <CFlex direction="column" min-w="28%" pr="6">
        <AisSearchBox :autofocus="true" />

        <CBox mt="6">

          <ais-current-refinements>
            <template v-slot="{ items, createURL }">
              <ul>
                <li
                  v-for="item in items"
                  :key="item.attribute"
                >
                  {{ item.label }}:
                  <ul>
                    <li
                      v-for="refinement in item.refinements"
                      :key="[
                        refinement.attribute,
                        refinement.type,
                        refinement.value,
                        refinement.operator
                      ].join(':')"
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

        <CBox mt="6">
          <CHeading size="sm">Cause areas</CHeading>
          <AisRefinementList
            attribute="cause_areas"
          />
        </CBox>

        <CBox mt="6">
          <CHeading size="sm">Role</CHeading>
          <AisRefinementList
            attribute="role_types"
          />
        </CBox>

        <CBox mt="6">
          <CHeading size="sm">Country</CHeading>
          <AisRefinementList
            attribute="countries"
            :limit="6"
            :show-more-limit="20"
          />
        </CBox>

        <CBox mt="6">
          <CHeading size="sm">City</CHeading>
          <AisRefinementList
            attribute="cities"
            :limit="6"
            :show-more-limit="20"
          />
        </CBox>

        <CBox mt="6">
          <CHeading size="sm">Affiliations</CHeading>
          <AisRefinementList
            attribute="affiliations"
          />
        </CBox>

        <CBox mt="6">
          <CHeading size="sm">Tags</CHeading>
          <AisRefinementList
            attribute="tags"
          />
        </CBox>
      </CFlex>

      <CFlex direction="column">
        <AisStateResults>
          <template v-slot="{ state: { query }, results: { hits } }">
            <AisInfiniteHits>
              <template v-slot:item="{ item, index, insights }">
                <CBox mb="6" :key="item.objectID" display="block">
                  <CFlex>
                    <CHeading font-size="xl">
                      <ais-snippet :hit="item" attribute="title"/>
                    </CHeading>
                  </CFlex>
  
                  <CBox mt="12" font-size="lg">
                    <ais-snippet :hit="item" attribute="description"/>...
                  </CBox>
                </CBox>
  
              </template>
  
            </AisInfiniteHits>
          </template>
        </AisStateResults>
      </CFlex>
    </CFlex>
  </AisInstantSearch>
</template>
