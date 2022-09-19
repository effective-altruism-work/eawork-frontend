<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CIcon, CHeading, CText, chakra } from "@chakra-ui/vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { nodes, nodesSecondary, Node, NodeCategory } from "~/nodes";
import {
  CIconButton,
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

function onNodeClick(node: Node, event: Event) {
  event.preventDefault()
  if (node.categories) {
    if (state.nodeOpened.value?.label === node.label) {
      state.nodeOpened.value = null;
    } else {
      state.nodeOpened.value = node;
    }
  } else {
    window.location.href = node.url;
  }
}

function isCurrentNode(node: Node) {
  return state.nodeOpened.value?.label === node.label && node.categories;
}

</script>

<template>
  <CFlex direction="row" align="center" justify="space-between" py="2">

    <CLink is-external href="https://80000">
      <chakra.img w="55px" mb="px" src="/80k-logo.png"/>
    </CLink>

    <CButton
      @click="state.isOpen.value = true"
      variant="none"
      px="0"
      w="fit-content"
      mx="-11px"
    >
      <chakra.svg
        width="25"
        height="30"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="48"
          d="M88 152h336M88 256h336M88 360h336"
        ></path>
      </chakra.svg>
    </CButton>

    <CDrawer
      v-model="state.isOpen.value"
      placement="right"
      @keyup.esc="state.isOpen.value = false"
      tabindex="0"
    >
      <CDrawerOverlay />
      <CDrawerContent bg="gray.50">
        <CDrawerBody p="0">
          
          <CFlex justify="space-between" align="center" py="1" bg="white">
            <CText :ml="comp.linkP" font-size="lg">Menu</CText>
            <CIconButton
              @click="state.isOpen.value = false"
              icon="x"
              variant="ghost"
              size="lg"
              font-size="2xl"
              color="gray.900"
              aria-label="close"
            />
          </CFlex>
          
          <CBox
            border-bottom="1px solid"
            border-color="gray.100"
          >
          
            <CBox
              v-for="node in nodes"
              :key="node.label"
            >
              <CLink
                :href="node.url"
                @click="(event) => onNodeClick(node, event)"
                py="3"
                :px="comp.linkP"
                border-top="1px solid"
                border-color="gray.100"
                display="flex"
                align-items="center"
                color="gray.900"
                font-weight="bold"
                :_hover="{ color: 'initial' }"
                :bg="isCurrentNode(node) ? 'white' : 'initial'"
              >
                {{node.label}}
                <CIcon
                  v-if="node.categories"
                  name="ri-arrow-down-s-fill"
                  ml="1"
                  mt="px"
                  :transform="isCurrentNode(node) ? 'rotate(180deg)' : ''"
                  font-size="lg"
                />
              </CLink>
              
              <CBox
                v-if="isCurrentNode(node)"
                v-for="category in node.categories"
                bg="white"
                pb="2"
              >
                <CLink
                  :href="category.url"
                  @click="(event) => onNodeClick(category, event)"
                  font-weight="bold"
                  :px="comp.linkP"
                  pt="0"
                  pb="1"
                  display="flex"
                  color="gray.900"
                  font-size="0.90rem"
                >
                  {{ category.label }}
                </CLink>

                <CLink
                  v-for="node in category.children"
                  :href="node.url"
                  :px="comp.linkP"
                  py="2"
                  display="flex"
                  color="gray.900"
                  font-size="0.90rem"
                >
                  {{ node.label }}
                </CLink>
              </CBox>

            </CBox>
          
            <CBox
              v-for="node in nodesSecondary"
              :key="node.label"
            >
              <CLink
                :href="node.url"
                py="3"
                :px="comp.linkP"
                border-top="1px solid"
                border-color="gray.100"
                display="flex"
                color="gray.900"
                :_hover="{ color: 'blue.600' }"
                :bg="isCurrentNode(node) ? 'white' : 'initial'"
              >
                {{node.label}}
              </CLink>
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

  </CFlex>
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