<script lang="ts" setup>
import { CFlex, CBox, CText, CLink } from "@chakra-ui/vue-next";
import { breakpointsChakra } from "~~/src/constants";
import JobCardTagInfo from "./job-card-tag-info.vue";
import urlWrap from "~~/src/utils/urlWrap";

const props = defineProps<{
  tag: string;
  bg: string;
  color: string;
}>();

const breakpoints = useBreakpoints(breakpointsChakra);

const isHovering = ref(false);

const linkArea = computed(() => {
  // do not link on mobile.
  if (breakpoints.smaller("lg").value) {
    return null;
  }

  switch (props.tag) {
    case "Other (pressing)":
      return urlWrap`/problem-profiles/climate-change`;
    case "Global health & poverty":
      return urlWrap`/problem-profiles/health-in-poor-countries`;
    case "Other policy-focused":
      return null;
    case "AI safety & policy":
      return urlWrap`/problem-profiles/artificial-intelligence`;
    case "Factory farming":
      return urlWrap`/problem-profiles/factory-farming`;
    case "Biosecurity & pandemic preparedness":
      return urlWrap`/problem-profiles/preventing-catastrophic-pandemics`;
    case "Building effective altruism":
      return urlWrap`/problem-profiles/promoting-effective-altruism`;
    case "Information security":
      return urlWrap`/career-reviews/information-security`;
    case "Nuclear security":
      return urlWrap`/problem-profiles/nuclear-security`;
    case "Forecasting":
      return urlWrap`/career-reviews/forecasting`;
    case "Global priorities research":
      return urlWrap`/problem-profiles/global-priorities-research`;
    default:
      return null;
  }
});

function handleClick() {
  if (linkArea.value) {
    return;
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
    :bg="props.bg"
    px="2"
    font-size="sm"
    border-radius="4px"
    position="relative"
  >
    <CLink
      :color="props.color"
      is-external
      @click="handleClick"
      display="flex"
      align-items="center"
      target="_blank"
      :href="linkArea"
      :_hover="linkArea ? { color: 'black' } : null"
    >
      {{
        tag === "Other (pressing)"
          ? "Climate change"
          : tag === "Global health & poverty"
          ? "Global health & development"
          : tag
      }}
      <JobCardTagInfo
        :isHovering="isHovering"
        v-if="tag === 'Other policy-focused' || tag === 'Information security'"
        :area="tag"
      />
    </CLink>
  </CFlex>
</template>
