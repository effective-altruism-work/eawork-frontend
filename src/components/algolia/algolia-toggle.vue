<script setup lang="ts">
import { TagDjango, TagTypeName } from "~/utils/types";
import { AisToggleRefinement } from "vue-instantsearch/vue3/es";
import Checkbox from "../generics/checkbox.vue";
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
  <ais-toggle-refinement :attribute="props.attribute">
    <template v-slot="{ value, refine }">
      <!-- <a :href="createURL(value)" @click.prevent="refine(value)"> -->
      <Checkbox
        :modelValue="value.isRefined"
        @update:model-value="
          () => {
            refine(value);
            // createURL(value); // doesn't work
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
      <!-- </a> -->
    </template>
  </ais-toggle-refinement>
</template>
