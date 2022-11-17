<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Node, NodeCategory, nodesAll } from "~/nodes";
import EightyKLink from "~/components/eightyk/eightyk-link.vue";
import { OhVueIcon } from "oh-vue-icons";

const state = {
  isOpen: ref(false),
  nodeOpened: ref<Node>(null),
  nodeCategoryActive: ref<NodeCategory>(null),
};

const comp = {
  spaces: {
    sm: 2,
    md: 4,
  },
  linkP: 5,
};

onMounted(() => {
  window.addEventListener("keyup", onKeyUp);
});

onUnmounted(() => {
  window.removeEventListener("keyup", onKeyUp);
});

function onKeyUp(event) {
  if (event.which === 27) {
    state.isOpen.value = false;
  }
}

function onNodeClick(node: Node | NodeCategory, event: Event) {
  event.preventDefault();
  if ("categories" in node) {
    if (state.nodeOpened.value?.label === node.label) {
      state.nodeOpened.value = null;
    } else {
      state.nodeOpened.value = node;
    }
  } else {
    if ("children" in node) {
      if (state.nodeCategoryActive.value?.label === node.label) {
        state.nodeCategoryActive.value = null;
      } else {
        state.nodeCategoryActive.value = node;
      }
    } else {
      window.location.href = node.url;
    }
  }
}

function isCurrentNode(node: Node) {
  return state.nodeOpened.value?.label === node.label && node.categories;
}

function isCurrentCategory(category: NodeCategory) {
  if (!state.nodeCategoryActive.value) return false;

  return state.nodeCategoryActive.value.label === category.label;
}
</script>

<template>
  <div class="flex justify-between items-center py-2">
    <EightyKLink name="Home" path="/">
      <img alt="80,000 Hours Logo" width="55" height="38.19" src="/80k-logo.png" />
    </EightyKLink>

    <button
      class="px-0 w-fit -mx-3"
      @click="state.isOpen.value = true"
      variant="none"
      name="Menu Toggle"
    >
      <svg width="25" height="30" viewBox="0 0 512 512" fill="currentColor">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="48"
          d="M88 152h336M88 256h336M88 360h336"
        ></path>
      </svg>
    </button>

    <!-- v-model="state.isOpen.value" -->
    <div size="sm" placement="right" @keyup.esc="state.isOpen.value = false" tabindex="0">
      <!-- <CDrawerOverlay /> -->
      <div class="bg-gray-50">
        <div class="p-0">
          <div class="flex justify-between items-center py-1 bg-white">
            <p class="ml-5 text-lg">Menu</p>
            <OhVueIcon
              class="text-2xl text-gray-900"
              @click="state.isOpen.value = false"
              icon="x"
              variant="ghost"
              size="lg"
              aria-label="close"
            />
          </div>

          <div class="border-b border-gray-100">
            <div v-for="node in nodesAll" :key="node.label">
              <a
                class="py-3 px-5 border-t border-gray-100 flex items-center text-gray-900 hover:text-gray-900"
                :class="`${node.isSecondary ? 'font-normal' : 'font-bold'} ${
                  isCurrentNode(node) ? 'bg-white' : 'bg-initial'
                }`"
                :href="node.url"
                @click="
                  (event) => {
                    if (!node.categories) {
                      return;
                    }
                    onNodeClick(node, event);
                  }
                "
              >
                {{ node.label
                }}<OhVueIcon
                  v-if="node.categories"
                  name="ri-arrow-down-s-fill"
                  class="ml-1 text-lg"
                  :class="isCurrentNode(node) ? 'rotate-180' : ''"
                />
              </a>

              <div
                class="bg-white pb-2"
                v-if="isCurrentNode(node)"
                v-for="(category, index) in node.categories"
              >
                <a
                  class="font-bold px-5 pb-1 flex items-center text-gray-900 text-lg"
                  :class="`${index ? 'pt-3' : 'pt-2'} ${
                    category.url ? 'cursor-pointer' : 'hover:text-black'
                  }`"
                  :href="category.url ? category.url : undefined"
                  @click="(event) => (category.url ? onNodeClick(category, event) : null)"
                >
                  {{ category.label
                  }}<OhVueIcon
                    class="ml-1"
                    v-if="category.children[0]?.children?.length"
                    name="ri-arrow-down-s-fill"
                    :class="isCurrentCategory(category) ? 'rotate-180' : ''"
                  />
                </a>
                <p class="ml-5 mb-5" v-if="category?.description">
                  {{ category.description }}
                </p>
                <a
                  class="font-bold ml-5 block pb-2.5"
                  :class="
                    category.extension.url ? 'hover:text-eightyk-500' : 'hover:text-black'
                  "
                  v-if="!!category.extension && isCurrentCategory(category)"
                  :href="category.extension.url"
                  >{{ category.extension.label }}</a
                >
                <div
                  class="mx-5 text-gray-900 text-sm"
                  :class="node.url ? 'py-1' : 'py-2'"
                  v-if="
                    isCurrentCategory(category) || !category.children[0]?.children?.length
                  "
                  v-for="node in category.children"
                >
                  <a
                    class="text-gray-900 text-sm"
                    :class="`${
                      node.url ? 'cursor-pointer mb-0 text-eightyk-400' : 'mb-0.5 text-black'
                    } ${node.children.length ? 'font-bold' : ''}`"
                    :href="node.url ? node.url : undefined"
                    @click="(event) => (node.url ? onNodeClick(node, event) : null)"
                  >
                    {{ node.label }}
                  </a>
                  <a
                    class="block text-gray-900 text-sm py-1 pl-2 border-l-2 border-l-gray-300 hover:text-eightyk-400"
                    v-for="child in node.children"
                    :href="child.url"
                    >{{ child.label }}
                  </a>
                  <a
                    class="py-3 pl-2 font-bold block border-l-2 border-l-gray-300"
                    v-if="!!node.extension"
                    :href="node.extension.url"
                    >{{ node.extension.label }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="fixed w-screen h-screen left-0 top-0 z-50"
      v-if="state.isOpen.value"
      @click="state.isOpen.value = false"
    />
  </div>
</template>

<style lang="scss">
// chakra drawer is broken, revisit one they fix it
.chakra-modal__content-container {
  width: 0;
  height: 0;
  section {
    z-index: 1400;
  }
}
.chakra-modal__overlay {
}
</style>
