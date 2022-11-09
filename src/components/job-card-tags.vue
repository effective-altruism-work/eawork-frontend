<script setup lang="ts">
import { CFlex, CBox, CText, CLink } from "@chakra-ui/vue-next";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{ job: JobAlgolia }>();

function linkArea(area: string) {
  switch (area) {
    case "Other (pressing)":
      return "https://80000hours.org/problem-profiles/climate-change";
    case "Global health & poverty":
      return "https://80000hours.org/problem-profiles/health-in-poor-countries";
    case "Other policy-focused":
      return "";
    case "AI safety & policy":
      return "https://80000hours.org/problem-profiles/artificial-intelligence";
    case "Factory farming":
      return "https://80000hours.org/problem-profiles/factory-farming";
    case "Biosecurity & pandemic preparedness":
      return "https://80000hours.org/problem-profiles/preventing-catastrophic-pandemics";
    case "Building effective altruism":
      return "https://80000hours.org/problem-profiles/promoting-effective-altruism";
    case "Information security":
      return "https://80000hours.org/career-reviews/information-security";
    case "Nuclear security":
      return "https://80000hours.org/problem-profiles/nuclear-security";
    case "Forecasting":
      return "https://80000hours.org/career-reviews/forecasting";
    case 'Global priorities research':
      return "https://80000hours.org/problem-profiles/global-priorities-research"
  }
}
</script>

<template>
  <CBox>
    <CFlex w="100%" gap="3" mt="3" wrap="wrap">
      <CFlex
        v-for="area in props.job.tags_area"
        :key="area"
        direction="column"
        gap="3"
        bg="#F3FAF0"
        px="2"
        font-size="sm"
        border-radius="4px"
      >
        <CLink color="#466E35" is-external target="_blank" :href="linkArea(area)">
          <!-- <CText> -->
          {{
            area === "Other (pressing)"
              ? "Climate change"
              : area === "Global health & poverty"
              ? "Global health & development"
              : area
          }}
          <!-- </CText> -->
        </CLink>
      </CFlex>

      <!--        <CFlex-->
      <!--          v-for="workload in props.job.tags_workload"-->
      <!--          :key="workload"-->
      <!--          direction="column"-->
      <!--          gap="3"-->
      <!--          bg="#fbf6ed"-->
      <!--          px="2"-->
      <!--          font-size="sm"-->
      <!--        >-->
      <!--          <CText color="#98702e">{{ workload }}</CText>-->
      <!--        </CFlex>-->

      <CFlex
        v-for="exp in props.job.tags_exp_required"
        :key="exp"
        direction="column"
        gap="3"
        bg="#EEF1FE"
        px="2"
        font-size="sm"
        border-radius="4px"
      >
        <CText color="#202C58">{{ exp }}</CText>
      </CFlex>

      <!--        <CFlex-->
      <!--          v-for="location in props.job.tags_location_type"-->
      <!--          :key="location"-->
      <!--          direction="column"-->
      <!--          gap="3"-->
      <!--          bg="#EBF7F4"-->
      <!--          px="2"-->
      <!--          font-size="sm"-->
      <!--        >-->
      <!--          <CText color="#0E6D6F">{{ location }}</CText>-->
      <!--        </CFlex>-->
    </CFlex>

    <CFlex v-if="props.job.tags_skill.length" gap="3" mt="3" mb="-1" wrap="wrap">
      <CFlex
        v-for="skill in props.job.tags_skill"
        :key="skill"
        px="2"
        bg="gray.50"
        color="blue.900"
      >
        {{ skill }}
      </CFlex>
    </CFlex>
  </CBox>
</template>
