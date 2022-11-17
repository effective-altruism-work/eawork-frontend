<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { OhVueIcon } from "oh-vue-icons";

const props = defineProps<{
  careerConsultancyBg?: string;
}>();

const hooks = {
  config: useRuntimeConfig(),
};
</script>

<template>
  <div class="flex mt-2 lg:mt-7 mb-2 lg:mb-0 flex-col gap-3">
    <a
      class="flex items-center"
      href="https://airtable.com/shrD9UEKusc6BYWWc/tbl5zkv6T7WSivZ89"
    >
      <OhVueIcon class="w-4 relative left-0.5" name="ri-share-box-fill" />
      <p class="ml-2">View all roles in a spreadsheet</p>
    </a>
    <a class="flex items-center" href="https://80000hours.typeform.com/to/LG2lzrOC">
      <OhVueIcon class="w-4 relative left-0.5" name="ri-chat-4-line" />
      <p class="ml-2">Give us feedback</p>
    </a>

    <div
      class="mt-1 text-[15px] bg-white rounded-lg py-5 px-6 gap-1"
      :bg="props.careerConsultancyBg ?? 'white'"
    >
      <p>
        Talk with our team for free if you are interested in working on one of our top
        problem areas
      </p>
      <a
        class="font-bold mt-2 block text-eightyk-400 text-sm"
        href="https://80000hours.org/speak-with-us/?int_campaign=job_board"
      >
        SPEAK WITH US
        <span class="ml-2">→</span>
      </a>
    </div>
  </div>
</template>
