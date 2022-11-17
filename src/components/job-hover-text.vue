<script setup lang="ts">
const props = defineProps<{
  companyName: string;
}>();
</script>
<template>
  <div class="absolute bottom-0 left-0">
    <div
      class="m-4 p-6 opacity-95 bg-white w-[350px] rounded shadow"
      shadow="inset 0 0 0 1px #E1E6EA"
    >
      This is one of our
      <a href="https://80000hours.org/job-board/top-orgs/">top recommended organisations</a
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
        <a href="https://www.givewell.org/charities/top-charities">
          one of their top-rated charities</a
        >.
      </template>
      <template v-else-if="props.companyName === 'Helen Keller International'">
        GiveWell recommend their vitamin A supplementation program as
        <a href="https://www.givewell.org/charities/top-charities">
          one of their top-rated charities</a
        >.
      </template>
      <template v-else-if="props.companyName === 'Effective Ventures Operations'">
        Disclaimer:
        <em
          >EV Operations
          <a href="https://ev.org/ops/about/">provides operations support</a>
          to 80,000 Hours.
        </em>
      </template>
      <template v-else-if="props.companyName === 'Open Philanthropy'">
        Disclaimer:
        <em
          >Open Philanthropy is 80,000 Hours'
          <a href="https://80000hours.org/about/donors/">larget funder</a>.
        </em>
      </template>
      <template v-else-if="props.companyName === 'Berkeley Existential Risk Initiative'">
        Disclaimer:
        <em
          >80,000 Hours
          <a href="https://80000hours.org/about/donors/">has received funding</a>
          from the Berkeley Existential Risk Initiative.
        </em>
      </template>
    </div>
  </div>
</template>
