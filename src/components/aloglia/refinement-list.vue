<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CText, CButton, CInput, CFormLabel } from "@chakra-ui/vue-next";
import axios from "axios";
import { onMounted, ref } from "vue";
import RefinementListFacets from "~/components/aloglia/refinement-list-facets.vue";
import { TagDjango, TagTypeName } from "~/utils/types";
import NumericMenu from "~/components/aloglia/numeric-menu.vue";
import AlgoliaToggle from "./algolia-toggle.vue";

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

onMounted(async () => {
  if (props.attribute === "tags_area") {
    const res = await axios.get(`${state.config.public.apiBase}/tags/?is_featured=true`);
    state.tagsFeatured.value = res.data;
    state.tagsFeaturedNames.value = res.data.map((tag) => tag.name);
  }
});

function filterFacetValuesIfNeeded(items: any[], section?: "featured" | "other") {
  if (props.attribute === "tags_area") {
    if (section === "featured") {
      return items.filter((item) => state.tagsFeaturedNames.value.includes(item.value));
    }
    if (section === "other") {
      return items.filter((item) => !state.tagsFeaturedNames.value.includes(item.value));
    }
  }
  return items;
}

function log(i) {
  console.log(i);
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
          createURL,
          toggleShowMore,
          searchForItems,
          sendEvent,
        }"
      >
        <CInput
          v-if="props.searchable"
          placeholder="Search..."
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
                  ).map((i) => ({ ...i, label: 'Top organisations only' }))
                "
                :refine="refine"
                :searchable="false"
                :count-bg="props.countBg"
              />
            </chakra.ul>
          </template>
        </AisRefinementList>

        <CText
          v-if="props.attribute === 'tags_area'"
          mt="3"
          font-weight="bold"
          font-size="13px"
        >
          Top recommended problems
        </CText>

        <chakra.ul mt="px">
          <li v-if="isFromSearch && !items.length">No results.</li>
          <RefinementListFacets
            :items="filterFacetValuesIfNeeded(items, 'featured')"
            :refine="refine"
            :searchable="props.searchable"
            :count-bg="props.countBg"
          />
        </chakra.ul>

        <CBox v-if="props.attribute === 'tags_area'">
          <CText mt="3" font-weight="bold" font-size="13px"> Other pressing problems </CText>

          <chakra.ul mt="1px">
            <li v-if="isFromSearch && !items.length">No results.</li>
            <!-- MAIN -->
            <RefinementListFacets
              :items="filterFacetValuesIfNeeded(items, 'other')"
              :refine="refine"
              :searchable="props.searchable"
              :count-bg="props.countBg"
            />
          </chakra.ul>
        </CBox>

        <CButton size="sm" v-if="canToggleShowMore" @click="toggleShowMore">
          {{ !isShowingMore ? "Show more" : "Show less" }}
        </CButton>
      </template>
    </AisRefinementList>
  </CBox>
</template>
