<script setup lang="ts">
import { TagDjango, TagTypeName } from "~/utils/types";
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

<style scoped>
.alg-label {
  cursor: pointer;
}

.alg-checkbox {
  width: var(--sizes-4);
  transition: box-shadow var(--transition-duration-normal);
  border: 2px solid;
  border-color: inherit;
  border-radius: var(--radii-sm);
  color: var(--colors-white);
  height: var(--sizes-4);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  user-select: none;
  flex-shrink: 0;
  background: white;
}

.alg-span {
  user-select: none;
  /* font-size: var(--chakra-fontSizes-md); */
}
</style>

<template>
  <ais-toggle-refinement
    :id="props.attribute + '-toggle'"
    :attribute="props.attribute"
    :count-bg="props.countBg"
    :label="props.label"
    :class-names="{
      'ais-ToggleRefinement-checkbox': 'alg-checkbox',
      'ais-ToggleRefinement-labelText': 'alg-label',
    }"
  >
    <template v-slot="{ value, refine, createURL, sendEvent }">
      <label
        class="alg-label"
        @click.prevent="
          () => {
            createURL(value);
            refine(value);
          }
        "
      >
        <Checkbox :modelValue="value.isRefined" />
        <span :class="'alg-span'">
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
          {{ value.count?.toLocaleString() }}
        </CBadge>
      </label>
    </template>
  </ais-toggle-refinement>
</template>
