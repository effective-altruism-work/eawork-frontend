<script lang="ts">
import { connectSearchBox } from "instantsearch.js/es/connectors";
import { OhVueIcon } from "oh-vue-icons";
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
  components: { OhVueIcon },
};
</script>

<template>
  <div class="relative flex items-center">
    <input
      type="search"
      placeholder="Keywords"
      class="w-full text-gray-900 pl-12 p-4 h-14 rounded-xl bg-[#e8ecee] placeholder-gray-500 hover:outline outline-gray-300 hover:bg-[#eef2f5] active:outline focus:outline active:bg-gray-50 focus:bg-gray-50"
      v-model="query"
    />
    <OhVueIcon
      id="icon"
      scale="1.2"
      class="absolute self-center left-4 mt-[1px]"
      w="6"
      h="6"
      name="io-search"
      color="grey"
    />
  </div>
</template>
