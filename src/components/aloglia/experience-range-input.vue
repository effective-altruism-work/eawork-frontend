<script setup lang="ts">
import { CButton, CBox, CFlex, CIcon, CText, CInput, CFormLabel } from "@chakra-ui/vue-next";
import { theme } from "~/styles/theme";

const props = defineProps();

function formatMinValue(minValue, minRange) {
  return minValue !== null && minValue !== minRange ? minValue : '';
}
function formatMaxValue(maxValue, maxRange) {
  return maxValue !== null && maxValue !== maxRange ? maxValue : '';
}

</script>

<template>
  <CBox mt="6">

    <CFormLabel line-height="1">Experience minimal</CFormLabel>
    
    <CFlex gap="3" mt="2">

      <AisRangeInput attribute="experience_min">
        <template
          v-slot="{
            currentRefinement,
            range,
            canRefine,
            refine,
            sendEvent,
          }"
        >
          <CFlex direction="column">
            <CInput
              type="number"
              :placeholder="range.min"
              :disabled="!canRefine"
              :value="formatMinValue(currentRefinement.min, range.min)"
              @input="refine({
                min: $event.currentTarget.value,
              })"
              w="16"
              size="sm"
              border-radius="md"
            />
          </CFlex>
        </template>
      </AisRangeInput>
  
<!--      <AisRangeInput attribute="experience_avg">-->
<!--        <template-->
<!--          v-slot="{-->
<!--            currentRefinement,-->
<!--            range,-->
<!--            canRefine,-->
<!--            refine,-->
<!--            sendEvent,-->
<!--          }"-->
<!--        >-->
<!--          <CFlex direction="column">-->
<!--            <CInput-->
<!--              type="number"-->
<!--              :placeholder="range.max"-->
<!--              :disabled="!canRefine"-->
<!--              @input="refine({-->
<!--                max: $event.currentTarget.value,-->
<!--              })"-->
<!--              w="16"-->
<!--              size="sm"-->
<!--              border-radius="md"-->
<!--            />-->
<!--            <CFormLabel line-height="1" mt="1" font-size="xs" color="gray.400">Max</CFormLabel>-->
<!--          </CFlex>-->
<!--        </template>-->
<!--      </AisRangeInput>-->

    </CFlex>

  </CBox>
</template>
