<script setup lang="ts">
import { useFetch, useHead } from "#app";
  import { CFlex, CBox, CBadge, CIcon, CText, CHeading } from "@chakra-ui/vue-next";
  import JobCard from "~/components/job-card.vue";

  const { data } = await useFetch("https://backend.eawork.org/api/jobs");
  
  useHead({ title: 'EA Work' });
</script>

<template>
  <CHeading mt="6">EA Work</CHeading>

  <CBox mt="12">
    <JobCard v-for="job in data" :job="job" />
  </CBox>
</template>
