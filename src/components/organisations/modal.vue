<script setup lang="ts">
import CurrentRefinements from "~/components/algolia/current-refinements.vue";
import Refinements from "~/components/algolia/refinements.vue";
import FiltersFooter from "~/components/eightyk/filters-footer.vue";
import SearchBox from "~/components/algolia/search-box.vue";
import { OhVueIcon } from "oh-vue-icons";
import { SearchIndex } from "algoliasearch/lite";
import { AisStats } from "vue-instantsearch/vue3/es";
import OrgRefinements from "./org-refinements.vue";

const props = defineProps<{
  isShowMobileFilters: boolean;
  index: SearchIndex;
  totalFiltersLength: number;
  queryJson: {
    query: string;
    facetFilters: string[][];
  } | null;
}>();

const emit = defineEmits(["showMobile", "hideMobile"]);
</script>

<template>
  <VueFinalModal
    v-model="props.isShowMobileFilters"
    :click-to-close="true"
    :esc-to-close="true"
    @click-outside="emit('hideMobile')"
  >
    <div
      class="flex absolute left-0 bottom-0 w-screen h-[92vh] gap-6 p-6 pt-7 flex-col bg-white rounded-xl rounded-b-none overflow-scroll"
    >
      <div class="flex justify-between items-center -my-1">
        <h3 class="text-3xl font-bold leading-none">Filters</h3>
        <button
          class="text-eightyk-500 bg-gray-lightest flex justify-center items-center w-8 h-8 rounded-full"
          @click="emit('hideMobile')"
          size="sm"
          color-scheme="gray"
        >
          <OhVueIcon name="io-close" scale="1" class="absolute" />
        </button>
      </div>

      <div class="w-full">
        <SearchBox :is-show-results-count="false" />
      </div>
      <div class="mt-4">
        <CurrentRefinements />
      </div>

      <OrgRefinements :index="props.index" />
      <FiltersFooter />

      <div class="h-12" />
      <div
        class="flex fixed bottom-0 left-0 w-screen h-fit p-4 px-6 justify-center bg-[#f3f6f7]"
      >
        <GenericsKButton class="flex" @click="emit('hideMobile')">
          <span class="mr-2">SHOW RESULTS</span>
          <!-- <AisStats>
            <template v-slot="{ nbHits }">{{ nbHits }}</template>
          </AisStats> -->
        </GenericsKButton>
      </div>
    </div>
  </VueFinalModal>
</template>
