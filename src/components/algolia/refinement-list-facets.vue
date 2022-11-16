<script setup lang="ts">
import Checkbox from "~/components/chakra/checkbox.vue";
import FacetHoverText from "~/components/facet-hover-text.vue";
import { AlgoliaFilterItem } from "~/utils/types";
import { OhVueIcon } from "oh-vue-icons";
import { AisHighlight } from "vue-instantsearch/vue3/es";
import labelTag from "~/utils/labelTag";
import Badge from "../generics/badge.vue";

const props = defineProps<{
  attribute?: string;
  items: AlgoliaFilterItem[];
  searchable: boolean;
  refine: (string) => void;
  countBg?: string;
  // searchStatement?: string;
}>();
</script>

<template>
  <li class="relative mt-1" v-for="item in props.items" :key="item.value">
    <Checkbox
      :model-value="item.isRefined"
      @update:model-value="() => props.refine(item.value)"
    >
      <div class="mt-1">
        <p class="inline hover:text-blue-500">
          <ais-highlight
            v-if="props.searchable && item.value != 'is_recommended_org'"
            attribute="item"
            :hit="item"
          />
          <span v-else>{{ labelTag(item.label) }}</span>
        </p>
        <span class="group">
          <OhVueIcon
            class="hidden group-hover:block scale-75 ml-1 text-[#aaaaaa] opacity-60 relative"
            name="io-information-circle"
          />
          <FacetHoverText
            class="hidden group-hover:block"
            v-if="item?.hover"
            :area="item.value"
          />
        </span>
        <Badge class="ml-2 mt-0 py-0.5 px-1 text-xs text-gray-400 rounded bg-white">
          {{ item.count.toLocaleString() }}
        </Badge>
      </div>
    </Checkbox>
  </li>
</template>
