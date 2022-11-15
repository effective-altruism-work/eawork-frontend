<script lang="ts">
// import { CBox, CIcon } from "@chakra-ui/vue-next";
import { connectSearchBox } from "instantsearch.js/es/connectors";
import { createWidgetMixin } from "vue-instantsearch/vue3/es";

export default {
  mixins: [createWidgetMixin({ connector: connectSearchBox })],
  props: {
    delay: {
      type: Number,
      default: 200,
      required: false,
    },
  },

  components: {
    // CBox,
    // CIcon,
  },
  data() {
    return {
      timerId: null,
      localQuery: "",
    };
  },
  created() {
    // this is a little untethered from index state, so we have to shimmy this in.
    const url = new URL(window.location.href);
    for (const [key, val] of url.searchParams.entries()) {
      if (key === "query") {
        this.localQuery = val;
      }
    }
  },

  destroyed() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  },
  computed: {
    query: {
      get() {
        return this.localQuery;
      },
      set(val) {
        this.localQuery = val;
        if (this.timerId) {
          clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
          this.state.refine(this.localQuery);
        }, this.delay);
      },
    },
  },
};
</script>

<template>
  <!-- <CBox position="relative" display="flex" align-items="center"> -->
  <input id="debounced-box" type="search" placeholder="Keywords" v-model="query" />
  <!-- <CIcon id="icon" w="6" h="6" name="search" color="grey" /> -->
  <!-- </CBox> -->
</template>
<!-- 
<style lang="scss">
// @import "~/styles/chakra-ui.scss";

#debounced-box {
  width: 100%;
  padding: var(--space-4);
  padding-left: var(--space-12);
  color: var(--colors-gray-900);
  border-radius: 12px;
  background: #e8ecee;
  transition: 0.2s all;

  &::placeholder {
    color: #3a4142;
  }
  &:hover {
    box-shadow: inset 0 0 0 1px #dae0e8 !important;
    background: #eef2f5;
  }
  &:active,
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px var(--colors-gray-300) !important;
    background: var(--colors-gray-50);
  }
  &:active,
  &:focus {
    &::placeholder {
      color: var(--colors-gray-500);
    }
  }
}

#icon {
  position: absolute;
  align-self: center;
  left: var(--space-4);
  margin-top: 1px;
}
</style> -->
