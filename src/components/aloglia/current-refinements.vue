<script setup lang="ts">
import { CButton, CFlex, CIcon } from "@chakra-ui/vue-next";
import { formatDistance } from "date-fns";

function format(refinement: {
  attribute: string;
  operator: "<=" | ">=" | string;
  value: string | number;
  label: string;
  type: any;
}) {
  if (refinement.attribute === "closes_at" || refinement.attribute === "posted_at") {
    const dateDistance = formatDistance(
      new Date((refinement.value as number) * 1000),
      new Date(),
    );
    if (refinement.attribute === "closes_at") {
      return `Closes in ${dateDistance}`;
    }
    if (refinement.attribute === "posted_at") {
      return `Posted ${dateDistance} ago`;
    }
  }
  return refinement.label;
}
</script>

<template>
  <ais-current-refinements>
    <template v-slot="{ items, createURL }">
      <CFlex v-for="item in items" :key="item.attribute" wrap="wrap" gap="2">
        <CFlex
          v-for="refinement in item.refinements"
          :key="
            [
              refinement.attribute,
              refinement.type,
              refinement.value,
              refinement.operator,
            ].join(':')
          "
          gap="2"
        >
          <CButton
            :href="createURL(refinement)"
            @click="item.refine(refinement)"
            variant="outline"
            size="xs"
            font-weight="normal"
            bg="#E1F0F2"
            color="blue.500"
            font-size="13px"
          >
            {{ format(refinement) }}
            <CIcon ml="2" mt="0.5" size="2" name="close" />
          </CButton>
        </CFlex>
      </CFlex>
    </template>
  </ais-current-refinements>
</template>

<style lang="scss">
.ais-CurrentRefinements {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);

  &.ais-CurrentRefinements--noRefinement {
    margin-bottom: 0;
  }
}
</style>
