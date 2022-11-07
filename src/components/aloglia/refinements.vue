<script setup lang="ts">
import { CBox } from "@chakra-ui/vue-next";
import { subDays, startOfYear, getUnixTime, endOfYear, addDays } from "date-fns";
import NumericMenu from "~/components/aloglia/numeric-menu.vue";
import RefinementList from "~/components/aloglia/refinement-list.vue";
import { SearchClient, SearchIndex } from "algoliasearch";

const props = defineProps<{
  countBg?: string;
  index: SearchIndex;
  // searchClient: SearchClient;
}>();

const orgCount = ref(0);
const cityCount = ref(0);
const countryCount = ref(0);
const initialFacets = reactive<{ [key: string]: string[] }>({});

onMounted(async () => {
  const res = await props.index.search("", {
    facets: ["tags_country", "tags_city", "company_name"],
  });

  const {
    company_name,
    tags_city,
    tags_country,
  }: { [key: string]: { [key: string]: number } } = res.facets;

  orgCount.value = Object.keys(company_name).length;
  cityCount.value = Object.keys(tags_city).length;
  countryCount.value = Object.keys(tags_country).length;

  for (const facetName in res.facets) {
    const list = Object.keys(res.facets[facetName]);
    initialFacets[facetName] = list;
  }
});
</script>

<template>
  <CBox>
    <RefinementList
      attribute="tags_area"
      :count-bg="props.countBg"
      :limit="40"
      label="Problem areas"
      :mt="0"
    />
    <RefinementList
      attribute="tags_location_80k"
      :amount="countryCount"
      :count-bg="props.countBg"
      label="Country"
      :limit="8"
      :trueItems="initialFacets.tags_country"
      location-type="country"
      :show-more-limit="20"
      :searchable="true"
    />
    <RefinementList
      attribute="tags_location_80k"
      :amount="cityCount"
      :count-bg="props.countBg"
      label="City"
      :limit="8"
      :trueItems="initialFacets.tags_city"
      location-type="city"
      :show-more-limit="20"
      :searchable="true"
    />
    <RefinementList
      attribute="tags_degree_required"
      :count-bg="props.countBg"
      label="Education required"
    />
    <RefinementList
      attribute="tags_exp_required"
      :count-bg="props.countBg"
      label="Experience"
    />
    <RefinementList
      attribute="tags_role_type"
      :count-bg="props.countBg"
      :limit="15"
      label="Role type"
    />
    <RefinementList
      attribute="company_name"
      :amount="orgCount"
      :count-bg="props.countBg"
      label="Organisation"
      :limit="6"
      :show-more-limit="20"
      :searchable="true"
    />

    <!--<RefinementList attribute="tags_skill" label="Skills" />-->
    <!--<RefinementList attribute="tags_generic" label="Tags" />-->

    <NumericMenu
      label="Posted"
      attribute="posted_at"
      :items="[
        { label: 'Anytime' },
        { label: 'Today', start: getUnixTime(subDays(new Date(), 1)) },
        { label: 'In last week', start: getUnixTime(subDays(new Date(), 7)) },
        { label: 'In last 2 weeks', start: getUnixTime(subDays(new Date(), 14)) },
        { label: 'In last month', start: getUnixTime(subDays(new Date(), 30)) },
      ]"
    />

    <NumericMenu
      label="Closes"
      attribute="closes_at"
      :items="[
        { label: 'Anytime' },
        { label: 'Today', end: getUnixTime(addDays(new Date(), 1)) },
        { label: 'In a week', end: getUnixTime(addDays(new Date(), 7)) },
        { label: 'In next 2 weeks', end: getUnixTime(addDays(new Date(), 14)) },
        { label: 'In next month', end: getUnixTime(addDays(new Date(), 31)) },
      ]"
    />
  </CBox>
</template>
