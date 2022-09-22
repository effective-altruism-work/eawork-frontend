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
  meta: [
    { name: "og:title", content: "80,000 Hours Job Board" },
    { name: "og:description", content: "A curated list of the most promising vacancies we're aware of. If you’re a good fit for one of these, it could be your best opportunity to help solve one of the world’s most pressing problems." },
    { name: "og:image", content: "https://80000hours.org/wp-content/uploads/2017/03/job_board_share_logos3.png" },
    { name: "og:image:width", content: "1200" },
    { name: "og:image:height", content: "630" },
    { name: "og:url", content: "https://jobs.80000hours.org/" },
    { name: "og:site_name", content: "80,000 Hours" },
    { name: "article:publisher", content: "https://www.facebook.com/80000Hours" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:description", content: "If you’re a good fit for one of these roles, it could be your best opportunity to help solve one of the world’s most pressing problems." },
    { name: "twitter:site", content: "@80000hours" },
  ],
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
