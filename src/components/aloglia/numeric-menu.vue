<script setup lang="ts">
import { CHeading, CBox } from "@chakra-ui/vue-next";

const props = defineProps<{
  attribute: string;
  label: string;
  items: Array<any>;
}>();

</script>

<template>
  <CBox mt="6">
    <CHeading size="sm" mb="2px" font-weight="normal">{{ props.label }}</CHeading>
    <ais-numeric-menu
      :attribute="props.attribute"
      :items="props.items"
    />
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";

.ais-NumericMenu-label {
  @extend .chakra-radio;

  .ais-NumericMenu-labelText {
    margin-inline-start: 0.5rem;
    font-size: 0.95rem;

    &:hover {
      color: var(--colors-blue-500);
    }
  }
}
</style>
