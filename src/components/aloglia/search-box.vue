<script setup lang="ts"></script>

<template>
  <AisSearchBox />
</template>

<style lang="scss">
.ais-SearchBox {
  .ais-SearchBox-form {
    display: flex;

    .ais-SearchBox-input {
      height: var(--sizes-10);
      width: 100%;
      padding-inline-start: var(--space-4);
      padding-inline-end: var(--space-4);
      outline-offset: 2px;
      transition: var(--transition-property-common) var(--transition-duration-normal);
      outline: transparent solid 2px;
      font-size: var(--fontSizes-md);
      border-radius: var(--radii-md);
      border-width: 1px;
      background: white;

      &:hover {
        border-color: var(--colors-gray-300);
      }
      &:focus-visible {
        z-index: 1;
        border-color: rgb(49, 130, 206);
        box-shadow: rgb(49 130 206) 0 0 0 1px;
      }
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
