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
      <template v-else-if="props.companyName === 'Effective Ventures Operations'">
        Disclaimer:
        <em
          >EV Operations
          <a style="color: #0aa9bf" href="https://ev.org/ops/about/"
            >provides operations support</a
          >
          to 80,000 Hours.
        </em>
      </template>
      <template v-else-if="props.companyName === 'Open Philanthropy'">
        Disclaimer:
        <em
          >Open Philanthropy is 80,000 Hours'
          <a style="color: #0aa9bf" href="https://80000hours.org/about/donors/"
            >largest funder</a
          >.
        </em>
      </template>
      <template v-else-if="props.companyName === 'Berkeley Existential Risk Initiative'">
        Disclaimer:
        <em
          >80,000 Hours
          <a style="color: #0aa9bf" href="https://80000hours.org/about/donors/"
            >has received funding</a
          >
          from the Berkeley Existential Risk Initiative.
        </em>
      </template>
    </CBox>
  </CBox>
</template>
