<script setup lang="ts">
import { useFetch, useHead, useRoute, useRuntimeConfig } from "#app";
import { CBox, CText, CLink } from "@chakra-ui/vue-next";
import JobPostOrEdit from "~/components/job-post-or-edit.vue";

useHead({ title: "Edit Job" });

const route = useRoute();

const jobPostPk = route.params.pk;

</script>

<template>
  <CBox>
    <JobPostOrEdit :jobPk="jobPostPk" />
  </CBox>
</template>
