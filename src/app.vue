<script setup lang="ts">
import { useHead } from "#app";
import { CContainer, CFlex, CBox, CHeading, CLink, chakra } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { urls } from "~/constants";
import { theme } from "~/styles/theme";

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - EA Work` : "EA Work"),
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});
</script>

<template>
  <CBox bg="gray.50">
    <CBox :py="theme.spaces.md" bg="white">
      <CContainer
        max-w="6xl"
        align-itmes="baseline"
        h="fit-content"
        justify-content="space-between"
        display="flex"
        align-items="center"
      >
        <NuxtLink to="/">
          <CLink
            color="gray.700"
            :_hover="{color: 'blue.500'}"
          >
            <CFlex align="baseline">
              <chakra.img my="auto" src="/logo-ea.svg" h="30px" />
              <CHeading
                :ml="4"
                as="h2"
                font-size="1.5rem"
              >
                EA Work
              </CHeading>
            </CFlex>
          </CLink>
        </NuxtLink>

        <CFlex :gap="theme.spaces.md + 1" align="center">

          <NuxtLink :to="urls.about">
            <CLink
              color="gray.500"
              :_hover="{color: 'blue.900', textDecoration: 'none'}"
            >
              About
            </CLink>
          </NuxtLink>

          <CLink
            href="https://github.com/effective-altruism-work/eawork-backend/discussions/categories/feature-requests"
            is-external
            color="gray.500"
            :_hover="{color: 'blue.900'}"
          >
            Feature Requests
          </CLink>

          <CLink
            href="https://github.com/orgs/effective-altruism-work/repositories/"
            is-external
            :_hover="{'.ov-icon': {color: 'var(--colors-gray-600)'}}"
          >
            <OhVueIcon name="bi-github" scale="1.6" color="var(--colors-gray-500)" />
          </CLink>

        </CFlex>
      </CContainer>
    </CBox>

    <CContainer max-w="6xl" :pt="theme.spaces.md">
      <NuxtPage />
    </CContainer>
  </CBox>
</template>
