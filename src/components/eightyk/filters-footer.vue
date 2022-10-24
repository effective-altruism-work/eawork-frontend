<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CIcon, CLink, CText, CVStack, chakra } from "@chakra-ui/vue-next";

const props = defineProps<{
  careerConsultancyBg?: string;
}>();

const hooks = {
  config: useRuntimeConfig(),
};
</script>

<template>
  <CFlex
    :mt="{ base: 2, lg: 7 }"
    :mb="{ base: 2, lg: 0 }"
    direction="column"
    gap="3"
    font-size="15px"
  >
    <CLink is-external href="https://airtable.com/shrD9UEKusc6BYWWc/tbl5zkv6T7WSivZ89">
      <CIcon name="external-link" mb="px" mr="1" />
      View all roles in a spreadsheet
    </CLink>
    <CLink href="https://80000hours.typeform.com/to/LG2lzrOC">
      <CIcon name="message-square" mb="px" mr="1" />
      Give us feedback
    </CLink>

    <CVStack
      mt="1"
      :bg="props.careerConsultancyBg ?? 'white'"
      border-radius="lg"
      p="5"
      gap="1"
    >
      <CText
        >Talk with our team for free if you are interested in working on one of our top
        problem areas</CText
      >
      <CLink
        href="https://80000hours.org/speak-with-us/?int_campaign=job_board"
        font-size="13px"
        font-weight="bold"
        color="blue.400"
      >
        SPEAK WITH US
        <chakra.span ml="2" font-size="md">→</chakra.span>
      </CLink>
    </CVStack>
  </CFlex>
</template>
