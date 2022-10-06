<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CFormLabel } from "@chakra-ui/vue-next";
import algoliasearch, { SearchClient } from "algoliasearch";
import { onMounted, ref, watch } from "vue";
import "@formkit/themes/genesis";
import VueTagsInput from "@sipec/vue3-tags-input";
import { debounce } from "vue-debounce";
import { theme } from "~/styles/theme";
import { useStateVar } from "~/utils/structs";
import { Tag, TagTypeName } from "~/utils/types";
import FormHelperText from "~/components/chakra/form-helper-text.vue";

const props = defineProps<{
  typeLabel: string;
  typeName: TagTypeName;
  tags?: string[];
  helpText?: string;
}>();

const emit = defineEmits<{
  (e: "tagsChanged", tagName: TagTypeName, tagsNew: Array<Tag>): void;
}>();

const state = useStateVar(() => {
  const config = useRuntimeConfig();
  const searchClient = algoliasearch(
    config.public.algoliaApplicationId,
    config.public.algoliaApiKey,
  ) as SearchClient;

  const autocompleteItems = ref([]);
  return {
    searchClient: searchClient,
    tags: ref(props.tags?.map((tagName) => ({ text: tagName })) ?? ([] as Tag[])),
    tag: ref(""),
    autocompleteItems: autocompleteItems,
    autocompleteDebounce: debounce(async (tagName: string, limit?: number) => {
      const typeEnum = props.typeName.replace("tags_", "");
      const searchRes = await searchClient.search([
        {
          query: tagName,
          indexName: config.public.algoliaTagsIndex,
          params: { hitsPerPage: limit ?? 9, facetFilters: [`types:${typeEnum}`] },
        },
      ]);
      const tagsRaw = searchRes.results[0].hits;
      const tags = tagsRaw.map((tagRaw: any) => ({
        pk: tagRaw.objectID,
        text: tagRaw.name,
        count: tagRaw.count,
        description: tagRaw.description,
        synonyms: tagRaw.synonyms,
      }));
      autocompleteItems.value = tags;
    }, 250),
  };
});

watch(state.tag, (newTag: string) => state.autocompleteDebounce(newTag));

onMounted(() => {
  state.autocompleteDebounce("", 4);
});

function onTagsChanged(newTags: Array<Tag>) {
  state.tags.value = newTags;
  emit("tagsChanged", props.typeName, newTags);
}
</script>

<template>
  <CBox :mt="theme.spaces.md" w="100%">
    <CFormLabel size="sm">{{ props.typeLabel }}</CFormLabel>
    <CBox :mt="theme.spaces.md / 3">
      <VueTagsInput
        v-model="state.tag.value"
        :tags="state.tags.value"
        :add-on-key="[13, ',', ';']"
        :separators="[';', ',']"
        :placeholder="`Add items`"
        :autocomplete-items="state.autocompleteItems.value"
        :autocomplete-min-length="0"
        @tags-changed="onTagsChanged"
      >
        <template #autocomplete-item="props">
          <CBox px="2" py="1" font-size="14px" @click="props.performAdd(props.item)">
            {{ props.item.text }} ({{ props.item.count }})
          </CBox>
        </template>
      </VueTagsInput>
    </CBox>
    <FormHelperText v-if="helpText" :text="props.helpText" />
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";

.vue-tags-input {
  max-width: 100% !important;

  .ti-input {
    @include chakra-input;
    padding-inline-start: 6px;

    .ti-new-tag-input {
      font-size: var(--fontSizes-md);
      &::placeholder {
        color: $placeholder-color !important;
      }
    }
  }
  .ti-autocomplete {
    border: 1px solid var(--colors-gray-300);
    .ti-selected-item {
      background: var(--colors-blue-500);
    }
  }
  .ti-valid.ti-tag {
    background: var(--colors-blue-500);
    border-radius: var(--radii-md);
    padding-left: 9px;
  }
}
</style>
