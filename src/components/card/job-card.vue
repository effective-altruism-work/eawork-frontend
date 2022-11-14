<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CHStack, CLink, CIcon, CText } from "@chakra-ui/vue-next";
import { useBreakpoints } from "@vueuse/core";
import { format } from "date-fns";
import { OhVueIcon } from "oh-vue-icons";
import { ref, onMounted, computed } from "vue";
import JobCardLocationShort from "~/components/card/job-card-location-short.vue";
import JobCardTags from "~/components/card/job-card-tags.vue";
// import JobView from "~/components/job-view.vue";
import { breakpointsChakra, strings } from "~/constants";
// import { theme } from "~/styles/theme";
import { useComp } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";
import { tracking } from "~/utils/tracking";
import relativePostingTime from "~/utils/relativePostingTime";
import JobHoverText from "~/components/job-hover-text.vue";
import { AisSnippet } from "vue-instantsearch/vue3/es";

const props = defineProps<{
  job: JobAlgolia;
  jobFromURLQuery?: boolean;
  isHasTextQuery?: boolean | string | null;
  isExpanded?: boolean;
  isHidden?: boolean;
  isMissingAlgoliaContext?: boolean;
}>();

const timeSincePosting = computed(() => relativePostingTime(props.job.posted_at));

const emit = defineEmits<{
  (event: "cardExpanded"): void;
  (event: "cardCollapsed"): void;
}>();

const hooks = {
  breakpoints: useBreakpoints(breakpointsChakra),
  config: useRuntimeConfig(),
};

const state = {
  isShowModal: ref(false),
  isAccordionOpen: ref(props.isExpanded ?? false),
  isAccordionOpening: ref(props.isExpanded ?? false),
  isHovering: ref(false),
  isStarHovering: ref(false),
  coordinates: ref({ x: null, y: null }),
};

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

const cardRef = ref<HTMLDivElement | null>(null);

function scrollToCard() {
  if (!props.jobFromURLQuery || !cardRef.value) {
    return;
  }

  if (!cardRef.value) {
    return;
  }

  cardRef.value.scrollIntoView({ behavior: "smooth" });
}

onMounted(() => {
  scrollToCard();
});

const comp = useComp(() => {
  const activeShadowBorder = "inset 0 0 0 1px #E1E6EA";
  const isJobRemote = props.job.tags_location_type.includes("Remote");
  const remoteLocation = isJobRemote
    ? props.job.tags_location_80k.find((s) => s.toLowerCase().includes("remote"))
    : "";

  return {
    space: 6,
    activeShadowBorder,
    remoteLocation,
    activeShadow: `0 8px 24px 0 #9badb629, ${activeShadowBorder}`,
    isHasLocation: props.job.tags_city.length || props.job.tags_country.length,
  };
});

function onMouseDown(e) {
  state.coordinates.value = { x: e.clientX, y: e.clientY };
}

function onMouseUp(e) {
  // don't change card state if user is dragging their mouse (i.e. to highlight text)
  if (
    Math.abs(e.clientX - state.coordinates.value.x) > 5 ||
    Math.abs(e.clientY - state.coordinates.value.y) > 5
  ) {
    return;
  }

  // don't change card state if user is clicking a link
  // brittle
  if (
    e.target.classList.contains("chakra-button") ||
    e.target.classList.contains("chakra-link")
  ) {
    return;
  }

  if (state.isAccordionOpen.value) {
    emit("cardCollapsed");
  } else {
    emit("cardExpanded");
    tracking.sendJobEvent(props.job, "viewed");
  }
  state.isAccordionOpen.value = !state.isAccordionOpen.value;
}
</script>

<template>
  <!-- CBox won't cooperate with refs, thus the div wrapper -->
  <div ref="cardRef">
    <CBox
      v-if="!props.isHidden"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseover="state.isHovering.value = true"
      @focus="state.isHovering.value = true"
      @mouseleave="state.isHovering.value = false"
      @blur="state.isHovering.value = false"
      mb="3"
      bg="white"
      :p="[4, null, 6]"
      border-radius="12px"
      :_hover="{
        cursor: 'pointer',
        boxShadow: state.isAccordionOpen.value ? comp.activeShadow : comp.activeShadowBorder,
      }"
      :box-shadow="state.isAccordionOpen.value ? comp.activeShadow : 0"
      transition="box-shadow 0.2s"
    >
      <CBox>
        <CFlex pos="relative">
          <chakra.img
            v-if="props.job"
            :src="job.company_logo_url"
            w="60px"
            min-w="60px"
            h="60px"
            border-radius="4px"
            bg="white"
            loading="lazy"
          />

          <CFlex ml="3" justify="center" direction="column" gap="3">
            <CText
              font-weight="bold"
              :line-height="[1.3, null, 'none']"
              :font-size="{ lg: 'xl' }"
            >
              <span v-if="props.isMissingAlgoliaContext">{{ job.title }}</span>
              <ais-snippet v-else :hit="job" attribute="title" />
            </CText>

            <CText
              :line-height="[1.3, null, 'none']"
              position="relative"
              :left="job?.company_is_recommended_org ? '-3px' : ''"
              :font-size="{ base: 'sm', lg: 'md' }"
            >
              <CBox
                v-if="job?.company_is_recommended_org"
                @mouseover="state.isStarHovering.value = true"
                @focus="state.isStarHovering.value = true"
                @mouseleave="state.isStarHovering.value = false"
                @blur="state.isStarHovering.value = false"
                position="relative"
                display="inline"
              >
                <OhVueIcon
                  name="md-starrate-round"
                  scale="1.1"
                  style="margin-bottom: 1px; color: #9badb6; margin-right: 2px"
                />
                <JobHoverText
                  v-if="state.isStarHovering.value"
                  :companyName="job.company_name"
                />
              </CBox>
              <!-- huh -->
              <span v-if="props.isMissingAlgoliaContext">{{ job.company_name }}</span>
              <ais-snippet v-else :hit="job" attribute="company_name" />
            </CText>
          </CFlex>

          <CIcon
            v-show="state.isHovering.value"
            name="chevron-down"
            pos="absolute"
            right="0"
            top="0"
            :transform="state.isAccordionOpen.value ? 'rotate(180deg)' : ''"
            color="gray.400"
            aria-label="open"
          />
        </CFlex>

        <TransitionCollapseFade :is-visible="!state.isAccordionOpen.value" duration-ms="25">
          <CFlex
            :ml="{ lg: '60px' }"
            :pl="{ lg: 3 }"
            mt="3"
            :justify="comp.isHasLocation ? 'space-between' : 'flex-end'"
            align="center"
            :font-size="{ base: 'xs', lg: 'sm' }"
          >
            <JobCardLocationShort :job="props.job" />

            <CText color="#9BADB6">
              {{ timeSincePosting }}
            </CText>
          </CFlex>
        </TransitionCollapseFade>

        <TransitionCollapseFade
          :is-visible="!state.isAccordionOpen.value && props.isHasTextQuery"
        >
          <CBox :mt="comp.space / 2" font-size="15px">
            <ais-snippet :hit="job" attribute="description_for_search" />
          </CBox>
        </TransitionCollapseFade>

        <TransitionCollapseFade :is-visible="state.isAccordionOpen.value" duration-ms="300">
          <CBox mt="4" font-size="15px">
            <CFlex
              mt="3"
              :justify="comp.isHasLocation ? 'space-between' : 'flex-end'"
              :align="{ base: 'flex-start', lg: 'center' }"
              font-size="sm"
            >
              <CHStack>
                <CIcon name="fa-map-marker-alt" fill="#9BADB6" mt="3px" />
                <CFlex
                  :direction="{ base: 'column', lg: 'row' }"
                  :align="{ lg: 'center' }"
                  :gap="{ base: 'px', lg: 3 }"
                >
                  <CFlex
                    v-if="job.tags_city.length"
                    v-for="(city, index) in job.tags_city"
                    :key="city"
                    align="center"
                    gap="3"
                  >
                    <CBox
                      :display="{ base: 'none', lg: 'block' }"
                      v-if="index !== 0"
                      w="3px"
                      h="3px"
                      bg="gray.300"
                    />

                    <CFlex>{{ city }}</CFlex>
                  </CFlex>

                  <CBox
                    :display="{ base: 'none', lg: 'block' }"
                    v-if="job.tags_city.length && remotesAndMaybeCountries.length"
                    w="3px"
                    h="3px"
                    bg="gray.300"
                  />
                  <!-- v-if="!job.tags_city.length && countriesWithRemotes.length > 0" -->

                  <CFlex
                    v-if="remotesAndMaybeCountries.length"
                    v-for="(country, index) in remotesAndMaybeCountries"
                    :key="country"
                  >
                    <CFlex align="center" gap="3" v-if="country !== strings.remoteLiteral">
                      <CBox
                        :display="{ base: 'none', lg: 'block' }"
                        v-if="index !== 0"
                        w="3px"
                        h="3px"
                        bg="gray.300"
                      />

                      <CFlex>{{ country }}</CFlex>
                    </CFlex>
                  </CFlex>
                </CFlex>
              </CHStack>

              <CText color="#9BADB6">
                {{ timeSincePosting }}
              </CText>
            </CFlex>

            <JobCardTags :job="props.job" />

            <CBox mt="4">
              <CText color="gray.400" font-size="sm">DESCRIPTION</CText>
              <CText mt="2" v-html="job.description_short + ' [...]'" />
            </CBox>

            <CBox mt="4">
              <CText color="gray.400" font-size="sm">APPLICATIONS CLOSE</CText>
              <CText mt="2">
                {{
                  job.closes_at
                    ? format(new Date(props.job.closes_at * 1000), "do MMMM yyyy")
                    : "Rolling applications"
                }}
              </CText>
            </CBox>

            <CBox :mt="4 - 1" v-if="job.company_description">
              <CText color="gray.400" font-size="sm">ABOUT THIS ORGANISATION</CText>
              <CText mt="2" v-html="job.company_description" />
            </CBox>

            <CFlex :mt="job.company_description ? 4 : 3" align="baseline" gap="4">
              <CText font-size="sm" color="gray.400">LINKS</CText>
              <CLink
                class="link"
                :href="props.job.company_url"
                @click="
                  (event: MouseEvent) => {
                    event.stopPropagation();
                    tracking.sendJobEvent(props.job, 'company_url clicked');
                  }
                "
                @auxclick="
                  (event) => {
                    tracking.sendJobEvent(props.job, 'company_url clicked');
                  }
                "
                is-external
              >
                Homepage
              </CLink>
              <CLink
                class="link"
                v-if="!!props.job?.company_ea_forum_url"
                :href="props.job?.company_ea_forum_url"
                @click="
                  (event: MouseEvent) => {
                    event.stopPropagation();
                    tracking.sendJobEvent(props.job, 'company_ea_forum_url clicked');
                  }
                "
                @auxclick="
                  async (event) => {
                    await tracking.sendJobEvent(props.job, 'company_ea_forum_url clicked');
                  }
                "
                is-external
              >
                EA Forum Page
              </CLink>
            </CFlex>

            <CFlex :gap="comp.space" mt="4">
              <CLink
                @click="
                   (event: MouseEvent) => {
                    event.stopPropagation();
                    tracking.sendJobEvent(props.job, 'url_external clicked');
                  }
                "
                class="link"
                @auxclick="tracking.sendJobEvent(props.job, 'url_external clicked')"
                :href="job.url_external"
                is-external
                :_hover="{ textDecoration: 'none !important' }"
                display="flex"
                align-items="center"
              >
                <CButton>
                  VIEW JOB DETAILS
                  <OhVueIcon
                    name="ri-external-link-line"
                    scale="1"
                    color="white"
                    style="margin-left: 5px; margin-bottom: 3px"
                  />
                </CButton>
              </CLink>
            </CFlex>
          </CBox>
        </TransitionCollapseFade>
      </CBox>
    </CBox>
  </div>
</template>
