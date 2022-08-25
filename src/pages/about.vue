<script setup lang="ts">
import { useHead } from "#app";
import { CBox, CHeading, CText, CLink } from "@chakra-ui/vue-next";
import { addIcons } from "oh-vue-icons";
import { BiGithub } from "oh-vue-icons/icons";
import { theme } from "~/theme/theme";

addIcons(BiGithub);

useHead({ title: "About" });
</script>

<template>
  <CBox max-w="2xl">
    <CHeading size="lg">About</CHeading>
    <CText :mt="theme.spaces.md">
      This is an MVP of a job board that daily imports
      <CLink href="https://80000hours.org/job-board/" is-external text-decoration="underline"
        >80'000 Hours jobs board</CLink
      >, adds extra tags (eg Software Engineering) and allows to subscribe to a fine-tuned
      search query.
    </CText>
    <CText :mt="theme.spaces.md">
      The source code can be found at
      <CLink
        href="https://github.com/orgs/effective-altruism-work/repositories/"
        is-external
        text-decoration="underline"
        >GitHub</CLink
      >
    </CText>
    <CText :mt="theme.spaces.md">
      For inquires please feel free to reach out to support@eawork.org.
    </CText>
  </CBox>
</template>
