<script setup lang="ts">
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
  <div
    class="flex items-center gap-1 w-4/5"
    v-if="props.job.tags_city.length || props.job.tags_country.length"
  >
    <OhVueIcon name="fa-map-marker-alt" scale="0.75" color="#9BADB6" class="mb-[1px]" />

    <div class="flex text-[#9BADB6] flex-nowrap items-center w-full line-clamp-1">
      <div class="inline-flex items-center" v-if="props.job.tags_city.length">
        <p class="inline whitespace-nowrap line-clamp-1" v-for="(city, index) of comp.cities" :key="city">
          <span class="inline mx-2" v-if="index">▪</span>
          {{ city }}
        </p>
      </div>

      <p class="inline mx-2" v-if="job.tags_city.length && remotesAndMaybeCountries.length">
        ▪
      </p>

      <div class="inline-flex items-center" v-if="remotesAndMaybeCountries.length">
        <p
          class="inline"
          v-for="(country, index) in remotesAndMaybeCountries"
          :key="country"
        >
          <span class="mx-2 inline" v-if="index">▪</span>{{ country }}
        </p>
      </div>
    </div>
  </div>
</template>
