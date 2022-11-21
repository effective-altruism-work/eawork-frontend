<script setup lang="ts">
import { useHead, useRuntimeConfig } from "#app";
import { ref, onMounted } from "vue";
import Menu from "~/components/eightyk/menu.vue";
import EightykFooter from "~/components/eightyk/eightyk-footer.vue";

const state = {
  config: useRuntimeConfig(),
};

// delay loading footer to avoid safari issue
const show = ref(false);
onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 10);
});

const route = useRoute();

useHead({
  htmlAttrs: { lang: "en" },
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} - 80,000 Hours` : "80,000 Hours",
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" },
    {
      rel: "preconnect",
      crossorigin: true,
      href: `https://${state.config.public.algoliaApplicationId}-dsn.algolia.net`,
    },
  ],
  meta: [
    { name: "og:title", content: "80,000 Hours Job Board" },
    {
      name: "description",
      content:
        "A curated list of the most promising vacancies we're aware of. If you’re a good fit for one of these, it could be your best opportunity to help solve one of the world’s most pressing problems.",
    },
    {
      name: "og:description",
      content:
        "A curated list of the most promising vacancies we're aware of. If you’re a good fit for one of these, it could be your best opportunity to help solve one of the world’s most pressing problems.",
    },
    {
      name: "og:image",
      content:
        "https://80000hours.org/wp-content/uploads/2017/03/job_board_share_logos3.png",
    },
    { name: "og:image:width", content: "1200" },
    { name: "og:image:height", content: "630" },
    { name: "og:url", content: "https://jobs.80000hours.org/" },
    { name: "og:site_name", content: "80,000 Hours" },
    { name: "article:publisher", content: "https://www.facebook.com/80000Hours" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:description",
      content:
        "If you’re a good fit for one of these roles, it could be your best opportunity to help solve one of the world’s most pressing problems.",
    },
    { name: "twitter:site", content: "@80000hours" },
  ],
});
</script>

<template>
  <div class="flex flex-col overflow-x-hidden">
    <Menu />
    <div class="bg-[#F4F6F7]">
      <div class="max-w-8xl mx-auto px-3 lg:px-4">
        <!-- <div class="absolute left-4">
          <NuxtLink
            class="block"
            :class="$route.path === '/' ? 'text-black-50' : 'text-gray-light'"
            to="/"
            >• Jobs</NuxtLink
          >
          <NuxtLink
            class="block"
            :class="$route.path === '/organisations' ? 'text-black-50' : 'text-gray-light'"
            to="/organisations"
            >• Organisations</NuxtLink
          >
        </div> -->
        <NuxtPage />
      </div>
    </div>
    <LazyEightykFooter v-if="show" />
  </div>
</template>

<style>
@import "~/styles/app.css";
</style>
