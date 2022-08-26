<script setup lang="ts">
import { CButton, CBox, CIcon } from "@chakra-ui/vue-next";
import { theme } from "~/theme/theme";
</script>

<template>
  <ais-current-refinements>
    <template v-slot="{ items, createURL }">
      <CBox v-for="item in items" :key="item.attribute" :mt="theme.spaces.md / 2">
        <CBox
          v-for="refinement in item.refinements"
          :key="
            [
              refinement.attribute,
              refinement.type,
              refinement.value,
              refinement.operator,
            ].join(':')
          "
        >
          <CButton
            :href="createURL(refinement)"
            @click="item.refine(refinement)"
            :right-icon="icon"
            variant="outline"
            size="xs"
            mb="2"
            font-weight="normal"
          >
            {{ refinement.label }}<CIcon ml="2" mt="0.5" size="2" name="close" />
          </CButton>
        </CBox>
      </CBox>
    </template>
  </ais-current-refinements>
</template>
