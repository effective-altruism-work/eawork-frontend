<script setup lang="ts">
import { useRuntimeConfig } from "#app";
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
    <div
      class="mb-3 bg-white p-4 lg:p-6 rounded-xl hover:cursor-pointer transition-shadow"
      v-if="!props.isHidden"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseover="state.isHovering.value = true"
      @focus="state.isHovering.value = true"
      @mouseleave="state.isHovering.value = false"
      @blur="state.isHovering.value = false"
      :_hover="{
        boxShadow: state.isAccordionOpen.value ? comp.activeShadow : comp.activeShadowBorder,
      }"
      :box-shadow="state.isAccordionOpen.value ? comp.activeShadow : 0"
    >
      <div>
        <div class="flex relative">
          <img
            class="bg-white rounded"
            v-if="props.job"
            :alt="`${job.company_name} logo`"
            :src="job.company_logo_url"
            width="60"
            height="60"
            min-w="60px"
            loading="lazy"
          />

          <div class="flex ml-3 justify-center flex-col gap-3">
            <p class="font-bold leading-tight lg:leading-none lg:text-xl">
              <span v-if="props.isMissingAlgoliaContext">{{ job.title }}</span>
              <ais-snippet v-else :hit="job" attribute="title" />
            </p>

            <div
              class="leadning-tight lg:leading-none relative text-sm lg:text-md"
              :left="job?.company_is_recommended_org ? '-3px' : ''"
            >
              <div
                class="relative inline"
                v-if="job?.company_is_recommended_org"
                @mouseover="state.isStarHovering.value = true"
                @focus="state.isStarHovering.value = true"
                @mouseleave="state.isStarHovering.value = false"
                @blur="state.isStarHovering.value = false"
              >
                <OhVueIcon
                  name="md-starrate-round"
                  scale="1.1"
                  class="mb-[1px] mr-0.5 text-[#9badb6]"
                />
                <JobHoverText
                  v-if="state.isStarHovering.value"
                  :companyName="job.company_name"
                />
              </div>
              <!-- huh -->
              <span v-if="props.isMissingAlgoliaContext">{{ job.company_name }}</span>
              <ais-snippet v-else :hit="job" attribute="company_name" />
            </div>
          </div>

          <OhVueIcon
            class="text-gray-400 top-0 right-0 absolute"
            v-show="state.isHovering.value"
            name="chevron-down"
            :transform="state.isAccordionOpen.value ? 'rotate(180deg)' : ''"
            aria-label="open"
          />
        </div>

        <TransitionCollapseFade :is-visible="!state.isAccordionOpen.value" duration-ms="25">
          <div
            class="flex lg:pl-3 lg:ml-[60px] mt-3 items-center text-xs lg:text-sm"
            :justify="comp.isHasLocation ? 'space-between' : 'flex-end'"
          >
            <JobCardLocationShort :job="props.job" />

            <p class="text=[#9BADB6]">
              {{ timeSincePosting }}
            </p>
          </div>
        </TransitionCollapseFade>

        <TransitionCollapseFade
          :is-visible="!state.isAccordionOpen.value && props.isHasTextQuery"
        >
          <CBox :mt="comp.space / 2" font-size="15px">
            <ais-snippet :hit="job" attribute="description_for_search" />
          </CBox>
        </TransitionCollapseFade>

        <TransitionCollapseFade :is-visible="state.isAccordionOpen.value" duration-ms="300">
          <div class="mt-4 text-base">
            <div
              class="flex mt-3 text-sm items-start lg:items-center"
              :justify="comp.isHasLocation ? 'space-between' : 'flex-end'"
            >
              <div>
                <OhVueIcon name="fa-map-marker-alt" fill="#9BADB6" class="mt-[3px]" />
                <div class="flex flex-col lg:flex-row items-center lg:gap-3">
                  <div
                    class="flex items-center gap-3"
                    v-if="job.tags_city.length"
                    v-for="(city, index) in job.tags_city"
                    :key="city"
                  >
                    <div
                      class="hidden lg:block w-[3px] h-[3px] bg-gray-300"
                      v-if="index !== 0"
                    />

                    <div class="flex">{{ city }}</div>
                  </div>

                  <div
                    class="hidden lg:block w-[3px] h-[3px] bg-gray-300"
                    v-if="job.tags_city.length && remotesAndMaybeCountries.length"
                  />
                  <!-- v-if="!job.tags_city.length && countriesWithRemotes.length > 0" -->

                  <div
                    class="flex"
                    v-if="remotesAndMaybeCountries.length"
                    v-for="(country, index) in remotesAndMaybeCountries"
                    :key="country"
                  >
                    <div
                      class="flex items-center gap-3"
                      v-if="country !== strings.remoteLiteral"
                    >
                      <div
                        class="hidden lg:block w-[3px] h-[3px] bg-gray-300"
                        v-if="index !== 0"
                      />

                      <div class="flex">{{ country }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-[#9BADB6]">
                {{ timeSincePosting }}
              </p>
            </div>

            <JobCardTags :job="props.job" />

            <div class="mt-4" mt="4">
              <p class="text-gray-400 text-sm">DESCRIPTION</p>
              <p class="mt-2" v-html="job.description_short + ' [...]'" />
            </div>

            <div class="mt-4">
              <p class="text-gray-400 text-sm">APPLICATIONS CLOSE</p>
              <p class="mt-2">
                {{
                  job.closes_at
                    ? format(new Date(props.job.closes_at * 1000), "do MMMM yyyy")
                    : "Rolling applications"
                }}
              </p>
            </div>

            <div class="mt-3" v-if="job.company_description">
              <p class="text-gray-400 text-sm">ABOUT THIS ORGANISATION</p>
              <p class="mt-2" v-html="job.company_description" />
            </div>

            <div
              class="flex items-baseline gap-4"
              :class="job.company_description ? 'mt-4' : 'mt-3'"
            >
              <p class="text-gray-400 text-sm">LINKS</p>
              <a
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
              </a>
              <a
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
              </a>
            </div>

            <div class="flex mt-4" :gap="comp.space" mt="4">
              <a
                class="flex items-center hover:no-underline"
                @click="
                   (event: MouseEvent) => {
                    event.stopPropagation();
                    tracking.sendJobEvent(props.job, 'url_external clicked');
                  }
                "
                :class="'link'"
                @auxclick="tracking.sendJobEvent(props.job, 'url_external clicked')"
                :href="job.url_external"
                is-external
              >
                <button>
                  VIEW JOB DETAILS
                  <OhVueIcon
                    name="ri-external-link-line"
                    scale="1"
                    color="white"
                    class="ml-[5px] mb-[3px]"
                  />
                </button>
              </a>
            </div>
          </div>
        </TransitionCollapseFade>
      </div>
    </div>
  </div>
</template>
