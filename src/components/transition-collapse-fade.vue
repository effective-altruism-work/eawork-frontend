<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";

const props = defineProps<{
  isVisible: boolean;
  durationMs?: number | string;
}>();
</script>

<template>
  <CollapseTransition :duration="Number(props.durationMs) ?? 200">
    <div v-show="props.isVisible">
      <Transition name="fade">
        <div v-if="props.isVisible">
          <slot></slot>
        </div>
      </Transition>
    </div>
  </CollapseTransition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
