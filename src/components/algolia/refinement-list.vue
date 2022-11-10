<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CText, CButton, CInput, CFormLabel, CLink } from "@chakra-ui/vue-next";
import axios from "axios";
import { onMounted, ref } from "vue";
import RefinementListFacets from "~/components/algolia/refinement-list-facets.vue";
import { TagDjango, TagTypeName, AlgoliaFilterItem } from "~/utils/types";
import { chakra } from "@chakra-ui/vue-next";
import * as Sentry from "@sentry/vue";
import { xRiskProblemAreas, acrossEAProblemAreas, otherProblemAreas } from "~/constants";
import EightykLink from "../eightyk/eightyk-link.vue";
import log from "~~/src/utils/log";
import { AisRefinementList } from "vue-instantsearch/vue3/es";

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

// const state = {
//   tagsFeatured: ref<TagDjango[]>([]),
//   tagsFeaturedNames: ref<string[]>([]),
//   config: useRuntimeConfig(),
// };

const inputVal = ref("");

const placeholder = computed(() => {
  let label = props.label.toLowerCase();
  switch (label) {
    case "organisation":
      return "organisations";
    case "city":
      return "cities";
    case "country":
      return "countries";
    default:
      return "";
  }
});

// onMounted(async () => {
//   if (props.attribute === "tags_area") {
//     const res = await axios.get(`${state.config.public.apiBase}/tags/?is_featured=true`);
//     if (!("data" in res) || !Array.isArray(res.data)) {
//       const error = new Error(
//         `No data returned from /tags/?is_featured=true. Data: ${JSON.stringify(res?.data)}`,
//       );
//       captureEvent(error);
//       return;
//     }

//     state.tagsFeatured.value = res.data;
//     state.tagsFeaturedNames.value = res.data.map((tag) => tag.name);
//   }
// });

const trueLimit = computed(() => {
  return !!props.locationType ? 24 : props.limit;
});

const locationCountRef = ref(0);

function morphFacetValues(
  items: AlgoliaFilterItem[],
  section?: "x-risk" | "across" | "other",
) {
  let filteredItems = items
    .filter((i) => i.value !== "Multiple experience levels")
    .map((i) => (i.label === "Other (pressing)" ? { ...i, label: "Climate change" } : i))
    .map((i) => ({
      ...i,
      hover:
        i.value === "Other policy-focused" || i.value === "Information security"
          ? true
          : false,
    }));

  // city or country
  if (props?.locationType && props?.trueItems) {
    let locationedItems: AlgoliaFilterItem[] = [];
    locationedItems = filteredItems.filter((i) => props.trueItems.includes(i.value));

    // side effect!!!
    locationCountRef.value = locationedItems.length;

    return locationedItems.slice(0, 8);
  }

  if (section) {
    if (section === "x-risk") {
      const ind = filteredItems.findIndex((i) => i.value === "Other policy-focused");

      if (ind !== -1) {
        filteredItems.push(filteredItems.splice(ind, 1)[0]);
      }

      return filteredItems.filter((item) => {
        console.log(item);
        return xRiskProblemAreas.includes(item.value as any);
      });
    }

    if (section === "across") {
      return filteredItems.filter((item) =>
        acrossEAProblemAreas.includes(item.value as any),
      );
    }

    if (section === "other") {
      return filteredItems.filter((item) => otherProblemAreas.includes(item.value as any));
    }
  }

  return filteredItems.slice(0, props.limit || 1000);
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

    <!-- :limit="trueLimit" -->
    <!-- :show-more-limit="props.showMoreLimit" -->

    <AisRefinementList
      :attribute="props.attribute"
      :searchable="props.searchable"
      :limit="1000"
      :sort-by="[props.attribute == 'tags_exp_required' ? 'name:asc' : '']"
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
          :value="inputVal"
          @input="
            (e) => {
              inputVal = e.currentTarget.value;
              searchForItems(e.currentTarget.value);
            }
          "
          :placeholder="`Search all ${
            props.locationType ? locationCountRef : items.length
          } ${placeholder}...`"
          mb="1"
          border-radius="md"
          bg="white"
        />

        <!-- MAIN. Non problem areas. -->
        <chakra.ul v-if="props.attribute !== 'tags_area'" mt="px">
          <li v-if="isFromSearch && !items.length">No results.</li>
          <RefinementListFacets
            :attribute="props.attribute"
            :items="morphFacetValues(items)"
            :refine="
              (currItem) => {
                carefulRefine(refine, currItem, items);
              }
            "
            :searchable="props.searchable"
            :count-bg="props.countBg"
          />
        </chakra.ul>

        <!-- problem areas -->
        <CBox v-else>
          <CText
            v-if="props.attribute === 'tags_area'"
            mt="3"
            font-weight="bold"
            color="gray.500"
            font-size="15px"
          >
            Reducing
            <EightykLink
              text-decoration="underline"
              text-decoration-thickness="1px"
              text-underline-offset="0.11em"
              color="gray.500"
              path="/articles/existential-risks"
              >existential risks</EightykLink
            >
          </CText>

          <chakra.ul mt="px">
            <li v-if="isFromSearch && !items.length">No results.</li>
            <RefinementListFacets
              :attribute="props.attribute"
              :items="morphFacetValues(items, 'x-risk')"
              :refine="
                (currItem) => {
                  carefulRefine(refine, currItem, items);
                }
              "
              :searchable="props.searchable"
              :count-bg="props.countBg"
            />
          </chakra.ul>

          <CBox v-if="props.attribute === 'tags_area'">
            <CText mt="3" font-weight="bold" color="gray.500" font-size="15px">
              Work across areas
            </CText>

            <chakra.ul mt="1px">
              <li v-if="isFromSearch && !items.length">No results.</li>
              <RefinementListFacets
                :items="morphFacetValues(items, 'across')"
                :refine="
                  (currItem) => {
                    carefulRefine(refine, currItem, items);
                  }
                "
                :searchable="props.searchable"
                :count-bg="props.countBg"
              />
            </chakra.ul>
          </CBox>

          <CBox v-if="props.attribute === 'tags_area'">
            <CText mt="3" font-weight="bold" color="gray.500" font-size="15px">
              Other important problems
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
          </CBox>

          <CButton size="sm" v-if="canToggleShowMore" @click="toggleShowMore">
            {{ !isShowingMore ? "Show more" : "Show less" }}
          </CButton>
        </CBox>
      </template>
    </AisRefinementList>
  </CBox>
</template>
