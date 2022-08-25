<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CBox, CText } from "@chakra-ui/vue-next";
import algoliasearch, { SearchClient } from "algoliasearch";
import { ref, watch } from "vue";
import "@formkit/themes/genesis";
import VueTagsInput from "@sipec/vue3-tags-input";
import { debounce } from "vue-debounce";
import { useState } from "~/utils/structs";
import { Tag, TagTypeName } from "~/utils/types";

const props = defineProps<{
  typeLabel: string;
  typeName: TagTypeName;
  jobVersionPk?: number;
}>();

const emit = defineEmits<{
  (e: "tagsChanged", tagName: TagTypeName, tagsNew: Array<Tag>): void;
}>();

const state = useState(() => {
  const config = useRuntimeConfig();
  const searchClient = algoliasearch(
    config.public.algoliaApplicationId,
    config.public.algoliaApiKey,
  ) as SearchClient;

  const autocompleteItems = ref([]);
  return {
    searchClient: searchClient,
    tags: ref([] as Tag[]),
    tag: ref(""),
    autocompleteItems: autocompleteItems,
    autocompleteDebounce: debounce(async (tagName: string) => {
      const typeEnum = props.typeName.replace("tags_", "");
      const searchRes = await searchClient.search([
        {
          query: tagName,
          indexName: config.public.algoliaTagsIndex,
          params: { hitsPerPage: 9, facetFilters: [`types:${typeEnum}`] },
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

function onTagsChanged(newTags: Array<Tag>) {
  state.tags.value = newTags;
  emit("tagsChanged", props.typeName, newTags);
}
</script>

<template>
  <CBox>
    <CText>{{ props.typeLabel }}</CText>
    <CBox>
      <VueTagsInput
        v-model="state.tag.value"
        :tags="state.tags.value"
        :add-on-key="[13, ',', ';']"
        :separators="[';', ',']"
        :autocomplete-items="state.autocompleteItems.value"
        @tags-changed="onTagsChanged"
      >
        <template #autocomplete-item="props">
          <CBox @click="props.performAdd(props.item)">
            {{ props.item.text }} ({{ props.item.count }})
          </CBox>
        </template>
      </VueTagsInput>
    </CBox>
  </CBox>
</template>
