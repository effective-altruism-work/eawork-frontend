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

<style lang="scss">
.ais-NumericMenu-label {
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  cursor: pointer;

  &:hover {
    input[type="radio"] {
      &::before {
        border-color: rgb(229, 231, 235);
      }
    }
  }

  input[type="radio"] {
    appearance: none;
    position: relative;
    clip: rect(0px, 0px, 0px, 0px);
    width: 16px;
    height: 16px;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      border: 2px solid;
      border-radius: 9999px;
      width: 16px;
      height: 16px;
      background: white;
      border-color: rgb(229, 231, 235);
    }

    &:checked::before {
      background: #0aa9bf;
      border-color: #0aa9bf;
    }

    &:checked::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 9999px;
      width: 50%;
      height: 50%;
      background: white;
    }
  }

  .ais-NumericMenu-labelText {
    margin-inline-start: 0.5rem;
    font-size: 1rem;

    &:hover {
      color: #0aa9bf;
    }
  }
}
</style>
