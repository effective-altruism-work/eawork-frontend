<script setup lang="ts">
import { JobAlgolia } from "~/utils/types";
import JobCardTag from "./job-card-tag.vue";

const props = defineProps<{ job: JobAlgolia }>();
</script>

<template>
  <div>
    <div class="flex w-full gap-3 mt-3 flex-wrap">
      <JobCardTag
        bg="bg-[#F3FAF0]"
        color="text-[#466E35]"
        v-for="area in props.job.tags_area"
        :key="area"
        :tag="area"
      />

      <JobCardTag
        v-for="exp in props.job.tags_exp_required"
        :key="exp"
        bg="bg-[#EEF1FE]"
        color="text-[#202C58]"
        :tag="exp"
      >
      </JobCardTag>
    </div>

    <div class="flex gap-3 mt-3 -mb-1 flex-wrap" v-if="props.job.tags_skill.length">
      <JobCardTag
        v-for="skill in props.job.tags_skill"
        :key="skill"
        bg="bg-gray-50"
        color="text-blue-900"
        :tag="skill"
      />
    </div>
  </div>
</template>
