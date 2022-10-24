<script setup lang="ts">
import Menu from "~/components/eightyk/menu.vue";
import { CContainer, CFlex, CBox, CIcon, CLink, CHeading, CText } from "@chakra-ui/vue-next";

const props = defineProps<{
  error: { statusCode: number };
}>();
</script>

<template>
  <Menu />
  <CBox overflow="hidden">
    <CContainer max-w="8xl" :px="[3, null, 4]">
      <CFlex justify-content="center" align-items="center" h="70vh">
        <CBox>
          <CHeading font-size="3xl" v-if="error.statusCode === 404">Page not found</CHeading>
          <CHeading v-else>An error occurred</CHeading>
          <CText font-size="xl" mt="2">
            If you would like to report this
            {{ error.statusCode === 404 ? "as an error," : "error," }} you can do so
            <CLink href="https://80000hours.typeform.com/to/LG2lzrOC"
              >here <CIcon name="message-square" mb="px" mr="1" /> </CLink
            >.
          </CText>
          <CLink font-size="xl" mt="6" display="block" href="/">Home</CLink>
        </CBox>
      </CFlex>
    </CContainer>
  </CBox>
</template>
