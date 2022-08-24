<script setup lang="ts">
import { CBox, CHeading, CButton, CInput } from "@chakra-ui/vue-next";

const props = defineProps<{
  label: string;
  attribute: string;
  searchable?: boolean;
  limit?: number;
  showMoreLimit?: number;
}>();
</script>

<template>
  <CBox mt="6">
    <CHeading size="sm">{{ props.label }}</CHeading>

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
          v-if="isFromSearch"
          size="sm"
          @input="searchForItems($event.currentTarget.value)"
        />
        <ul>
          <li v-if="isFromSearch && !items.length">No results.</li>
          <li v-for="item in items" :key="item.value">
            <a
              :href="createURL(item)"
              :style="{ fontWeight: item.isRefined ? 'bold' : '' }"
              @click.prevent="refine(item.value)"
            >
              <ais-highlight attribute="item" :hit="item" />
              ({{ item.count.toLocaleString() }})
            </a>
          </li>
        </ul>
        <CButton size="sm" v-if="canToggleShowMore" @click="toggleShowMore">
          {{ !isShowingMore ? "Show more" : "Show less" }}
        </CButton>
      </template>
    </AisRefinementList>
  </CBox>
</template>
