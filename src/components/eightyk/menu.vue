<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CContainer, CLink, CHeading, CText, chakra } from "@chakra-ui/vue-next";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { ref } from "vue";
import { nodes, Node, NodeCategory, nodesSecondary } from "~/nodes";
import MenuDesktop from "~/components/eightyk/menu-desktop";
import MenuMobile from "~/components/eightyk/menu-mobile";

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
          <CLink
            v-for="node in nodesSecondary"
            :href="node.url"
            :key="node.label"
            color="comp.black50"
          >
            {{node.label}}
          </CLink>
        </CFlex>
      </CContainer>
    </CFlex>
  </CBox>
</template>
