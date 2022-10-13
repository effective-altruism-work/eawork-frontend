<script setup lang="ts">
import { CBox, CLink } from "@chakra-ui/vue-next";

const props = defineProps<{
  companyName: string;
}>();
</script>
<template>
  <CBox position="absolute" bottom="0" left="0">
    <CBox
      margin="4"
      padding="6"
      background-color="rgba(255, 255, 255, 0.95)"
      width="350px"
      border-radius="md"
      shadow="inset 0 0 0 1px #E1E6EA"
    >
      This is one of our
      <CLink href="https://80000hours.org/job-board/top-orgs/"
        >top recommended organisations</CLink
      >.<template v-if="props.companyName === 'Alphabet, DeepMind'">
        We're only confident about recommending DeepMind roles working specifically on
        safety, ethics, policy, and security issues.</template
      >
      <template v-else-if="props.companyName === 'OpenAI'">
        We're only confident in recommending OpenAI roles working specifically on safety,
        policy and security issues.</template
      >
      <template v-else-if="props.companyName === 'Malaria Consortium'">
        GiveWell recommend their seasonal malaria chemoprevention program as
        <CLink href="https://www.givewell.org/charities/top-charities">
          one of their top-rated charities</CLink
        >.
      </template>
      <template v-else-if="props.companyName === 'Helen Keller International'">
        GiveWell recommend their vitamin A supplementation program as
        <CLink href="https://www.givewell.org/charities/top-charities">
          one of their top-rated charities</CLink
        >.
      </template>
    </CBox>
  </CBox>
</template>
