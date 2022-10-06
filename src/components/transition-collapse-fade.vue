<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { CBox } from "@chakra-ui/vue-next";

const props = defineProps<{
  isVisible: boolean;
  durationMs?: number | string;
}>();
</script>

<template>
  <CollapseTransition :duration="Number(props.durationMs) ?? 200">
    <CBox v-show="props.isVisible">
      <Transition name="fade">
        <CBox v-if="props.isVisible">
          <slot></slot>
        </CBox>
      </Transition>
    </CBox>
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
