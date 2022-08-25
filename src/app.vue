<script setup lang="ts">
import { useHead } from "#app";
import { CContainer, CFlex, CBox, CHeading, CLink } from "@chakra-ui/vue-next";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiGithub } from "oh-vue-icons/icons";
import { theme } from "~/theme/theme";

addIcons(BiGithub);

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - EA Work` : "EA Work"),
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});
</script>

<template>
  <CBox :py="theme.spaces.md * 2" bg="blue.50">
    <CContainer
      max-w="6xl"
      align-itmes="baseline"
      h="fit-content"
      justify-content="space-between"
      display="flex"
      align-items="center"
    >
      <NuxtLink href="/">
        <CHeading line-height="0.7">EA Work</CHeading>
      </NuxtLink>

      <CFlex :gap="theme.spaces.md" align-items="center">
        <CFlex align-items="center">
          <NuxtLink to="/about"> About </NuxtLink>
        </CFlex>

        <CLink
          href="https://github.com/orgs/effective-altruism-work/repositories/"
          is-external
        >
          <OhVueIcon name="bi-github" scale="1.6" color="var(--colors-gray-500)" />
        </CLink>
      </CFlex>
    </CContainer>
  </CBox>

  <CContainer max-w="6xl" :pt="theme.spaces.md * 2">
    <NuxtPage />
  </CContainer>
</template>
