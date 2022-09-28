<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CContainer, CLink, CHeading, CText, chakra } from "@chakra-ui/vue-next";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { ref } from "vue";
import { nodes, Node, NodeCategory, nodesSecondary } from "~/nodes";
import MenuDesktop from "~/components/eightyk/menu-desktop";
import MenuMobile from "~/components/eightyk/menu-mobile";
import { OhVueIcon } from "oh-vue-icons";

const hooks = {
  breakpoints: useBreakpoints(breakpointsTailwind),
  config: useRuntimeConfig(),
};

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

function isCurrentNode(node: Node) {
  return state.nodeOpened.value?.label === node.label && node.categories;
}

function onNodeClick(event, node) {
  if (isCurrentNode(node)) {
    event.preventDefault();
    state.nodeOpened.value = null;
  } else {
    if (node.isMegaNode) {
      event.preventDefault();
      state.nodeCategoryActive.value = node.categories[0];
      state.nodeOpened.value = node;
    } else if (node.categories?.length) {
      event.preventDefault();
      state.nodeOpened.value = node;
    }
  }
}

</script>

<template>
  <CBox>
    <CContainer w="100%" m="auto" max-w="8xl">
      
      <CFlex
        v-if="hooks.breakpoints.isGreaterOrEqual('xl')"
        direction="column"
        align="center"
      >
        <CFlex
          w="100%"
          grow="1"
          max-w="8xl"
          justify="center"
          :py="4 - 1"
          bg="white"
        >
          <MenuDesktop />
        </CFlex>
      </CFlex>
      
      <MenuMobile v-else />
  
    </CContainer>

    <CFlex
      v-if="hooks.breakpoints.isGreaterOrEqual('xl')"
      bg="#EEEEEE"
      direction="column"
      align="center"
      py="2"
    >

      <CContainer
        display="flex"
        justify-content="space-between"
        w="100%"
        max-w="8xl"
      >
        <CFlex>Home</CFlex>
  
        <CFlex gap="6">
          <CBox
            v-for="node in nodesSecondary"
            :key="node.label"
            pos="relative"
          >

            <CLink
              :href="node.url"
              @click="(event) => onNodeClick(event, node)"
            >
              <CButton
                variant="link"
                :ml="comp.spaces.md"
                :color="isCurrentNode(node) ? 'blue.500' : comp.black50"
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
              v-if="!node.isMegaNode && isCurrentNode(node)"
              pos="absolute"
              w="fit-content"
              h="fit-content"
              right="0"
              :py="comp.spaces.md"
              :mt="2"
              z-index="2"
              bg="white"
              border="2px solid #eee"
            >
              <CFlex  :gap="comp.spaces.md" >
                <CFlex
                  v-for="category in node.categories"
                  :key="category.label"
                  direction="column"
                  :px="comp.spaces.lg"
                  :gap="comp.spaces.sm"
                >
                  <CHeading size="sm" white-space="nowrap">{{ category.label }}</CHeading>
                  <CLink
                    v-for="catNode in category.children"
                    :key="catNode.url"
                    :href="catNode.url"
                    white-space="nowrap"
                  >
                     {{catNode.label}}
                  </CLink>
                </CFlex>
              </CFlex>
            </CFlex>

          </CBox>
        </CFlex>
      </CContainer>
    </CFlex>
    
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
      z-index="1"
    />
  </CBox>
</template>
