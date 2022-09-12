<script setup lang="ts">
import { CHeading, CFormLabel, CBox } from "@chakra-ui/vue-next";

const props = defineProps<{
  attribute: string;
  label: string;
  items: Array<any>;
}>();

</script>

<template>
  <CBox mt="6">
    <CFormLabel
      font-size="xl"
      font-weight="bold"
      line-height="none"
    >
      {{ props.label }}
    </CFormLabel>

    <ais-numeric-menu
      :attribute="props.attribute"
      :items="props.items"
    />
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";

.ais-NumericMenu-label {
  margin-top: var(--sizes-1);
  @extend .chakra-radio;

  .ais-NumericMenu-labelText {
    margin-inline-start: 0.5rem;
    font-size: 1rem;

    &:hover {
      color: var(--colors-blue-500);
    }
  }
}
</style>
