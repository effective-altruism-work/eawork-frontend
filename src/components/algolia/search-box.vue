<script setup lang="ts">
import { CBox, CText, CFlex, CIcon } from "@chakra-ui/vue-next";
// import AlgoliaLogo from "~/components/algolia/algolia-logo.vue";
import { AisSearchBox, AisStats } from "vue-instantsearch/vue3/es";

const props = defineProps<{
  isShowResultsCount: boolean;
}>();
</script>

<template>
  <CBox
    min-h="40px"
    class="algolia-search-box-main"
    pos="relative"
    :mb="props.isShowResultsCount ? 0 : 6"
  >
    <AisSearchBox placeholder="Keywords">
      <template v-slot:submit-icon>
        <CIcon w="6" h="6" name="search" color="grey" />
      </template>
    </AisSearchBox>
    <AisStats v-if="props.isShowResultsCount">
      <template v-slot="{ nbHits, page, nbSortedHits, hitsPerPage, nbPages }">
        <CFlex my="5" gap="1" justify="flex-end">
          <CText font-weight="bold">{{ nbHits }}</CText> roles
          <!-- <CText
            >Page: {{ page }}, nbSortedHits: {{ nbSortedHits }}, hits per page:
            {{ hitsPerPage }}, nbPages: {{ nbPages }}</CText
          > -->
        </CFlex>
      </template>
    </AisStats>
    <!--    <AlgoliaLogo/>-->
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";

.algolia-search-box-main {
  position: relative;

  .ais-SearchBox {
    .ais-SearchBox-form {
      display: flex;

      .ais-SearchBox-input {
        width: 100%;
        padding: var(--space-4);
        padding-left: var(--space-12);
        color: var(--colors-gray-900);
        border-radius: 12px;
        background: #e8ecee;
        transition: 0.2s all;

        &::placeholder {
          color: #3a4142;
        }
        &:hover {
          box-shadow: inset 0 0 0 1px #dae0e8 !important;
          background: #eef2f5;
        }
        &:active,
        &:focus {
          outline: none;
          box-shadow: inset 0 0 0 1px var(--colors-gray-300) !important;
          background: var(--colors-gray-50);
        }
        &:active,
        &:focus {
          &::placeholder {
            color: var(--colors-gray-500);
          }
        }
      }
      .ais-SearchBox-submit {
        position: absolute;
        align-self: center;
        left: var(--space-4);
      }
      .ais-SearchBox-reset {
        display: none;
      }
    }
  }
}
</style>
