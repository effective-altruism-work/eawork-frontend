<script setup lang="ts">
// import AlgoliaLogo from "~/components/algolia/algolia-logo.vue";
import { OhVueIcon } from "oh-vue-icons";
import { AisSearchBox, AisStats } from "vue-instantsearch/vue3/es";

const props = defineProps<{
  isShowResultsCount: boolean;
}>();
</script>

<template>
  <div
    class="min-h-[10] w-full relative"
    :class="props.isShowResultsCount ? 'mb-0' : 'mb-6'"
  >
    <AisSearchBox placeholder="Keywords">
      <AlgoliaDebouncedSearchbox :delay="300" />
      <!-- <template v-slot="{ currentRefinement, isSearchStalled, refine }">
        <form class="flex w-full">
          <span :class="!isSearchStalled ? 'hidden' : ''">Loading...</span>
          <AlgoliaDebouncedSearchbox
            :value="currentRefinement"
            @inpt="refine($event.currentTarget.value)"
            :delay="300"
          />
          <OhVueIcon
            class="w-6 h-6 absolute left-4 self-center"
            name="io-search"
            color="grey"
          />
        </form>
      </template> -->
    </AisSearchBox>
    <AisStats v-if="props.isShowResultsCount">
      <template v-slot="{ nbHits, page, nbSortedHits, hitsPerPage, nbPages }">
        <div class="flex my-5 gap-1 justify-end">
          <p class="font-bold">{{ nbHits }}</p>
          roles
        </div>
      </template>
    </AisStats>
  </div>
</template>
