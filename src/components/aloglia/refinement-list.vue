<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CText, CButton, CInput, CFormLabel, CLink } from "@chakra-ui/vue-next";
import axios from "axios";
import { onMounted, ref } from "vue";
import RefinementListFacets from "~/components/aloglia/refinement-list-facets.vue";
import { TagDjango, TagTypeName, AlgoliaFilterItem } from "~/utils/types";
import { chakra } from "@chakra-ui/vue-next";
import { SearchClient, SearchIndex } from "algoliasearch";
import * as Sentry from "@sentry/vue";

const { captureEvent } = Sentry;

const props = defineProps<{
  label: string;
  attribute: string | TagTypeName;
  searchable?: boolean;
  limit?: number;
  showMoreLimit?: number;
  mt?: number | string;
  trueItems?: string[];
  locationType?: "country" | "city";
  amount?: number;
  countBg?: string;
}>();

const state = {
  tagsFeatured: ref<TagDjango[]>([]),
  tagsFeaturedNames: ref<string[]>([]),
  config: useRuntimeConfig(),
};

const placeholder = computed(() => {
  let label = props.label.toLowerCase();
  switch (label) {
    case "organisation":
      label = "organisations";
      break;
    case "city":
      label = "cities";
      break;
    case "country":
      label = "countries";
      break;
  }
  return `Search all ${props.amount} ${label}...`;
});

onMounted(async () => {
  if (props.attribute === "tags_area") {
    const res = await axios.get(`${state.config.public.apiBase}/tags/?is_featured=true`);
    if (!("data" in res) || !Array.isArray(res.data)) {
      const error = new Error(
        `No data returned from /tags/?is_featured=true. Data: ${JSON.stringify(res?.data)}`,
      );
      captureEvent(error);
      return;
    }

    state.tagsFeatured.value = res.data;
    state.tagsFeaturedNames.value = res.data.map((tag) => tag.name);
  }
});

const trueLimit = computed(() => {
  return !!props.locationType ? 24 : props.limit;
});

function morphFacetValues(items: AlgoliaFilterItem[], section?: "featured" | "other") {
  let filteredItems = items
    .filter(
      (i) =>
        i.value !== "Global priorities research" && i.value !== "Multiple experience levels",
    )
    .map((i) => (i.label === "Other (pressing)" ? { ...i, label: "Climate change" } : i))
    .map((i) => ({
      ...i,
      hover:
        i.value === "Other policy-focused"
          ? "We expect these to be good opportunities for career-building, and potentially help you directly contribute to existential risk reduction in the future"
          : "",
    }));

  if (props?.locationType && props?.trueItems) {
    let locationedItems: AlgoliaFilterItem[] = [];
    if (props.locationType === "country") {
      locationedItems = filteredItems.filter((i) => props.trueItems.includes(i.value));
    } else {
      locationedItems = filteredItems.filter((i) => props.trueItems.includes(i.value));
    }

    return locationedItems.slice(0, 8);
  }

  return filteredItems;

  // if (props.attribute === "tags_area") {
  //   if (section === "featured") {
  //     return items.filter((item) => state.tagsFeaturedNames.value.includes(item.value));
  //   }
  //   if (section === "other") {
  //     return items.filter((item) => !state.tagsFeaturedNames.value.includes(item.value));
  //   }
  // }
  // return items;
}

function carefulRefine(
  basicRefine: (x: AlgoliaFilterItem | string) => void,
  currItemValue: string,

  items: AlgoliaFilterItem[],
) {
  if (props.attribute === "tags_exp_required") {
    const howManyRefinedBefore = items.reduce(
      (acc, currItem) => (currItem.isRefined ? acc + 1 : acc),
      0,
    );

    basicRefine(currItemValue);

    const currItem = items.find((i) => i.value === currItemValue);
    const isRemoval = howManyRefinedBefore === 2 && currItem.isRefined;

    if (howManyRefinedBefore === 0 || isRemoval) {
      basicRefine("Multiple experience levels"); // only trigger this when we move between 0 and 1 filters.
    }

    return;
  }

  basicRefine(currItemValue);
}
</script>

<template>
  <CBox :mt="props.mt ?? 6">
    <CFormLabel mb="3" font-size="xl" font-weight="bold" line-height="none">
      {{ props.label }}
    </CFormLabel>

    <AisRefinementList
      :attribute="props.attribute"
      :searchable="props.searchable"
      :limit="trueLimit"
      :sort-by="[props.attribute == 'tags_exp_required' ? 'name:asc' : '']"
      :show-more-limit="props.showMoreLimit"
    >
      <template
        v-slot="{
          items,
          isShowingMore,
          isFromSearch,
          canToggleShowMore,
          refine,
          toggleShowMore,
          searchForItems,
        }"
      >
        <CInput
          v-if="props.searchable"
          :placeholder="placeholder"
          @input="searchForItems($event.currentTarget.value)"
          mb="1"
          border-radius="md"
          bg="white"
        />

        <!-- <CText
          v-if="props.attribute === 'tags_area'"
          mt="3"
          font-weight="bold"
          color="gray.500"
          font-size="15px"
        >
          Reducing
          <CLink
            is-external
            text-decoration="underline"
            color="gray.500"
            href="https://80000hours.org/articles/existential-risks/"
            >existential risks</CLink
          >
        </CText> -->

        <chakra.ul mt="px">
          <li v-if="isFromSearch && !items.length">No results.</li>
          <RefinementListFacets
            :attribute="props.attribute"
            :items="morphFacetValues(items, 'featured')"
            :refine="
              (currItem) => {
                carefulRefine(refine, currItem, items);
              }
            "
            :searchable="props.searchable"
            :count-bg="props.countBg"
          />
        </chakra.ul>

        <!-- <CBox v-if="props.attribute === 'tags_area'">
          <CText mt="3" font-weight="bold" color="gray.500" font-size="15px">
            Other pressing problems
          </CText>

          <chakra.ul mt="1px">
            <li v-if="isFromSearch && !items.length">No results.</li>
            <RefinementListFacets
              :items="morphFacetValues(items, 'other')"
:refine="
              (currItem) => {
                carefulRefine(refine, currItem, items);
              }
            "
              :searchable="props.searchable"
              :count-bg="props.countBg"
            />
          </chakra.ul>
        </CBox> -->

        <CButton size="sm" v-if="canToggleShowMore" @click="toggleShowMore">
          {{ !isShowingMore ? "Show more" : "Show less" }}
        </CButton>
      </template>
    </AisRefinementList>
  </CBox>
</template>
