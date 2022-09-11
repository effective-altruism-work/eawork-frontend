<script setup lang="ts">
import { CBox, CText, CFlex } from "@chakra-ui/vue-next";
import AlgoliaLogo from "~/components/aloglia/algolia-logo.vue";
</script>

<template>
  <CBox min-h="40px" class="algolia-search-box-main" pos="relative">
    <AisSearchBox placeholder="Keywords" />
    <AisStats>
      <template v-slot="{ nbHits }">
        <CFlex my="5" gap="1" justify="flex-end">
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
        width: 100%;
        padding: var(--space-4);
        color: var(--colors-gray-900);
        border-radius: 12px;
        background: #E8ECEE;
        
        &::placeholder {
          color: #3a4142;
        }
        &:hover {
          box-shadow: inset 0 0 0 1px #dae0e8 !important;
        }
        &:active, &:focus {
          outline: none;
          box-shadow: inset 0 0 0 1px var(--colors-gray-300) !important;
        }
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
