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
        <ul>
          <li v-if="isFromSearch && !items.length">No results.</li>
          <li v-for="item in items" :key="item.value">
            <Checkbox
              :model-value="item.isRefined"
              @update:model-value="() => refine(item.value)"
            >
              <CText font-size="0.95rem" :_hover="{ color: 'blue.500' }">
                <ais-highlight attribute="item" :hit="item" />
                <CBadge ml="1" mt="-2px" font-weight="normal">{{
                  item.count.toLocaleString()
                }}</CBadge>
              </CText>
            </Checkbox>
          </li>
        </ul>
        <CButton size="sm" v-if="canToggleShowMore" @click="toggleShowMore">
          {{ !isShowingMore ? "Show more" : "Show less" }}
        </CButton>
      </template>
    </AisRefinementList>
  </CBox>
</template>
