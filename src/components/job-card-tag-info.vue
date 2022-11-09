<script setup lang="ts">
import { CFlex, CBox, CText, CLink } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";

const props = defineProps<{
  area: "Other policy-focused" | "Information security";
  isHovering: boolean;
}>();
</script>

<template>
  <CBox position="relative" w="4" h="4">
    <OhVueIcon name="fe-info" scale="0.8" top="-1.5px" ml="0.5" position="relative" />

    <CBox v-if="isHovering" position="absolute" z-index="10" bottom="0" left="-8">
      <CBox
        margin="4"
        padding="6"
        background-color="rgba(255, 255, 255, 0.95)"
        border-radius="md"
        font-size="sm"
        width="400px"
        shadow="inset 0 0 0 1px #E1E6EA"
      >
        <CText v-if="area === 'Information security'">
          We think that
          <EightykLink path="/career-reviews/">information security</EightykLink>
          may be crucial for addressing risks related to AI and biosecurity, with roles in
          this area being an opportunity to build potentially valuable skills.
        </CText>
        <CText v-else>
          We expect these to be good opportunities for testing your fit for policy work and
          building
          <EightykLink path="/articles/career-capital/">career capital</EightykLink>
          to help you more directly contribute to existential risk reduction in the future
        </CText>
      </CBox>
    </CBox>
  </CBox>
</template>
