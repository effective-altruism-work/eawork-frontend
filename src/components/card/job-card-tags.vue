<script setup lang="ts">
import { CFlex, CBox, CText, CLink } from "@chakra-ui/vue-next";
import { JobAlgolia } from "~/utils/types";
import JobCardTag from "./job-card-tag.vue";

const props = defineProps<{ job: JobAlgolia }>();
</script>

<template>
  <CBox>
    <CFlex w="100%" gap="3" mt="3" wrap="wrap">
      <JobCardTag
        bg="#F3FAF0"
        color="#466E35"
        v-for="area in props.job.tags_area"
        :key="area"
        :tag="area"
      />

      <JobCardTag
        v-for="exp in props.job.tags_exp_required"
        :key="exp"
        bg="#EEF1FE"
        color="#202C58"
        :tag="exp"
      >
      </JobCardTag>
    </CFlex>

    <CFlex v-if="props.job.tags_skill.length" gap="3" mt="3" mb="-1" wrap="wrap">
      <JobCardTag
        v-for="skill in props.job.tags_skill"
        :key="skill"
        bg="gray.50"
        color="blue.900"
        :tag="skill"
      />
    </CFlex>
  </CBox>
</template>
