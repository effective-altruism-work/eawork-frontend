<script setup lang="ts">
  import { useFetch } from "#app";
  import { CFlex, CBox, CBadge, CIcon, CText, CHeading } from "@chakra-ui/vue-next";
  
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
  <CBox>

    <CFlex>
      <CBox w="56px" h="56px" bg="gray.200"></CBox>
      <CHeading>{{ props.job.title }}</CHeading>
    </CFlex>

    <CBox font-size="lg">{{ props.job.description }}</CBox>

  </CBox>
</template>
