<script setup lang="ts">
import { TagDjango, TagTypeName } from "~/utils/types";
import { CText, CBadge, chakra } from "@chakra-ui/vue-next";
import Checkbox from "../chakra/checkbox.vue";
const props = defineProps<{
  label: string;
  attribute: string | TagTypeName;
  searchable?: boolean;
  limit?: number;
  showMoreLimit?: number;
  mt?: number | string;
  countBg?: string;
}>();
</script>

<template>
  <ais-toggle-refinement :attribute="props.attribute" :count-bg="props.countBg">
    <template v-slot="{ value, refine, createURL, sendEvent }">
      <Checkbox
        :modelValue="value.isRefined"
        @update:model-value="
          () => {
            createURL(value); // doesn't work
            refine(value);
          }
        "
      >
        <CText mt="1px" :_hover="{ color: 'blue.500' }">
          <span>
            {{ props.label }}
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
            {{ value.onFacetValue.count?.toLocaleString() }}
          </CBadge>
        </CText>
      </Checkbox>
    </template>
  </ais-toggle-refinement>
</template>
