<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CHeading, CText, chakra } from "@chakra-ui/vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { nodes, Node, NodeCategory } from "~/nodes";
import { OhVueIcon } from "oh-vue-icons";
// import { useComp } from "~/utils/structs";

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

function getCategoryDisplay(category: NodeCategory): string {
  // must be in <script> due to the vue templating bug
  return state.nodeCategoryActive.value?.label === category.label ? "flex" : "none";
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
  <!-- max-w="1050px" -->
  <CBox w="100%" mb="-2px">
    <CBox pos="relative">
      <CFlex justify="space-between" align="center">
        <CLink is-external href="https://80000hours.org/">
          <chakra.img w="72px" src="/80k-logo.png" />
        </CLink>
        <CFlex>
          <CBox v-for="node in nodes" :key="node.label" z-index="modal">
            <CLink :href="node.url" @click="(event) => onNodeClick(event, node)">
              <CButton
                variant="link"
                :ml="comp.spaces.lg"
                :color="isCurrentNode(node) ? 'blue.500' : comp.black50"
                font-weight="bold"
              >
                {{ node.label }}
                <OhVueIcon
                  v-if="node.categories"
                  name="ri-arrow-down-s-fill"
                  scale="1"
                  :color="isCurrentNode(node) ? 'blue.500' : comp.black50"
                />
              </CButton>
            </CLink>

            <CFlex
              v-if="node.isMegaNode && isCurrentNode(node)"
              pos="absolute"
              w="100%"
              h="fit-content"
              :mt="comp.spaces.lg"
              max-h="fit-content"
              z-index="modal"
              left="0"
              bg="#f5f5f5"
              border="2px solid #eee"
            >
              <CFlex direction="column" max-w="30%">
                <CLink
                  v-for="category in node.categories"
                  :key="category.label"
                  :href="category.url"
                  @mouseenter="state.nodeCategoryActive.value = category"
                  @focus="state.nodeCategoryActive.value = category"
                  display="flex"
                  flex-direction="column"
                  :p="comp.spaces.md"
                  :bg="category === state.nodeCategoryActive.value ? 'white' : 'initial'"
                  :_hover="{ cursor: 'pointer' }"
                  color="gray.900"
                >
                  <CHeading size="sm">{{ category.label }}</CHeading>
                  <CText>{{ category.description }}</CText>
                </CLink>
              </CFlex>

              <CFlex
                bg="white"
                grow="1"
                max-h="580px"
                :p="comp.spaces.md"
                px="5"
                pos="relative"
              >
                <CFlex
                  v-for="category in node.categories"
                  :key="category.label"
                  :display="getCategoryDisplay(category)"
                  direction="column"
                  wrap="wrap"
                  w="100%"
                  mt="-4"
                >
                  <CFlex
                    v-if="state.nodeCategoryActive.value?.label === category.label"
                    v-for="childCategory in category.children"
                    :key="childCategory.label"
                    w="50%"
                    direction="column"
                  >
                    <CHeading size="sm" mt="4" mb="1">{{ childCategory.label }}</CHeading>
                    <CLink
                      v-for="childNode in childCategory.children"
                      :key="childNode.label"
                      :href="childNode.url"
                      color="gray.900"
                      mb="1"
                    >
                      {{ childNode.label }}
                    </CLink>

                    <!-- these are the internal extensions, such as are currently used in 'browse all our content' -->
                    <CLink
                      my="6"
                      font="bold"
                      v-if="!!childCategory.extension"
                      :href="childCategory.extension.url"
                      >{{ childCategory.extension.label }}</CLink
                    >
                  </CFlex>

                  <CLink
                    mt="6"
                    font="bold"
                    v-if="
                      !!category.extension &&
                      state.nodeCategoryActive.value?.label === category.label
                    "
                    :href="category.extension.url"
                    >{{ category.extension.label }}</CLink
                  >
                </CFlex>
              </CFlex>
            </CFlex>

            <CFlex
              v-if="!node.isMegaNode && isCurrentNode(node)"
              pos="absolute"
              w="fit-content"
              h="fit-content"
              :py="comp.spaces.md"
              :mt="comp.spaces.lg"
              z-index="modal"
              bg="white"
              border="2px solid #eee"
            >
              <CFlex direction="column" :gap="comp.spaces.md">
                <CFlex
                  v-for="category in node.categories"
                  :key="category.label"
                  direction="column"
                  :px="comp.spaces.lg"
                  :gap="comp.spaces.sm"
                >
                  <CHeading size="sm">{{ category.label }}</CHeading>
                  <CLink
                    v-for="catNode in category.children"
                    :key="catNode.url"
                    :href="catNode.url"
                  >
                    {{ catNode.label }}
                  </CLink>
                </CFlex>
              </CFlex>
            </CFlex>
          </CBox>
        </CFlex>
      </CFlex>
    </CBox>

    <CBox
      v-if="state.nodeOpened.value"
      @click="state.nodeOpened.value = null"
      pos="absolute"
      w="100%"
      h="100%"
      left="0"
      right="0"
      top="0"
      bottom="0"
      z-index="overlay"
    />
  </CBox>
</template>

<style>
body {
  position: relative;
}
</style>
