<script setup lang="ts">
import { useFetch, useHead, useRoute, useRuntimeConfig } from "#app";
import { JobDetails } from "#components";
import { CBox, CText, CLink } from "@chakra-ui/vue-next";

useHead({ title: "Job" });

const route = useRoute();

const jobPostPk = route.params.pk;

</script>

<template>
  <CBox>
    <JobDetails :jobPk="jobPostPk" :is-visible="true" />
  </CBox>
</template>
