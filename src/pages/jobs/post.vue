<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";
import { JobPostOrEdit } from "#components";
import { CBox } from "@chakra-ui/vue-next";

useHead({ title: "Post Job" });

</script>

<template>
  <JobPostOrEdit/>
</template>
