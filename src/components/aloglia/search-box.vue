<script setup lang="ts">
import { CBox, CText, CFlex } from "@chakra-ui/vue-next";
import AlgoliaLogo from "~/components/aloglia/algolia-logo.vue";
</script>

<template>
  <CBox min-h="40px" class="algolia-search-box-main" pos="relative">
    <AisSearchBox />
    <AisStats>
      <template v-slot="{ nbHits }">
        <CFlex my="6" gap="1" justify="flex-end">
          <CText font-weight="bold">{{nbHits}}</CText> roles
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
