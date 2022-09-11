<script setup lang="ts">
import { CFlex, CBox, CButton, CContainer, CLink, CHeading, CText, chakra } from "@chakra-ui/vue-next";
import { ref } from "vue";
import { nodes, Node, NodeCategory } from "~/nodes";
import { OhVueIcon } from "oh-vue-icons";
import { useComp } from "~/utils/structs";
import MenuDesktop from "~/components/eightyk/menu-desktop";
import MenuMobile from "~/components/eightyk/menu-mobile";

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
  
      <CFlex direction="column" align="center">
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
  <!--    <MenuMobile />-->
  
    </CContainer>
    
      <CFlex bg="#EEEEEE" direction="column" align="center" py="2">

        <CContainer
          display="flex"
          justify-content="space-between"
          w="100%"
          max-w="8xl"
        >
          <CFlex>Home</CFlex>
    
          <CFlex gap="6">
            <CLink color="comp.black50">New releases</CLink>
            <CLink color="comp.black50">All articles</CLink>
            <CLink color="comp.black50">Community</CLink>
            <CLink color="comp.black50">About</CLink>
          </CFlex>
        </CContainer>
      </CFlex>
  </CBox>
</template>
