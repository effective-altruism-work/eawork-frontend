<script setup lang="ts"></script>

<template>
  <AisSearchBox />
</template>

<style lang="scss">
@import "~/theme/styles.scss";

.ais-SearchBox {
  .ais-SearchBox-form {
    display: flex;

    .ais-SearchBox-input {
      @extend .chakra-input;
    }
    .ais-SearchBox-submit {
      display: none;
    }
    .ais-SearchBox-reset {
      display: none;
    }
  }
}
</style>
