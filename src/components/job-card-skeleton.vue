<script setup lang="ts">
import { CFlex, CBox, CButton, CLink } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import Skeleton from "~/components/chakra/skeleton.vue";

const space = 6;
</script>

<template>
  <CBox mb="6" bg="white" p="4" border-radius="md">
    <CBox>
      <CFlex>
        <Skeleton w="62px" h="62px" />

        <CFlex ml="3" justify="space-between" direction="column">
          <Skeleton w="350px" h="18px" />
          <Skeleton w="125px" h="18px" />
          <Skeleton w="100px" h="18px" />
        </CFlex>
      </CFlex>

      <CFlex w="100%" gap="3" mt="3" wrap="wrap">
        <Skeleton w="176px" h="22.5px" />
        <Skeleton w="100px" h="22.5px" />
      </CFlex>
    </CBox>

    <CFlex mt="4" justify="space-between" align="center">
      <CFlex :gap="space">
        <CLink :_hover="{ textDecoration: 'none' }">
          <CButton size="sm" color-scheme="blue" variant="outline">
            <OhVueIcon
              name="oi-eye"
              scale="1"
              color="var(--colors-blue-500)"
              style="margin-right: 5px"
            />
            View
          </CButton>
        </CLink>

        <CLink
          :_hover="{ textDecoration: 'none !important' }"
          display="flex"
          align-items="center"
        >
          <CButton size="sm" color-scheme="blue" variant="link">
            Apply
            <OhVueIcon
              name="ri-external-link-line"
              scale="0.7"
              color="var(--colors-blue-500)"
              style="margin-left: 5px; margin-top: 1px"
            />
          </CButton>
        </CLink>

        <CFlex align="center">
          <CButton size="sm" variant="link"> Edit </CButton>
        </CFlex>

        <CButton size="sm" variant="link" m="auto"> Flag </CButton>
      </CFlex>

      <CFlex gap="3" align="center" justify="center" h="100%" pt="0.5">
        <Skeleton w="71px" h="21px" />
      </CFlex>
    </CFlex>
  </CBox>
</template>

<style lang="scss">
@import "~/styles/chakra-ui.scss";
</style>
