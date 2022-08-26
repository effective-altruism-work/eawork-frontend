<script setup lang="ts">
import { CBox, CText, CButton, CBadge, CInput, CFormLabel } from "@chakra-ui/vue-next";
import Checkbox from "~/components/chakra/checkbox.vue";

const props = defineProps<{
  label: string;
  attribute: string;
  searchable?: boolean;
  limit?: number;
  showMoreLimit?: number;
}>();

function shortenTagName(tagName: string) {
  switch (tagName) {
    case "Biosecurity & pandemic preparedness":
      return "Biosecurity & pandemic prep";
    case "International security & cooperation":
      return "International security & cooperation";
  }
  return tagName;
}
</script>

<template>
  <CBox mt="6">
    <CFormLabel mb="1">{{ props.label }}</CFormLabel>

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
          placeholder="Filter..."
          size="sm"
          @input="searchForItems($event.currentTarget.value)"
          mb="1"
          border-radius="md"
        />
        <chakra.ul mt="1px">
          <li v-if="isFromSearch && !items.length">No results.</li>
          <li v-for="item in items" :key="item.value">
            <Checkbox
              :model-value="item.isRefined"
              @update:model-value="() => refine(item.value)"
            >
              <CText font-size="0.95rem" mt="1px" :_hover="{ color: 'blue.500' }">
                <ais-highlight v-if="props.searchable" attribute="item" :hit="item" />
                <span v-else>{{ shortenTagName(item.value) }}</span>
                <CBadge ml="1" mt="0" font-weight="normal" font-size="0.6rem">{{
                  item.count.toLocaleString()
                }}</CBadge>
              </CText>
            </Checkbox>
          </li>
        </chakra.ul>
        <CButton size="sm" v-if="canToggleShowMore" @click="toggleShowMore">
          {{ !isShowingMore ? "Show more" : "Show less" }}
        </CButton>
      </template>
    </AisRefinementList>
  </CBox>
</template>
