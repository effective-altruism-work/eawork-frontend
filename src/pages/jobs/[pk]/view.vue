<script setup lang="ts">
import { useFetch, useHead, useRoute, useRuntimeConfig } from "#app";
import { JobView } from "#components";
import { CBox, CText, CLink } from "@chakra-ui/vue-next";

useHead({ title: "Job" });

const route = useRoute();

</script>

<template>
  <CBox>
    <JobView :jobPk="route.params.pk" :is-visible="true" />
  </CBox>
</template>
