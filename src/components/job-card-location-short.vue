<script setup lang="ts">
import { CFlex, CBox, CText } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { strings } from "~/constants";
import { useComp } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{
  job: JobAlgolia;
}>();

const comp = useComp(() => {
  const isShouldShowCity =
    props.job.tags_city.length && !props.job.tags_city.includes(strings.remoteLiteral);
  const isShouldShowCountry =
    !isShouldShowCity && !props.job.tags_country.includes(strings.remoteLiteral);
  const isJobGlobal = props.job.tags_country.includes(strings.remoteLiteral);
  const isJobGlobalOnly = !isShouldShowCity && !isShouldShowCountry && isJobGlobal;
  return {
    isJobGlobal,
    isJobGlobalOnly,
    isShouldShowCity,
    isShouldShowCountry,
    cities: props.job.tags_city.map((city) =>
      city.replace("Washington, DC metro area", "Washington, DC"),
    ),
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

    <CFlex :no-of-lines="1">
      <CFlex v-if="comp.isJobGlobal" align="center" display="inline" gap="3" color="#9BADB6">
        <CText display="inline">Global</CText>
      </CFlex>

      <CText
        mx="2"
        display="inline"
        v-if="comp.isJobGlobal && !comp.isJobGlobalOnly"
        color="#9BADB6"
      >
        ▪
      </CText>

      <CFlex display="inline" v-if="comp.isShouldShowCity" align="center" color="#9BADB6">
        <CText display="inline" v-for="(city, index) of comp.cities" :key="city"
          ><CText mx="2" display="inline" v-if="index">▪</CText>{{ city }}</CText
        >
      </CFlex>

      <CFlex v-if="comp.isShouldShowCountry" align="center" gap="3" color="#9BADB6">
        <CText v-for="(country, index) in props.job.tags_country" :key="country">
          <CText mx="2" display="inline" v-if="index">▪</CText>{{ country }}</CText
        >
      </CFlex>
    </CFlex>
  </CFlex>
</template>
