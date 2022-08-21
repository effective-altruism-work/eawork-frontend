<script setup lang="ts">
import { useFetch, useHead, useLazyFetch, useRuntimeConfig } from "#app";
  import { CFlex, CBox, CBadge, CIcon, CText, CHeading } from "@chakra-ui/vue-next";
  import JobCard from "~/components/job-card.vue";

  const config = useRuntimeConfig();
  const { data } = await useLazyFetch(`${config.public.apiBase}/jobs`);
</script>

<template>
  <CHeading mt="6">EA Work</CHeading>

  <CBox mt="12">
    <JobCard v-for="job in data" :job="job" />
  </CBox>
</template>
