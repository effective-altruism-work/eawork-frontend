<script setup lang="ts">
  import { CFlex, CBox, CBadge, CIcon, CText } from "@chakra-ui/vue-next";

  const { data } = await useFetch("https://backend.eawork.org/api/jobs");
</script>

<template>
  <div>
    <h1>EA Work</h1>

    <ul>
      <li v-for="job in data">{{ job.title }}</li>
    </ul>
    
    <CBox w="100%" shadow="md" rounded="lg" p="5">Test</CBox>
  </div>
</template>
