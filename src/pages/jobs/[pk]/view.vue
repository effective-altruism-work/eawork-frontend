<script setup lang="ts">
import { useHead, useRoute } from "#app";
import { JobView } from "#components";

useHead({ title: "Job" });

const route = useRoute();
</script>

<template>
  <div />
  <!-- <div>
    <JobView :jobPk="route.params.pk" :is-visible="true" />
  </div> -->
</template>
