<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CText } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { strings } from "~/constants";
import { useComp } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{
  job: JobAlgolia;
}>();

const comp = useComp(() => {
  const isShouldShowCity = props.job.tags_city.length && !props.job.tags_city.includes(strings.remoteLiteral);
  const isShouldShowCountry = !isShouldShowCity && !props.job.tags_country.includes(strings.remoteLiteral);
  const isJobGlobal = props.job.tags_country.includes(strings.remoteLiteral);
  const isJobGlobalOnly = !isShouldShowCity && !isShouldShowCountry && isJobGlobal;
  return {
    isJobGlobal,
    isJobGlobalOnly,
    isShouldShowCity,
    isShouldShowCountry,
    cities: props.job.tags_city.map(city => city.replace("Washington, DC metro area", "Washington, DC")),
  };
});

</script>

<template>
  <CFlex
    align="center"
    gap="1"
    v-if="props.job.tags_city.length || props.job.tags_country.length"
  >

    <OhVueIcon
      name="fa-map-marker-alt"
      scale="0.75"
      color="#9BADB6"
      style="margin-bottom: 1px"
    />

    <CFlex
      v-if="comp.isJobGlobal"
      align="center"
      gap="3"
      color="#9BADB6"
    >
      <CText>Global</CText>
    </CFlex>
    
    <CBox
      v-if="comp.isJobGlobal && !comp.isJobGlobalOnly"
      w="3px"
      h="3px"
      mx="3"
      bg="gray.300"
    />

    <CFlex
      v-if="comp.isShouldShowCity"
      align="center"
      gap="3"
      color="#9BADB6"
    >
      <CText>{{ comp.cities[0] }}</CText>
    </CFlex>

    <CFlex
      v-if="comp.isShouldShowCountry"
      align="center"
      gap="3"
      color="#9BADB6"
    >
      <CText>{{ props.job.tags_country[0] }}</CText>
    </CFlex>

  </CFlex>
</template>
