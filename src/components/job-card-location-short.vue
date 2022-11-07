<script setup lang="ts">
import { CFlex, CText } from "@chakra-ui/vue-next";
import { OhVueIcon } from "oh-vue-icons";
import { strings } from "~/constants";
import { useComp } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{
  job: JobAlgolia;
}>();

const countriesWithRemotes = computed(() => {
  const remoteLocations = props.job.tags_location_80k.filter((location) =>
    location.includes("Remote"),
  );

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

  const showCity =
    props.job.tags_city.length && !props.job.tags_city.includes(strings.remoteLiteral);
  const isRemoteOnly = !showCity;
  const showCountry = !showCity && !isJobRemote;

  return {
    remoteLocation,
    isRemoteOnly,
    isShouldShowCity: showCity,
    isShouldShowCountry: showCountry,
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
      <CFlex display="inline" v-if="comp.isShouldShowCity" align="center" color="#9BADB6">
        <CText display="inline" v-for="(city, index) of comp.cities" :key="city"
          ><CText mx="2" display="inline" v-if="index">▪</CText>{{ city }}</CText
        >
      </CFlex>

      <CFlex
        v-if="!job.tags_city.length && countriesWithRemotes.length > 0"
        align="center"
        color="#9BADB6"
      >
        <CText v-for="(country, index) in countriesWithRemotes" :key="country">
          <CText mx="2" display="inline" v-if="index">▪</CText>{{ country }}</CText
        >
      </CFlex>
    </CFlex>
  </CFlex>
</template>
