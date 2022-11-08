<script setup lang="ts">
import { CFlex, CText, CBox } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { strings } from "~/constants";
import { useComp } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{
  job: JobAlgolia;
}>();

const remotesAndMaybeCountries = computed(() => {
  const remoteLocations = props.job.tags_location_80k.filter((location) =>
    location.includes("Remote"),
  );

  if (props.job.tags_city.length) {
    return remoteLocations;
  }

  const remoteLocationsBare = remoteLocations.map((location) =>
    location.replace("Remote, ", ""),
  );

  return [
    ...new Set([
      ...props.job.tags_country.filter((c) => !remoteLocationsBare.includes(c)),
      ...remoteLocations,
    ]),
  ];
});

const comp = useComp(() => {
  const isJobRemote = props.job.tags_location_type.includes("Remote");
  const remoteLocation = isJobRemote
    ? props.job.tags_location_80k.find((s) => s.toLowerCase().includes("remote"))
    : "";

  return {
    remoteLocation,
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
    w="80%"
    v-if="props.job.tags_city.length || props.job.tags_country.length"
  >
    <OhVueIcon
      name="fa-map-marker-alt"
      scale="0.75"
      color="#9BADB6"
      style="margin-bottom: 1px"
    />

    <CFlex
      color="#9BADB6"
      flex-wrap="nowrap"
      align-items="center"
      flex-direction="row"
      w="100%"
    >
      <CFlex display="inline" v-if="props.job.tags_city.length" align="center">
        <CText display="inline" v-for="(city, index) of comp.cities" :key="city"
          ><CText mx="2" display="inline" v-if="index">▪</CText>{{ city }}</CText
        >
      </CFlex>

      <CText
        display="inline"
        v-if="job.tags_city.length && remotesAndMaybeCountries.length"
        mx="2"
        >▪</CText
      >

      <CFlex v-if="remotesAndMaybeCountries.length" display="inline" align-items="center">
        <CText
          display="inline"
          v-for="(country, index) in remotesAndMaybeCountries"
          :key="country"
        >
          <CText mx="2" display="inline" v-if="index">▪</CText>{{ country }}</CText
        >
      </CFlex>
    </CFlex>
  </CFlex>
</template>
