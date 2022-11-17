<script setup lang="ts">
import { useHead, useRoute } from "#app";
import JobPostOrEdit from "~/components/job-post-or-edit.vue";

useHead({ title: "Edit Job" });

const route = useRoute();

const jobPostPk = route.params.pk;
</script>

<template>
  <div />
  <!-- <CBox>
    <JobPostOrEdit :jobPk="jobPostPk" />
  </CBox> -->
</template>
