<script lang="ts" setup>
import { CFlex, CBox, CText, CLink } from "@chakra-ui/vue-next";
import JobCardTagInfo from "./job-card-tag-info.vue";

const props = defineProps<{
  area: string;
}>();

const isHovering = ref(false);

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
    case "Global priorities research":
      return "https://80000hours.org/problem-profiles/global-priorities-research";
  }
}
</script>

<template>
  <CFlex
    @mouseover="isHovering = true"
    @focus="isHovering = true"
    @mouseleave="isHovering = false"
    @blur="isHovering = false"
    direction="column"
    gap="3"
    bg="#F3FAF0"
    px="2"
    font-size="sm"
    border-radius="4px"
  >
    <CLink color="#466E35" is-external display="flex" align-items="center" target="_blank" :href="linkArea(area)">
      {{
        area === "Other (pressing)"
          ? "Climate change"
          : area === "Global health & poverty"
          ? "Global health & development"
          : area
      }}
      <JobCardTagInfo
        :isHovering="isHovering"
        v-if="area === 'Other policy-focused' || area === 'Information security'"
        :area="area"
      />
    </CLink>
  </CFlex>
</template>
