<script setup lang="ts">
import { CBox } from "@chakra-ui/vue-next";
</script>

<template>
  <CBox class="algolia-search-box-main">
    <AisSearchBox />
  </CBox>
</template>

<style lang="scss">
@import "~/theme/styles.scss";

.algolia-search-box-main {
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
}
</style>
