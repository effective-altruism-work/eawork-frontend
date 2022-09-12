<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CText, CFlex, CLink, CHeading, CButton, CUnorderedList, CSpacer, CListItem, chakra } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { ref } from "vue";
import Filters from "~/components/aloglia/filters.vue";
import { useStateVar } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";
import { OhVueIcon } from "oh-vue-icons";

const state = useStateVar(() => {
  const config = useRuntimeConfig();
  return {
    config,
    searchClient: algoliasearch(
      config.public.algoliaApplicationId,
      config.public.algoliaApiKey,
    ),
  };
});

</script>

<template>
  <CBox bg="gray.100">
    <AisInstantSearch
      :search-client="state.searchClient"
      index-name="jobs_prod"
    >
      <CFlex
        pos="absolute"
        left="0"
        bottom="0"
        w="100vw"
        h="94vh"
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
            border-radius="full"
            color-scheme="gray"
            color="blue.500"
            bg="#F4F6F7"
            size="sm"
          >
            <OhVueIcon
              name="io-close"
              scale="1"
              style="position: absolute"
            />
          </CButton>
        </CFlex>
        
        <Filters :is-show-results-count="false" />
  
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
          <CButton
            font-weight="normal"
          >
            <chakra.span mr="2">SHOW RESULTS:</chakra.span>
            <AisStats>
              <template v-slot="{ nbHits }">{{ nbHits }}</template>
            </AisStats>
          </CButton>
        </CFlex>
  
      </CFlex>
    </AisInstantSearch>
  </CBox>
</template>

<style lang="scss">
body {
  background: var(--colors-gray-200) !important;
}
</style>