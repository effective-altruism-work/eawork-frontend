<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";
import { CContainer, CFlex, CBox, CHeading, CLink, chakra } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { onBeforeMount } from "vue";
import { urls } from "~/constants";
import { theme } from "~/styles/theme";
import { tracking } from "~/utils/tracking";
import Menu from "~/components/eightyk/menu";

const state = {
  config: useRuntimeConfig(),
};

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - EA Work` : "EA Work"),
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});

onBeforeMount(async () => {
  await tracking.init(state.config.public.segmentId);
});

</script>

<template>
  <CFlex direction="column">

    <Menu />

    <CBox bg="#F4F6F7">
      <CContainer max-w="6xl" :pt="theme.spaces.md">
        <NuxtPage />
      </CContainer>
    </CBox>

  </CFlex>
</template>

<style>
@import "~/styles/font-80k";
</style>
