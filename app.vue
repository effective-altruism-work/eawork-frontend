<script setup lang="ts">
  import { useHead } from "#app";
  import { CContainer } from "@chakra-ui/vue-next";
  
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - EA Work` : 'EA Work';
    },
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  })
</script>

<template>
  <CContainer>
    <NuxtPage />
  </CContainer>
</template>
