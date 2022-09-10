<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CHeading, CText, chakra } from "@chakra-ui/vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { nodes, Node, NodeCategory } from "~/nodes";
import {
  CDrawer,
  CDrawerBody,
  CDrawerOverlay,
  CDrawerContent,
  CDrawerCloseButton,
} from "@chakra-ui/vue-next";
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

function onNodeClick(node: Node, event: Event) {
  event.preventDefault()
  if (node.categories) {
    state.nodeOpened.value = node;
  } else {
    window.location.href = node.url;
  }
}

</script>

<template>
  <CBox>
    
    <CButton @click="state.isOpen.value = true">open</CButton>

    <CDrawer
      v-model="state.isOpen.value"
      placement="right"
      @keyup.esc="state.isOpen.value = false"
      tabindex="0"
    >
      <CDrawerOverlay />
      <CDrawerContent>
        <CDrawerCloseButton />
        
        <CDrawerBody>
          
          <CBox
            v-for="node in nodes"
            :key="node.label"
          >

            <CLink
              :href="node.url"
              @click="(event) => onNodeClick(node, event)"
            >
              {{node.label}}
              <OhVueIcon
                v-if="node.categories"
                name="ri-arrow-down-s-fill"
                scale="1"
                color="white"
              />
            </CLink>
            
            <CBox
              v-if="node.label === state.nodeOpened.value?.label"
              v-for="category in node.categories"
            >
              
            </CBox>

          </CBox>
          
        </CDrawerBody>
      </CDrawerContent>
    </CDrawer>
    
    <CBox
      v-if="state.isOpen.value"
      @click="state.isOpen.value = false"
      pos="fixed"
      w="100vw"
      h="100vh"
      left="0"
      top="0"
      z-index="1399"
    />

  </CBox>
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