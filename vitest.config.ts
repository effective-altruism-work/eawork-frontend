import { defineConfig } from "vitest/config";
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  test: {
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
});
