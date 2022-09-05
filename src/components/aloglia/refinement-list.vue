<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CText, CButton, CBadge, CInput, CFormLabel } from "@chakra-ui/vue-next";
import axios from "axios";
import { onMounted, ref } from "vue";
import RefinementListFacets from "~/components/aloglia/refinement-list-facets.vue";
import { TagDjango, TagTypeName } from "~/utils/types";

const props = defineProps<{
  label: string;
  attribute: string | TagTypeName;
  searchable?: boolean;
  limit?: number;
  showMoreLimit?: number;
  mt?: number | string;
}>();

const state = {
  tagsFeatured: ref<TagDjango[]>([]),
  tagsFeaturedNames: ref<string[]>([]),
  config: useRuntimeConfig(),
}

onMounted(async () => {
  if (props.attribute === "tags_area") {
    const res = await axios.get(`${state.config.public.apiBase}/tags/?is_featured=true`);
    state.tagsFeatured.value = res.data;
    state.tagsFeaturedNames.value = res.data.map(tag => tag.name);
  }
})

function filterFacetValuesIfNeeded(items: any[], section?: "featured" | "other") {
  if (props.attribute === "tags_area") {
    if (section === "featured") {
      return items.filter(item => state.tagsFeaturedNames.value.includes(item.value));
    } else if (section === "other") {
      return items.filter(item => !state.tagsFeaturedNames.value.includes(item.value));
    }
  }
  return items;
}

</script>

<template>
  <CBox :mt="props.mt ?? 6">
    <CFormLabel mb="2" line-height="1">{{ props.label }}</CFormLabel>

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
          size="sm"
          @input="searchForItems($event.currentTarget.value)"
          mb="1"
          border-radius="md"
          bg="white"
        />

        <CText
          v-if="props.attribute === 'tags_area'"
          mt="2"
          font-weight="bold"
          font-size="13px"
        >
          Top recommended problems
        </CText>

        <chakra.ul mt="1px">
          <li v-if="isFromSearch && !items.length">No results.</li>
          <RefinementListFacets
            :items="filterFacetValuesIfNeeded(items, 'featured')"
            :refine="refine"
            :searchable="props.searchable"
          />
        </chakra.ul>

        <CBox v-if="props.attribute === 'tags_area'">

          <CText
            mt="2"
            font-weight="bold"
            font-size="13px"
          >
            Other pressing problems
          </CText>
          
          <chakra.ul mt="1px">
            <li v-if="isFromSearch && !items.length">No results.</li>
            <RefinementListFacets
              :items="filterFacetValuesIfNeeded(items, 'other')"
              :refine="refine"
              :searchable="props.searchable"
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
