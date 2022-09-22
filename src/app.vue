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
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - 80,000 hours` : "80,000 hours"),
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.ico" }],
});

</script>

<template>
  <CFlex direction="column" overflowX="hidden">

    <Menu />

    <CBox bg="#F4F6F7">
      <CContainer max-w="8xl" :px="[3, null, 4]">
        <NuxtPage />
      </CContainer>
    </CBox>

  </CFlex>
</template>

<style>
@import "~/styles/font-80k";
</style>
