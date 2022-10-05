<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CHeading, CButton, CVStack, CLink, CBox, CText } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { subDays, startOfYear, getUnixTime, endOfYear, addDays } from "date-fns";
import NumericMenu from "~/components/aloglia/numeric-menu.vue";
import RefinementList from "~/components/aloglia/refinement-list.vue";

const props = defineProps<{
  countBg?: string;
}>();

</script>

<template>
  <CBox>
    <RefinementList
      attribute="tags_area"
      :count-bg="props.countBg"
      label="Problem Areas"
      :mt="0"
    />
    <RefinementList
      attribute="tags_country"
      :count-bg="props.countBg"
      label="Country"
      :limit="8"
      :show-more-limit="20"
      :searchable="true"
    />
    <RefinementList
      attribute="tags_city"
      :count-bg="props.countBg"
      label="City"
      :limit="8"
      :show-more-limit="20"
      :searchable="true"
    />
    <RefinementList
      attribute="tags_degree_required"
      :count-bg="props.countBg"
      label="Education"
    />
    <RefinementList
      attribute="tags_exp_required"
      :count-bg="props.countBg"
      label="Experience"
    />
    <RefinementList
      attribute="tags_role_type"
      :count-bg="props.countBg"
      label="Role type"
    />
    <RefinementList
      attribute="company_name"
      :count-bg="props.countBg"
      label="Organisation"
      :limit="6"
      :show-more-limit="20"
      :searchable="true"
    />

    <!--<RefinementList attribute="tags_location_type" label="Location" />-->
    <!--<RefinementList attribute="tags_skill" label="Skills" />-->
    <!--<RefinementList attribute="tags_generic" label="Tags" />-->

    <NumericMenu
      label="Posted"
      attribute="posted_at"
      :items="[
        { label: 'Anytime' },
        { label: 'Today', start: getUnixTime(subDays(new Date(), 1)) },
        { label: 'In last week', start: getUnixTime(subDays(new Date(), 7)) },
        // { label: '30d ago', start: getUnixTime(subDays(new Date(), 30)) },
        { label: 'In last 3m', start: getUnixTime(subDays(new Date(), 91)) },
        { label: 'In last year', start: getUnixTime(startOfYear(new Date())) },
      ]"
    />
    
    <NumericMenu
      label="Closes"
      attribute="closes_at"
      :items="[
        { label: 'Anytime' },
        { label: 'Today', end: getUnixTime(addDays(new Date(), 1)) },
        { label: 'In a week', end: getUnixTime(addDays(new Date(), 7)) },
        // { label: 'In 30d', end: getUnixTime(addDays(new Date(), 30)) },
        { label: 'In 3m', end: getUnixTime(addDays(new Date(), 91)) },
        { label: 'This year', end: getUnixTime(endOfYear(new Date())) },
      ]"
    />
  </CBox>
</template>
