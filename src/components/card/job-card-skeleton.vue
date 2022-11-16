<script setup lang="ts">
// import { CFlex, CBox } from "@chakra-ui/vue-next";
import Skeleton from "~/components/chakra/skeleton.vue";
</script>

<template>
  <div class="mb-6 bg-white p-6 pr-5 rounded">
    <div class="w-full">
      <div class="flex w-full">
        <Skeleton w="62px" h="62px" />

        <div class="flex ml-3 gap-3 justify-between flex-1 flex-col">
          <Skeleton w="350px" h="18px" />
          <Skeleton w="125px" h="18px" />
          <div class="flex justify-between mb-1 w-full">
            <Skeleton w="100px" h="18px" />
            <Skeleton w="80px" h="18px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
