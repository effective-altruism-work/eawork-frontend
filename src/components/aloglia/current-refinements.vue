<script setup lang="ts">
import { CButton, CFlex, CIcon } from "@chakra-ui/vue-next";
import { formatDistance } from "date-fns";

type Item = {
  attribute: string;
  refine: (r: Refinement) => any;
  refinements: Refinement[];
};

function format(refinement: {
  attribute: string;
  operator: "<=" | ">=" | string;
  value: string | number;
  label: string;
  type: any;
}) {
  if (refinement.attribute === "closes_at" || refinement.attribute === "posted_at") {
    let dateDistance = formatDistance(
      new Date((refinement.value as number) * 1000),
      new Date(),
    );

    let hasAbout = dateDistance.includes("about");
    dateDistance = dateDistance.replace("about", "within");
    if (refinement.attribute === "closes_at") {
      return `Closes ${hasAbout ? "" : "in "}${dateDistance}`;
    }
    if (refinement.attribute === "posted_at") {
      return `Posted ${dateDistance} ago`;
    }
  }

  if (refinement.attribute === "company_is_recommended_org") {
    return refinement.value ? "Top recommended orgs" : "All orgs"; // this latter should never happen, to be clear.
  }

  if (refinement.label === "Other (pressing)") {
    return "Climate change";
  }

  return refinement.label;
}

function clearAll(items: Item[]) {
  for (const item of items) {
    for (const refinement of item.refinements) {
      item.refine(refinement);
    }
  }
}

type Refinement = {
  attribute: string;
  type: string;
  value: string;
  label: string;
  count: number;
  exhaustive: boolean;
};
function carefulRefine(
  item: {
    attribute: string;
    refine: (r: Refinement) => any;
    refinements: Refinement[];
  },
  refinement: Refinement,
) {
  const refinementIndex = item.refinements.findIndex((r) => r.value === refinement.value);

  // if we are deleting the last visible experience tag, we also want to delete the invisible Multi-Experience tag.
  if (
    item.attribute === "tags_exp_required" &&
    item.refinements.length === 2 &&
    refinementIndex !== -1
  ) {
    const multiExpIndex = refinementIndex === 0 ? 1 : 0;
    const multiExpRef = item.refinements[multiExpIndex];
    item.refine(multiExpRef);
  }

  item.refine(refinement);
}
</script>

<template>
  <ais-current-refinements>
    <template v-slot="{ items, createURL }">
      <CFlex v-for="(item, i) in items" :key="item.attribute" wrap="wrap" gap="2">
        <CFlex
          align-items="center"
          v-for="(refinement, j) in item.refinements"
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
            v-if="refinement.value !== 'Multiple experience levels'"
            :href="createURL(refinement)"
            @click="() => carefulRefine(item, refinement)"
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
          <button
            v-if="i == items.length - 1 && j === item.refinements.length - 1"
            @click="() => clearAll(items)"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 9999px;
              background-color: white;
              color: #484e51;
              border: 1.5px solid #484e51;
              width: 20px;
              height: 20px;
            "
          >
            <CIcon size="2" name="close" />
          </button>
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
