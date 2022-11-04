<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CText, CButton, CInput, CFormLabel, CLink } from "@chakra-ui/vue-next";
import axios from "axios";
import { onMounted, ref } from "vue";
import RefinementListFacets from "~/components/aloglia/refinement-list-facets.vue";
import { TagDjango, TagTypeName, AlgoliaFilterItem } from "~/utils/types";
import { chakra } from "@chakra-ui/vue-next";
import * as Sentry from "@sentry/vue";
const { captureEvent } = Sentry;

const props = defineProps<{
  label: string;
  attribute: string | TagTypeName;
  searchable?: boolean;
  limit?: number;
  showMoreLimit?: number;
  mt?: number | string;
  countBg?: string;
}>();

const state = {
  tagsFeatured: ref<TagDjango[]>([]),
  tagsFeaturedNames: ref<string[]>([]),
  config: useRuntimeConfig(),
};

const placeholder = computed(() => {
  if (!props.searchable) return "";

  if (!props.label) return "Search...";
  switch (props.label[0].toLowerCase()) {
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
      return `Find an ${props.label.toLocaleLowerCase()}...`;
    default:
      return `Find a ${props.label.toLocaleLowerCase()}...`;
  }
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

function filterFacetValuesIfNeeded(items: any[], section?: "featured" | "other") {
  return items;
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
}
</script>

<template>
  <CBox :mt="props.mt ?? 6">
    <CFormLabel mb="3" font-size="xl" font-weight="bold" line-height="none">
      {{ props.label }}
    </CFormLabel>

    <!-- EXPERIENCE -->
    <AisRefinementList
      v-if="props.attribute == 'tags_exp_required'"
      :attribute="props.attribute"
      :searchable="props.searchable"
      :limit="props.limit"
      :sort-by="['name:asc']"
      :show-more-limit="props.showMoreLimit"
    >
      <template v-slot="{ items, refine }">
        <chakra.ul mt="px">
          <RefinementListFacets
            :searchable="props.searchable"
            :items="items.filter((item) => item.value !== 'Multiple experience levels')"
            :refine="
              (currItem) => {
                carefulRefine(refine, currItem, items);
              }
            "
            :count-bg="props.countBg"
          />
        </chakra.ul>
      </template>
    </AisRefinementList>

    <!-- MAIN -->
    <AisRefinementList
      v-else
      :attribute="props.attribute"
      :searchable="props.searchable"
      :limit="props.limit"
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

        <!-- bonus fellow we sneak inside the company_name section -->
        <AisRefinementList
          v-if="props.attribute === 'company_name'"
          attribute="company_is_recommended_org"
        >
          <template v-slot="{ items, refine }">
            <chakra.ul mt="px">
              <!-- at present we just want to include an for top organizations only, not an option for bottom orgs only -->
              <RefinementListFacets
                :items="
                  filterFacetValuesIfNeeded(
                    items.filter((i) => i.value !== 'false'),
                    'other',
                  ).map((i) => ({ ...i, label: 'Top recommended orgs' }))
                "
                :refine="refine"
                :searchable="false"
                :count-bg="props.countBg"
              />
            </chakra.ul>
          </template>
        </AisRefinementList>

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
            :items="
              filterFacetValuesIfNeeded(
                items
                  .filter((i) => i.value !== 'Global priorities research')
                  .map((i) =>
                    i.label === 'Other (pressing)' ? { ...i, label: 'Climate change' } : i,
                  )
                  .map((i) => ({
                    ...i,
                    hover:
                      i.value === 'Other-policy-focused'
                        ? 'We expect these to be good opportunities for career-building, and potentially help you directly contribute to existential risk reduction in the future'
                        : '',
                  })),
                'featured',
              )
            "
            :refine="refine"
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
              :items="
                filterFacetValuesIfNeeded(
                  items.map((i) =>
                    i.label === 'Other (pressing)' ? { ...i, label: 'Climate change' } : i,
                  ),
                  'other',
                )
              "
              :refine="refine"
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
