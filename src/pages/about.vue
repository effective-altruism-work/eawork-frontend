<script setup lang="ts">
import { useHead } from "#app";
import { CBox, CText, CLink, CUnorderedList, CListItem } from "@chakra-ui/vue-next";
import { addIcons } from "oh-vue-icons";
import { BiGithub } from "oh-vue-icons/icons";
import { theme } from "~/styles/theme";

addIcons(BiGithub);

useHead({ title: "About" });
</script>

<template>
  <CBox max-w="2xl">
    <CText :mt="theme.spaces.md / 4">
      This is an MVP of a job board that daily imports
      <CLink href="https://80000hours.org/job-board/" is-external>80'000 Hours jobs board</CLink>, 
      adds extra tags (eg Software Engineering) and allows to subscribe to a fine-tuned
      search query.
    </CText>
    <CText :mt="theme.spaces.md / 1.5">
      The source code can be found at
      <CLink
        href="https://github.com/orgs/effective-altruism-work/repositories/"
        is-external
        >GitHub</CLink
      >.
    </CText>
    <CText :mt="theme.spaces.md / 1.5">
      Features:
    </CText>
    <CUnorderedList>
      <CListItem>80k import + possibility to post full details</CListItem>
      <CListItem>Customizable email alerts</CListItem>
      <CListItem>Job posts versioning (for managing multiple edit proposals)</CListItem>
      <CListItem>Extra fields + stackoverflow-like tagging system (salary, skills, workload type, generic tagging, etc)</CListItem>
    </CUnorderedList>
    <CText :mt="theme.spaces.md / 1.5">
      For inquires please feel free to reach out to
      <CLink href="mailto:support@eawork.org" is-external>support@eawork.org</CLink>.
    </CText>
  </CBox>
</template>
