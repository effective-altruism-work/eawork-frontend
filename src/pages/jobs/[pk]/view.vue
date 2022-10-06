<script setup lang="ts">
import { useHead, useRoute } from "#app";
import { JobView } from "#components";
import { CBox } from "@chakra-ui/vue-next";

useHead({ title: "Job" });

const route = useRoute();
</script>

<template>
  <CBox>
    <JobView :jobPk="route.params.pk" :is-visible="true" />
  </CBox>
</template>
