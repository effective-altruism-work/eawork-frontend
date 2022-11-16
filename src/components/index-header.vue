<script setup lang="ts">
import { OhVueIcon } from "oh-vue-icons";

const emit = defineEmits(["showMobile"]);
</script>

<template>
  <div>
    <div class="mt-8 lg:mt-14 mb-6 lg:mb-14 gap-4 lg:gap-3">
      <div class="flex justify-between items-center">
        <h3 class="leading-none text-3xl font-bold lg:text-5xl">Jobs</h3>
      </div>
      <p class="text-lg mt-2">
        Handpicked to help you tackle the
        <EightykLink path="/problem-profiles/"> world’s most pressing problems </EightykLink>
        with your career.
      </p>
    </div>

    <div class="flex gap-7 lg:-mt-2 mb-6 text-sm lg:text-base items-center">
      <a
        class="flex items-center text-gray-400 underline"
        href="https://80000hours.org/job-board/top-orgs/"
      >
        <OhVueIcon name="md-starrate-round" scale="1.1" class="mb-[1px]" />
        <span class="ml-1">Top recommended organisations</span>
      </a>
      <a
        class="flex items-center underline text-gray-400"
        href="https://80000hours.org/job-board/faq/"
      >
        <OhVueIcon name="bi-question-circle-fill" scale="1" class="mr-1" />
        <span>FAQ</span>
      </a>
    </div>
    <div class="flex justify-center mb-4 lg:hidden">
      <button class="w-full" @click="emit('showMobile')">
        <OhVueIcon name="md-filterlist-round" scale="1.1" style="margin-bottom: 1px" />
        <span class="ml-2">Filters and alerts</span>
      </button>
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
