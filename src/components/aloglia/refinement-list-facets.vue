<script setup lang="ts">
import { CBox, CText, CButton, CBadge, CInput, CFormLabel } from "@chakra-ui/vue-next";
import Checkbox from "~/components/chakra/checkbox.vue";

const props = defineProps<{
  items: Array<{
    value: string;
    label: string;
    count: number;
    isRefined: boolean;
  }>;
  searchable: boolean;
  refine: (string) => void;
}>();

function shortenTagName(tagName: string) {
  switch (tagName) {
    case "Biosecurity & pandemic preparedness":
      return "Biosecurity & pandemic prep";
    case "International security & cooperation":
      return "International security & cooperation";
  }
  return tagName;
}

</script>

<template>
  <li v-for="item in props.items" :key="item.value">
    <Checkbox
      :model-value="item.isRefined"
      @update:model-value="() => props.refine(item.value)"
    >
      <CText font-size="0.95rem" mt="1px" :_hover="{ color: 'blue.500' }">
        <ais-highlight v-if="props.searchable" attribute="item" :hit="item" />
        <span v-else>
          {{ shortenTagName(item.value) }}
        </span>
        <CBadge ml="1" mt="0" font-weight="normal" font-size="0.6rem">
          {{ item.count.toLocaleString() }}
        </CBadge>
      </CText>
    </Checkbox>
  </li>
</template>
