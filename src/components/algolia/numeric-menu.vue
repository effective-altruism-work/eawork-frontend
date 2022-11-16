<script setup lang="ts">
import { AisNumericMenu } from "vue-instantsearch/vue3/es";
const props = defineProps<{
  attribute: string;
  label: string;
  items: Array<any>;
}>();
</script>

<template>
  <div class="mt-6">
    <label class="text-xl font-bold leading-none">
      {{ props.label }}
    </label>

    <ais-numeric-menu :attribute="props.attribute" :items="props.items" />
  </div>
</template>

<!-- <style lang="scss">
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
} -->
