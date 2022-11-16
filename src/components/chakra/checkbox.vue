<script lang="ts" setup>
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
  <label
    class="group align-top cursor-pointer inline-flex items-center relative"
    :for="state.id.value"
    :_hover="{}"
  >
    <input
      class="border-0 h-[1px] w-[1px] m-[-1px] p-0 overflow-hidden whitespace-nowrap absolute invisible"
      type="checkbox"
      v-model="value"
      :id="state.id.value"
    />

    <div
      class="group-hover:border-blue-100 self-start mt-1 w-4 border-2 border-inherit rounded-sm inline-flex items-center justify-center align-top select-none shrink-0 bg-white"
      :class="{ 'bg-eightyk-500 border-eightyk-500 text-white': value }"
    >
      <div class="flex items-center h-full w-full justify-center">
        <svg
          viewBox="0 0 12 12"
          stroke-dasharray="16"
          stroke-dashoffset="0"
          class="fill-none stroke-2 opacity-100 stroke-current"
          style=""
        >
          <polyline class="stroke-white" points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </div>
    </div>

    <span class="margin-left-0.5 select-none">
      <slot></slot>
    </span>
  </label>
</template>
