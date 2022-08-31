<script setup lang="ts">
import { CBox, CLink } from "@chakra-ui/vue-next";

</script>

<template>
  <CBox>

    <CLink
      href="https://github.com/effective-altruism-work/eawork-backend/discussions/categories/feature-requests"
      color="gray.500"
      :_hover="{color: 'blue.900'}"
    >
      Feature Requests
    </CLink>

    <NuxtPage />
  </CBox>
</template>
