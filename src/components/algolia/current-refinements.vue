<script setup lang="ts">
import { formatDistance } from "date-fns";
import { OhVueIcon } from "oh-vue-icons";
import { AisCurrentRefinements } from "vue-instantsearch/vue3/es";
import { JobAlgolia } from "~~/src/utils/types";
import labelTag from "../../utils/labelTag";
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

  return labelTag(refinement.label);
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
  operator: string;
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
    <template
      v-slot="{ items, createURL }: { items: Item[], createURL: (r: Refinement) => void }"
    >
      <div class="flex flex-wrap gap-2" v-for="(item, i) in items" :key="item.attribute">
        <div
          class="flex items-center gap-2"
          :class="refinement.value.length > 20 ? 'flex-wrap' : 'flex-nowrap'"
          v-for="(refinement, j) in item.refinements"
          :key="
            [
              refinement.attribute,
              refinement.type,
              refinement.value,
              refinement.operator,
            ].join(':')
          "
        >
          <button
            class="text-[13px] bg-[#E1F0F2] px-2 border border-eightyk-500 h-[22px] text-eightyk-500 rounded"
            v-if="refinement.value !== 'Multiple experience levels'"
            :href="createURL(refinement)"
            @click="() => carefulRefine(item, refinement)"
            variant="outline"
          >
            {{ format(refinement) }}
            <OhVueIcon class="ml-2 relative top-[1px]" scale="0.75"  name="io-close" />
          </button>
          <button
            class="group ml-1 text-eightyk-700"
            v-if="i == items.length - 1 && j === item.refinements.length - 1"
            @click="() => clearAll(items)"
          >
            <p class="group-hover:underline">Clear all filters</p>
          </button>
        </div>
      </div>
    </template>
  </ais-current-refinements>
</template>

<style lang="scss">
.ais-CurrentRefinements {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;

  &.ais-CurrentRefinements--noRefinement {
    margin-bottom: 0;
  }
}
</style>
