<script lang="ts" setup>
import { OhVueIcon } from "oh-vue-icons";
import KButton from "../generics/kButton.vue";
import { AisSearchBox, AisStats, AisInstantSearch } from "vue-instantsearch/vue3/es";
import { useHooks } from "~~/src/utils/structs";
import algoliasearch from "algoliasearch";

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

const emit = defineEmits(["showModal"]);
</script>
<template>
  <div>
    <div class="mt-8 lg:mt-14 mb-6 lg:mb-14 gap-4 lg:gap-3 flex flex-col">
      <h3 class="leading-[38.4px] lg:leading-[38.4px] text-[44px] font-bold lg:text-5xl">
        Top Recommended Organisations
      </h3>
      <p class="text-lg mt-2">
        We think getting a job at one of these organisations is a promising route to working
        on some of the
        <EightykLink path="/problem-profiles/"> world’s most pressing problems</EightykLink>.
      </p>
    </div>

    <div>
      <AisInstantSearch
        show-loading-indicator
        :search-client="hooks.searchClient"
        :index-name="hooks.config.public.algoliaJobsIndex"
      >
        <AisStats>
          <template v-slot="{ nbHits: jobHits }">
            <AisInstantSearch
              :search-client="hooks.searchClient"
              :index-name="hooks.config.public.algoliaCompaniesIndex"
            >
              <AisStats>
                <template v-slot="{ nbHits: orgHits }">
                  <NuxtLink to="/"
                    >See all {{ jobHits }} jobs from {{ orgHits }} organisations</NuxtLink
                  >
                </template>
              </AisStats>
            </AisInstantSearch>
          </template>
        </AisStats>
      </AisInstantSearch>
    </div>
    <div class="flex justify-center mb-4">
      <KButton class="w-full flex justify-center" @click="emit('showModal')">
        <OhVueIcon name="md-filterlist-round" scale="1.1" style="margin-bottom: 1px" />
        <span class="ml-2">Filters</span>
      </KButton>
    </div>
    <!-- <AisInstantSearch
      show-loading-indicator
      :routing="routing"
      :search-client="hooks.searchClient"
      :search-function="searchFunction"
      :index-name="hooks.config.public.algoliaJobsIndex"
    >
      <CurrentRefinements v-if="breakpoints.smaller('lg').value" />
    </AisInstantSearch> -->
  </div>
</template>
