<script setup lang="ts">
import { CText, CBadge, chakra } from "@chakra-ui/vue-next";
import Checkbox from "~/components/chakra/checkbox.vue";
import { AlgoliaFilterItem } from "~~/src/utils/types";

const props = defineProps<{
  attribute?: string;
  items: AlgoliaFilterItem[];
  searchable: boolean;
  refine: (string) => void;
  countBg?: string;
}>();

function formatTagName(tagName: string) {
  switch (tagName) {
    case "Biosecurity & pandemic preparedness":
      return "Biosecurity & pandemic prep";
    case "International security & cooperation":
      return "International security & coop";
    case "Global":
      return "Remote, Global";
    default:
      return tagName;
  }
}
</script>

<template>
  <chakra.li v-for="item in props.items" :key="item.value" mt="1">
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
    </Checkbox>
  </chakra.li>
</template>
