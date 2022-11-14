<script setup lang="ts">
import { chakra, CFlex, CHeading, CButton, CBox, CText, CSpacer } from "@chakra-ui/vue-next";
import CurrentRefinements from "~/components/algolia/current-refinements.vue";
import Refinements from "~/components/algolia/refinements.vue";
import FiltersFooter from "~/components/eightyk/filters-footer.vue";
import SearchBox from "~/components/algolia/search-box.vue";
import { OhVueIcon } from "oh-vue-icons";
import { SearchIndex } from "algoliasearch/lite";
import { AisStats } from "vue-instantsearch/vue3/es";

const props = defineProps<{
  isShowMobileFilters: boolean;
  index: SearchIndex;
  totalFiltersLength: number;
  queryJson: {
    query: string;
    facetFilters: string[][];
  } | null;
}>();

const emit = defineEmits(["showMobile", "hideMobile"]);
</script>

<template>
  <VueFinalModal
    v-model="props.isShowMobileFilters"
    :click-to-close="true"
    :esc-to-close="true"
    @click-outside="emit('hideMobile')"
  >
    <CFlex
      pos="absolute"
      left="0"
      bottom="0"
      w="100vw"
      h="92vh"
      gap="6"
      p="6"
      pt="7"
      direction="column"
      bg="white"
      border-radius="12px"
      border-bottom-radius="0"
      overflow="scroll"
    >
      <CFlex justify="space-between" align="center" my="-1">
        <CHeading size="lg" line-height="none">Filters</CHeading>
        <CButton
          @click="emit('hideMobile')"
          size="sm"
          color-scheme="gray"
          border-radius="full"
          color="blue.500"
          bg="#F4F6F7"
        >
          <OhVueIcon name="io-close" scale="1" style="position: absolute" />
        </CButton>
      </CFlex>

      <SearchBox :is-show-results-count="true" />
      <CBox mt="12">
        <CurrentRefinements />
      </CBox>
      <CBox mb="7">
        <Alerts
          :total-filters-length="props.totalFiltersLength"
          :query-json="props.queryJson"
        />
      </CBox>
      <Refinements :index="props.index" />
      <FiltersFooter />

      <CSpacer mt="12" />
      <CFlex
        pos="fixed"
        bottom="0"
        left="0"
        w="100vw"
        h="fit-content"
        p="4"
        px="6"
        justify="center"
        bg="#F4F6F7"
      >
        <CButton @click="emit('hideMobile')" font-weight="normal">
          <chakra.span mr="2">SHOW RESULTS:</chakra.span>
          <AisStats>
            <template v-slot="{ nbHits }">{{ nbHits }}</template>
          </AisStats>
        </CButton>
      </CFlex>
    </CFlex>
  </VueFinalModal>
</template>
