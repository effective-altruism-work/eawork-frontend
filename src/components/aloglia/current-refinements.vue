<script setup lang="ts">
import { CButton, CBox, CFlex, CIcon } from "@chakra-ui/vue-next";
import { theme } from "~/styles/theme";
</script>

<template>
  <ais-current-refinements>
    <template v-slot="{ items, createURL }">
      <CFlex
        v-for="item in items"
        :key="item.attribute"
        wrap="wrap"
        gap="2"
      >
        <CFlex
          v-for="refinement in item.refinements"
          :key="
            [
              refinement.attribute,
              refinement.type,
              refinement.value,
              refinement.operator,
            ].join(':')
          "
          gap="2"
        >
          <CButton
            :href="createURL(refinement)"
            @click="item.refine(refinement)"
            variant="outline"
            size="xs"
            font-weight="normal"
          >
            {{ refinement.label }}
            <CIcon ml="2" mt="0.5" size="2" name="close" />
          </CButton>
        </CFlex>
      </CFlex>
    </template>
  </ais-current-refinements>
</template>

<style lang="scss">
  .ais-CurrentRefinements {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
    &.ais-CurrentRefinements--noRefinement {
      margin-bottom: 0;
    }
  }
</style>
