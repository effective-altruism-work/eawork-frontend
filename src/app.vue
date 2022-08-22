<script setup lang="ts">
import { useHead } from "#app";
import { CContainer } from "@chakra-ui/vue-next";

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - EA Work` : "EA Work"),
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});
</script>

<template>
  <CContainer maxW="6xl">
    <NuxtPage />
  </CContainer>
</template>
