<script lang="ts" setup>
import { CFlex } from "@chakra-ui/vue-next";
import { computed, ref } from "vue";

const props = defineProps<{ modelValue: boolean }>();

const state = {
  id: ref(Math.random().toString(16).slice(2)),
};

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <label class="chakra-checkbox" :for="state.id.value" :_hover="{}">
    <input
      class="chakra-checkbox__input"
      type="checkbox"
      v-model="value"
      :id="state.id.value"
    />

    <CFlex
      class="chakra-checkbox__control"
      :class="{ 'chakra-checkbox__control__checked': value }"
      align-self="flex-start"
      mt="0.25em"
    >
      <CFlex align="center" h="100%" w="100%" transform="none" justify="center">
        <svg
          viewBox="0 0 12 10"
          style="
            fill: none;
            stroke-width: 2;
            stroke: currentColor;
            stroke-dasharray: 16;
            opacity: 1;
            stroke-dashoffset: 0;
          "
        >
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </CFlex>
    </CFlex>

    <span class="chakra-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.chakra-checkbox {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  position: relative;
  
  &:hover {
    .chakra-checkbox__control {
      border-color: var(--colors-blue-100);
    }
  }

  .chakra-checkbox__input {
    border: 0;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
  }

  .chakra-checkbox__control {
    margin-top: 5px;
    width: var(--sizes-4);
    transition: box-shadow var(--transition-duration-normal);
    border: 2px solid;
    border-color: inherit;
    border-radius: var(--radii-sm);
    color: var(--colors-white);
    height: var(--sizes-4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    user-select: none;
    flex-shrink: 0;
    background: white;

    &.chakra-checkbox__control__checked {
      background: var(--colors-blue-500) !important;
      border-color: var(--colors-blue-500);
      color: white;
    }
  }
  .chakra-checkbox__label {
    margin-inline-start: 0.6rem;
    user-select: none;
    font-size: var(--chakra-fontSizes-md);
  }
}
</style>
