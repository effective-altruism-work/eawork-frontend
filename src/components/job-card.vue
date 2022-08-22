<script setup lang="ts">
import { CFlex, CBox, CHeading } from "@chakra-ui/vue-next";

const props = defineProps<{ job: Job }>();

interface Job {
  title: string;
  location: string;
  description: string;
  url: string;

  company?: {
    name: string;
    logo_url: string;
  };
}
</script>

<template>
  <CBox mb="12">
    <CFlex>
      <CBox w="56px" h="56px" bg="gray.200"></CBox>
      <CHeading ml="6" font-size="xl">{{ props.job.title }}</CHeading>
    </CFlex>

    <CBox mt="6" font-size="lg">
      <ais-snippet :hit="props.job" attribute="description"/>
    </CBox>
  </CBox>
</template>
