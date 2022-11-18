<script setup lang="ts">
import { ref } from "vue";
import { Node, NodeCategory, nodesSecondary } from "~/nodes";
import { OhVueIcon } from "oh-vue-icons";
import MenuDesktop from "~/components/eightyk/menu-desktop.vue";
import MenuMobile from "~/components/eightyk/menu-mobile.vue";

const state = {
  nodeOpened: ref<Node>(null),
  nodeCategoryActive: ref<NodeCategory>(null),
};

function isCurrentNode(node: Node) {
  return state.nodeOpened.value?.label === node.label && node.categories;
}

function onNodeClick(event, node) {
  if (isCurrentNode(node)) {
    event.preventDefault();
    state.nodeOpened.value = null;
  } else if (node.isMegaNode) {
    event.preventDefault();
    state.nodeCategoryActive.value = node.categories[0];
    state.nodeOpened.value = node;
  } else if (node.categories?.length) {
    event.preventDefault();
    state.nodeOpened.value = node;
  }
}
</script>

<template>
  <div class="bg-white">
    <div class="w-full m-auto px-4 max-w-8xl">
      <div class="hidden xl:flex items-center flex-col">
        <div class="flex w-full flex-grow max-w-8xl mx-auto justify-center py-3 bg-white">
          <MenuDesktop />
        </div>
      </div>

      <div class="block xl:hidden">
        <MenuMobile />
      </div>
    </div>

    <div class="hidden xl:flex flex-col items-center py-2 bg-[#EEEEEE]">
      <div class="flex justify-between w-full px-4 max-w-8xl">
        <div class="flex">Home</div>

        <div class="flex gap-6">
          <div class="relative" v-for="node in nodesSecondary" :key="node.label">
            <NuxtLink
              class="group"
              :href="node.url"
              @click="(event) => onNodeClick(event, node)"
            >
              <button
                class="ml-4 bg-inherit group-hover:underline"
                :class="isCurrentNode(node) ? 'text-eightyk-500' : 'text-black-50'"
                variant="link"
              >
                {{ node.label
                }}<OhVueIcon
                  v-if="node.categories"
                  name="ri-arrow-down-s-fill"
                  scale="1"
                  :class="isCurrentNode(node) ? 'text-eightyk-blue' : 'text-black-50'"
                />
              </button>
            </NuxtLink>

            <div
              class="flex absolute w-fit h-fit right-0 mt-2 z-10 bg-white border-2 py-4 border-[#eee]"
              v-if="!node.isMegaNode && isCurrentNode(node)"
            >
              <div class="flex gap-4">
                <div
                  class="flex flex-col px-6 gap-2"
                  v-for="category in node.categories"
                  :key="category.label"
                >
                  <h4 class="font-sm whitespace-nowrap font-bold">{{ category.label }}</h4>
                  <NuxtLink
                    class="whitespace-nowrap"
                    v-for="catNode in category.children"
                    :key="catNode.url"
                    :href="catNode.url"
                  >
                    {{ catNode.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute w-full h-full inset-0 z-10"
      v-if="state.nodeOpened.value"
      @click="state.nodeOpened.value = null"
    />
  </div>
</template>
