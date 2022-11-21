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
    :disabled="!org.posts.length"
    class="bg-white mb-4 w-full p-4 group lg:p-6 rounded-xl hover:cursor-pointer outline-gray-200 items-start justify-between flex flex-col"
    :class="isOpen ? 'outline' : 'hover:outline'"
    @click="handleClick"
  >
    <div class="w-full">
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
          <div class="w-fit">
            <JobCardTag
              v-for="area in org?.problem_areas"
              bg="bg-[#F3FAF0]"
              color="text-[#466E35]"
              :key="area"
              :tag="area"
            />
          </div>
        </div>

        <OhVueIcon
          v-if="org.posts.length"
          class="text-gray-400 hidden group-hover:block top-0 right-0 absolute scale-90"
          name="hi-chevron-down"
          :class="isOpen ? 'rotate-180' : ''"
          aria-label="open"
        />
      </div>
      <div class="mt-4 text-base">
        <div
          id="location-container"
          v-if="org?.locations?.length"
          class="flex text-sm items-start w-full justify-between"
          :justify="org?.locations?.length ? 'space-between' : 'flex-end'"
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
    <TransitionCollapseFade class="mt-4" :is-visible="isOpen" duration-ms="300">
      <h6 class="text-gray-400 text-lg text-left mb-1">Roles</h6>
      <NuxtLink class="text-left" v-for="post in org.posts" :to="`/?jobPk=${post.pk}`">
        <p class="text-eightyk-500">• {{ post.title }}</p>
      </NuxtLink>
    </TransitionCollapseFade>
    <div v-if="org.posts.length" class="flex mt-4 w-full text-eightyk-500 justify-end">
      <button>{{ isOpen ? "Hide" : "View" }} {{ org.posts.length }} active listings</button>
    </div>
  </button>
</template>
