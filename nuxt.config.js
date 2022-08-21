import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
  ],
  head: {
    title: 'my website title',
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
});
