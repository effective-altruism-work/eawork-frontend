<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CHeading, CButton, CVStack, CLink, CBox, CText } from "@chakra-ui/vue-next";
import algoliasearch from "algoliasearch";
import { subDays, startOfYear, getUnixTime, endOfYear, addDays } from "date-fns";
import { onMounted, ref, watch } from "vue";
import CurrentRefinements from "~/components/aloglia/current-refinements.vue";
import NumericMenu from "~/components/aloglia/numeric-menu.vue";
import RefinementList from "~/components/aloglia/refinement-list.vue";
import SearchBox from "~/components/aloglia/search-box.vue";
import BtnJobsAlert from "~/components/btn-jobs-alert.vue";
import JobCardSkeleton from "~/components/job-card-skeleton.vue";
import JobCard from "~/components/job-card.vue";
import { history } from "instantsearch.js/es/lib/routers";
import { IndexUiState } from "instantsearch.js/es/types/ui-state";
import { useComp, useStateVar } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";
import { OhVueIcon } from "oh-vue-icons";

const props = defineProps<{
  isShowResultsCount: boolean;
  countBg?: string;
}>();

</script>

<template>
  <CBox>
    <SearchBox :is-show-results-count="props.isShowResultsCount" />

    <CurrentRefinements />

    <RefinementList
      attribute="tags_area"
      :count-bg="props.countBg"
      label="Areas"
      :mt="0"
    />
    <RefinementList
      attribute="tags_role_type"
      :count-bg="props.countBg"
      label="Roles"
    />
    <RefinementList
      attribute="tags_degree_required"
      :count-bg="props.countBg"
      label="Educational requirements"
    />
    <RefinementList
      attribute="tags_exp_required"
      :count-bg="props.countBg"
      label="Experience requirements"
    />

    <RefinementList
      attribute="tags_location_80k"
      :count-bg="props.countBg"
      label="Location"
      :limit="8"
      :show-more-limit="20"
      :searchable="true"
    />
    <RefinementList
      attribute="company_name"
      :count-bg="props.countBg"
      label="Company"
      :limit="6"
      :show-more-limit="20"
      :searchable="true"
    />

    <!--<RefinementList attribute="tags_location_type" label="Location" />-->
    <!--<RefinementList attribute="tags_skill" label="Skills" />-->
    <!--<RefinementList attribute="tags_generic" label="Tags" />-->

    <NumericMenu
      label="Posted at"
      attribute="posted_at"
      :items="[
        { label: 'Anytime' },
        { label: 'Today', start: getUnixTime(subDays(new Date(), 1)) },
        { label: 'A week ago', start: getUnixTime(subDays(new Date(), 7)) },
        { label: '30d ago', start: getUnixTime(subDays(new Date(), 30)) },
        { label: '3m ago', start: getUnixTime(subDays(new Date(), 91)) },
        { label: 'This year', start: getUnixTime(startOfYear(new Date())) },
      ]"
    />
    
    <NumericMenu
      label="Closes in"
      attribute="closes_at"
      :items="[
        { label: 'Anytime' },
        { label: 'Today', end: getUnixTime(addDays(new Date(), 1)) },
        { label: 'In a week', end: getUnixTime(addDays(new Date(), 7)) },
        { label: 'In 30d', end: getUnixTime(addDays(new Date(), 30)) },
        { label: 'In 3m', end: getUnixTime(addDays(new Date(), 91)) },
        { label: 'This year', end: getUnixTime(endOfYear(new Date())) },
      ]"
    />
  </CBox>
</template>
