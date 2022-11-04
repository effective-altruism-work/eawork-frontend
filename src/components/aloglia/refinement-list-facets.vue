<script setup lang="ts">
import { CText, CBadge, chakra } from "@chakra-ui/vue-next";
import Checkbox from "~/components/chakra/checkbox.vue";
import FacetHoverText from "~/components/facet-hover-text.vue";
import { AlgoliaFilterItem } from "~~/src/utils/types";

const props = defineProps<{
  attribute?: string;
  items: AlgoliaFilterItem[];
  searchable: boolean;
  refine: (string) => void;
  countBg?: string;
}>();

const isHovering = ref("");

function formatTagName(tagName: string) {
  switch (tagName) {
    case "Biosecurity & pandemic preparedness":
      return "Biosecurity & pandemic prep";
    case "International security & cooperation":
      return "International security & coop";
    case "Global":
      return "Remote, Global";
    case "Global health & poverty":
      return "Global health & development";
    case "Software Engineering":
      return "Software engineering";
    default:
      return tagName;
  }
}
</script>

<template>
  <chakra.li
    v-for="item in props.items"
    :key="item.value"
    @mouseover="isHovering = item.value"
    @focus="isHovering = item.value"
    @mouseleave="isHovering = ''"
    @blur="isHovering = ''"
    position="relative"
    mt="1"
  >
    <Checkbox
      :model-value="item.isRefined"
      @update:model-value="() => props.refine(item.value)"
    >
      <CText mt="1px" :_hover="{ color: 'blue.500' }">
        <ais-highlight v-if="props.searchable" attribute="item" :hit="item" />
        <span v-else>
          {{ formatTagName(item.label) }}
        </span>
        <CBadge
          ml="2"
          mt="0"
          py="2px"
          px="4px"
          font-weight="normal"
          font-size="xs"
          color="gray.400"
          border-radius="4px"
          :bg="props.countBg ?? 'white'"
        >
          {{ item.count.toLocaleString() }}
        </CBadge>
      </CText>
      <FacetHoverText v-if="item?.hover && isHovering === item.value" :text="item?.hover" />
    </Checkbox>
  </chakra.li>
</template>
