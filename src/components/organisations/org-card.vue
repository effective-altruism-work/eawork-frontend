<script lang="ts" setup>
import { OhVueIcon } from "oh-vue-icons";
import { OrgAlgolia } from "~/utils/types";
import { AisSnippet } from "vue-instantsearch/vue3/es";

const isOpen = ref(false);

const props = defineProps<{
  org: OrgAlgolia;
  orgFromURLQuery?: boolean;
  isHasTextQuery?: boolean | string | null;
  isExpanded?: boolean;
  isHidden?: boolean;
  isMissingAlgoliaContext?: boolean;
}>();

function handleClick() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <button
    class="bg-white p-4 group w-[48%] lg:p-6 rounded-xl hover:cursor-pointer outline-gray-200 items-start justify-between flex flex-col"
    :class="isOpen ? 'outline' : 'hover:outline'"
    @click="handleClick"
  >
    <div>
      <div class="flex relative w-full">
        <img
          class="bg-white rounded object-contain"
          :alt="`${org.name} logo`"
          :src="org.logo_url"
          width="60"
          height="60"
          min-w="60px"
          loading="lazy"
        />

        <div class="flex ml-3 flex-col gap-3 w-full">
          <p class="font-bold leading-tight text-left w-full lg:leading-none lg:text-xl">
            <span class="w-full">{{ org.name }}</span>

            <!-- <span v-if="props.isMissingAlgoliaContext">{{ org.name }}</span>
          <AisSnippet v-else :hit="org" attribute="name" /> -->
          </p>

          <div
            class="leading-tight lg:leading-none relative text-sm lg:text-md"
            :style="org?.is_top_recommended_org ? 'left: -3px' : ''"
          >
            <!-- <div
            class="relative inline"
            v-if="org?.company_is_recommended_org"
            @mouseover="state.isStarHovering.value = true"
            @focus="state.isStarHovering.value = true"
            @mouseleave="state.isStarHovering.value = false"
            @blur="state.isStarHovering.value = false"
          >
            <OhVueIcon
              name="md-starrate-round"
              scale="1.1"
              class="mb-[1px] mr-0.5 text-[#9badb6]"
            />
            <JobHoverText
              v-if="state.isStarHovering.value"
              :companyName="job.company_name"
            />
          </div> -->

            <span class="text-sm lg:text-base" v-if="props.isMissingAlgoliaContext">{{
              org.name
            }}</span>
            <span v-else class="text-sm lg:text-base">
              <ais-snippet :hit="org" attribute="name" />
            </span>
          </div>
        </div>

        <OhVueIcon
          class="text-gray-400 hidden group-hover:block top-0 right-0 absolute scale-90"
          name="hi-chevron-down"
          :class="isOpen ? 'rotate-180' : ''"
          aria-label="open"
        />
      </div>
      <div class="mt-4 text-base">
        <div
          class="flex text-sm items-start w-full justify-between"
          :justify="org.locations.length ? 'space-between' : 'flex-end'"
        >
          <div class="flex items-center">
            <OhVueIcon
              name="fa-map-marker-alt"
              fill="#9BADB6"
              class="mr-[3px] scale-75 self-start"
            />
            <div class="flex flex-col lg:flex-row lg:items-center lg:gap-3">
              <div
                class="flex items-center gap-3"
                v-if="org.locations.length"
                v-for="(location, index) in org.locations"
                :key="location"
              >
                <div
                  class="hidden lg:block w-[3px] h-[3px] bg-gray-300"
                  v-if="index !== 0"
                />

                <div class="flex text-gray-light">{{ location }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 text-[15px] text-left leading-[22.5px]" mt="4">
          <p class="mt-2" v-html="org.description" />
        </div>
      </div>
    </div>
    <div v-if="org.posts.length" class="flex mt-4 w-full text-eightyk-500 justify-end">
      <button @click="handleClick">
        {{ isOpen ? "Hide" : "View" }} {{ org.posts.length }} active listings
      </button>
    </div>
  </button>
</template>
