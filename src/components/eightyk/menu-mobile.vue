<script setup lang="ts">
import {
  CFlex,
  CBox,
  CButton,
  CLink,
  CIcon,
  CText,
  chakra,
  CIconButton,
  CDrawer,
  CDrawerBody,
  CDrawerOverlay,
  CDrawerContent,
} from "@chakra-ui/vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { Node, NodeCategory, nodesAll } from "~/nodes";
import EightyKLink from "~/components/eightyk/eightyk-link.vue";

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
  <CFlex direction="row" align="center" justify="space-between" py="2">
    <EightyKLink path="/">
      <chakra.img w="55px" h="38.19px" mb="px" src="/80k-logo.png" />
    </EightyKLink>

    <CButton
      @click="state.isOpen.value = true"
      variant="none"
      px="0"
      w="fit-content"
      mx="-11px"
    >
      <chakra.svg width="25" height="30" viewBox="0 0 512 512" fill="currentColor">
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
      size="sm"
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

          <CBox border-bottom="1px solid" border-color="gray.100">
            <CBox v-for="node in nodesAll" :key="node.label">
              <CLink
                :href="node.url"
                @click="
                  (event) => {
                    if (!node.categories) {
                      return;
                    }
                    onNodeClick(node, event);
                  }
                "
                py="3"
                :px="comp.linkP"
                border-top="1px solid"
                border-color="gray.100"
                display="flex"
                align-items="center"
                color="gray.900"
                :font-weight="node.isSecondary ? 'normal' : 'bold'"
                :_hover="{ color: 'initial' }"
                :bg="isCurrentNode(node) ? 'white' : 'initial'"
              >
                {{ node.label }}
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
                v-for="(category, index) in node.categories"
                bg="white"
                pb="2"
              >
                <CLink
                  :href="category.url ? category.url : undefined"
                  @click="(event) => (category.url ? onNodeClick(category, event) : null)"
                  font-weight="bold"
                  :px="comp.linkP"
                  :pt="index ? 3 : 2"
                  pb="1"
                  display="flex"
                  align-items="center"
                  color="gray.900"
                  font-size="lg"
                  :_hover="!category.url && { color: 'black' }"
                  :cursor="category.url ? 'pointer' : ''"
                >
                  {{ category.label }}
                  <CIcon
                    v-if="category.children[0]?.children?.length"
                    name="ri-arrow-down-s-fill"
                    ml="1"
                    mt="px"
                    :transform="isCurrentCategory(category) ? 'rotate(180deg)' : ''"
                    font-size="md"
                  />
                </CLink>
                <CText ml="5" mb="5" v-if="category?.description" font-size="md">{{
                  category.description
                }}</CText>
                <CLink
                  v-if="!!category.extension && isCurrentCategory(category)"
                  font="bold"
                  ml="5"
                  display="block"
                  pb="10px"
                  :href="category.extension.url"
                  :_hover="
                    !category.extension.url ? { color: 'black' } : { color: 'blue.500' }
                  "
                  >{{ category.extension.label }}</CLink
                >
                <CBox
                  v-if="
                    isCurrentCategory(category) || !category.children[0]?.children?.length
                  "
                  v-for="node in category.children"
                  :mx="comp.linkP"
                  :py="node.url ? '1' : '2'"
                  color="gray.900"
                  font-size="0.90rem"
                >
                  <CLink
                    :href="node.url ? node.url : undefined"
                    @click="(event) => (node.url ? onNodeClick(node, event) : null)"
                    :font-weight="node?.children?.length ? 'bold' : ''"
                    :cursor="node.url ? 'pointer' : ''"
                    :_hover="!node.url ? { color: 'black' } : { color: 'blue.400' }"
                    :mb="node.url ? '0' : '0.5'"
                    color="gray.900"
                    font-size="0.90rem"
                  >
                    {{ node.label }}
                  </CLink>
                  <CLink
                    v-for="child in node.children"
                    display="block"
                    color="gray.900"
                    font-size="0.90rem"
                    py="1"
                    pl="2"
                    border-left="2px solid rgb(200, 200, 200)"
                    :href="child.url"
                    :_hover="{ color: 'blue.400' }"
                    >{{ child.label }}
                  </CLink>
                  <CLink
                    py="3"
                    pl="2"
                    font="bold"
                    display="block"
                    border-left="2px solid rgb(200, 200, 200)"
                    v-if="!!node.extension"
                    :href="node.extension.url"
                    >{{ node.extension.label }}</CLink
                  >
                </CBox>
              </CBox>
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
