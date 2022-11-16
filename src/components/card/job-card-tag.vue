<script lang="ts" setup>
import { useBreakpoints } from "@vueuse/core";
import { ref, computed } from "vue";
import { breakpointsChakra } from "~~/src/constants";
import urlWrap from "~~/src/utils/urlWrap";
import labelTag from "~/utils/labelTag";
import JobCardTagInfo from "./job-card-tag-info.vue";

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
  <div
    class="flex flex-col gap-3 px-2 text-sm rounded relative"
    @mouseover="isHovering = true"
    @focus="isHovering = true"
    @mouseleave="isHovering = false"
    @blur="isHovering = false"
    :bg="props.bg"
  >
    <a
      class="flex items-center"
      :color="props.color"
      is-external
      @click="handleClick"
      target="_blank"
      rel="noopener noreferrer"
      :href="linkArea"
      :_hover="linkArea ? { color: 'black' } : null"
    >
      {{ labelTag(tag) }}
      <JobCardTagInfo
        :isHovering="isHovering"
        v-if="tag === 'Other policy-focused' || tag === 'Information security'"
        :area="tag"
      />
    </a>
  </div>
</template>
