<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CHeading, CText, chakra } from "@chakra-ui/vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { nodes, Node, NodeCategory } from "~/nodes";
import { OhVueIcon } from "oh-vue-icons";
import EightyKLink from "~/components/eightyk/eightyk-link.vue";

const state = {
  nodeOpened: ref<Node>(null),
  nodeCategoryActive: ref<NodeCategory>(null),
};

const comp = {
  spaces: {
    sm: 2,
    md: 4,
    lg: 6,
  },
  black50: "#2a2e30",
};

function getCategoryDisplay(category: NodeCategory): boolean {
  // must be in <script> due to the vue templating bug
  // flex, none
  return state.nodeCategoryActive.value?.label === category.label;
}

function onKeyUp(event) {
  if (event.which === 27) {
    state.nodeOpened.value = null;
  }
}

onMounted(() => {
  window.addEventListener("keyup", onKeyUp);
});

onUnmounted(() => {
  window.removeEventListener("keyup", onKeyUp);
});

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
  <div class="w-full -mb-0.5">
    <div class="relative" pos="relative">
      <div class="flex justify-between items-center">
        <EightyKLink name="Home" path="/">
          <img alt="80,000 Hours Logo" width="72" height="50" src="/80k-logo.png" />
        </EightyKLink>
        <div class="flex">
          <div class="z-10" v-for="node in nodes" :key="node.label">
            <a :href="node.url" @click="(event) => onNodeClick(event, node)">
              <button
                class="ml-6 font-bold"
                variant="link"
                :class="isCurrentNode(node) ? 'text-blue-500' : 'text-black-50'"
              >
                {{ node.label }}
                <OhVueIcon
                  v-if="node.categories"
                  name="ri-arrow-down-s-fill"
                  scale="1"
                  :color="isCurrentNode(node) ? 'blue.500' : comp.black50"
                />
              </button>
            </a>

            <div
              class="flex absolute w-full h-fit mt-6 max-h-fit z-10 left-0 bg-[#f5f5f5] border-2 border-[#eee]"
              v-if="node.isMegaNode && isCurrentNode(node)"
            >
              <div class="flex max-w-[30%] flex-col">
                <a
                  class="flex flex-col p-4 hover:cursor-pointer text-gray-900"
                  v-for="category in node.categories"
                  :key="category.label"
                  :href="category.url"
                  @mouseenter="state.nodeCategoryActive.value = category"
                  @focus="state.nodeCategoryActive.value = category"
                  :class="
                    category === state.nodeCategoryActive.value ? 'bg-white' : 'bg-initial'
                  "
                >
                  <h2 class="text-sm">{{ category.label }}</h2>
                  <p>{{ category.description }}</p>
                </a>
              </div>

              <div class="flex bg-white grow max-h-[580px] p-4 px-5 relative">
                <div
                  class="flex flex-col flex-wrap w-full -mt-4"
                  v-for="category in node.categories"
                  :key="category.label"
                  :class="getCategoryDisplay(category) ? 'flex' : 'hidden'"
                >
                  <div
                    class="flex w-1/2 flex-col"
                    v-if="state.nodeCategoryActive.value?.label === category.label"
                    v-for="childCategory in category.children"
                    :key="childCategory.label"
                  >
                    <h2 class="text-sm mt-4 mb-1">{{ childCategory.label }}</h2>
                    <a
                      class="text-gray-900 mb-1"
                      v-for="childNode in childCategory.children"
                      :key="childNode.label"
                      :href="childNode.url"
                    >
                      {{ childNode.label }}
                    </a>

                    <!-- these are the internal extensions, such as are currently used in 'browse all our content' -->
                    <a
                      class="my-6 font-bold"
                      v-if="!!childCategory.extension"
                      :href="childCategory.extension.url"
                      >{{ childCategory.extension.label }}</a
                    >
                  </div>

                  <a
                    class="mt-6 font-bold"
                    v-if="
                      !!category.extension &&
                      state.nodeCategoryActive.value?.label === category.label
                    "
                    :href="category.extension.url"
                    >{{ category.extension.label }}</a
                  >
                </div>
              </div>
            </div>

            <div
              class="flex absolute w-fit h-fit py-4 mt-6 z-10 bg-white border-2 border-[#eee]"
              v-if="!node.isMegaNode && isCurrentNode(node)"
            >
              <div class="flex flex-col gap-4">
                <div
                  class="flex flex-col px-6 gap-2"
                  v-for="category in node.categories"
                  :key="category.label"
                >
                  <h2 class="text-sm">{{ category.label }}</h2>
                  <a
                    v-for="catNode in category.children"
                    :key="catNode.url"
                    :href="catNode.url"
                  >
                    {{ catNode.label }}
                  </a>
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
