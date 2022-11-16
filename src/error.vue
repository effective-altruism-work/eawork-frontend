<script setup lang="ts">
import { OhVueIcon } from "oh-vue-icons";
import Menu from "~/components/eightyk/menu.vue";

const props = defineProps<{
  error: { statusCode: number };
}>();
</script>

<template>
  <Menu />
  <div class="overflow-hidden">
    <div class="max-w-8xl px-3 lg:px-4">
      <div class="flex justify-center items-center h-[70vh]">
        <div>
          <h3 class="text-3xl font-bold" v-if="error.statusCode === 404">Page not found</h3>
          <h3 class="text-3xl font-bold" v-else>An error occurred</h3>
          <p class="text-xl mt-2">
            If you would like to report this
            {{ error.statusCode === 404 ? "as an error," : "error," }} you can do so
            <a href="https://80000hours.typeform.com/to/LG2lzrOC"
              >here <OhVueIcon class="mr-1" name="message-square" /> </a
            >.
          </p>
          <NuxtLink class="text-xl mt-6 block" path="/">Home</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
