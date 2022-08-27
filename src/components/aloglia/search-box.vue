<script setup lang="ts">
import { CBox } from "@chakra-ui/vue-next";
</script>

<template>
  <CBox min-h="40px" class="algolia-search-box-main">
    <AisSearchBox />
    <AisStats>
      <template v-slot="{ nbHits }">
        {{nbHits}} jobs
      </template>
    </AisStats>
  </CBox>
</template>

<style lang="scss">
@import "~/theme/styles.scss";

.algolia-search-box-main {
  position: relative;

  .ais-SearchBox {
    .ais-SearchBox-form {
      display: flex;

      .ais-SearchBox-input {
        @include chakra-input;
      }
      .ais-SearchBox-submit {
        display: none;
      }
      .ais-SearchBox-reset {
        display: none;
      }
    }
  }
  
  .ais-Stats {
    position: absolute;
    color: var(--colors-gray-400);
    font-size: 0.7rem;
    right: 0;
    padding-top: 3px;
  }
}
</style>
