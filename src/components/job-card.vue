<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CBox, CButton, CHStack, CVStack, CLink, CIcon, CText } from "@chakra-ui/vue-next";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { formatDistance, format } from "date-fns";
import { OhVueIcon } from "oh-vue-icons";
import { computed, onMounted, ref, watch } from "vue";
import JobCardLocationShort from "~/components/job-card-location-short.vue";
import JobCardTags from "~/components/job-card-tags.vue";
import JobView from "~/components/job-view.vue";
import { breakpointsChakra } from "~/constants";
import { theme } from "~/styles/theme";
import { useComp } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";
import { tracking } from "~/utils/tracking";
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { strings } from "~/constants";

const props = defineProps<{
  job: JobAlgolia;
  isHasTextQuery?: boolean | string | null;
  isExpanded?: boolean;
  isHidden?: boolean;
  isMissingAlgoliaContext?: boolean;
}>();

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
};

const comp = useComp(() => {
  const activeShadowBorder = "inset 0 0 0 1px #E1E6EA";
  return {
    space: 6,
    id: `job-card-${props.job.post_pk}`,
    activeShadowBorder,
    isJobGlobal: props.job.tags_country.includes("Global"),
    activeShadow: `0 8px 24px 0 #9badb629, ${activeShadowBorder}`,
    isHasLocation: props.job.tags_city.length || props.job.tags_country.length,
  };
});

onMounted(async () => {
  await tracking.bindAnchorsTracking({
    selector: `#${comp.id}`,
    defaults: {
      action: "Viewed organisation homepage",
    },
  });
});

function onCardClick() {
  if (state.isAccordionOpen.value) {
    emit("cardCollapsed");
  } else {
    emit("cardExpanded");
    tracking.sendEvent(props.job, "viewed");
  }
  state.isAccordionOpen.value = !state.isAccordionOpen.value;
}

</script>

<template>
  <CBox
    v-if="!props.isHidden"
    @click="onCardClick"
    @mouseover="state.isHovering.value = true"
    @mouseleave="state.isHovering.value = false"
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

        <CFlex
          ml="3"
          justify="center"
          direction="column"
          gap="3"
        >
          <CText
            font-weight="bold"
            :line-height="[1.3, null, 'none']"
            :font-size="{ lg: 'xl' }"
          >
            <span v-if="props.isMissingAlgoliaContext">{{ job.title }}</span>
            <ais-snippet v-else :hit="job" attribute="title" />
          </CText>

          <CText :line-height="[1.3, null, 'none']" :font-size="{ base: 'sm', lg: 'md' }">
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
            {{
              formatDistance(new Date(props.job.posted_at * 1000), new Date(), {
                addSuffix: true,
              })
            }}
          </CText>
        </CFlex>
      </TransitionCollapseFade>

      <TransitionCollapseFade :is-visible="!state.isAccordionOpen.value && props.isHasTextQuery">
        <CBox
          :mt="comp.space / 2"
          font-size="15px"
        >
          <ais-snippet :hit="job" attribute="description_short" />
        </CBox>
      </TransitionCollapseFade>
      
      <TransitionCollapseFade :is-visible="state.isAccordionOpen.value" duration-ms="300">
        <CBox
          mt="4"
          font-size="15px"
        >
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
                :align="{lg: 'center'}"
                :gap="{ base: 'px', lg: 3 }"
              >
                <CFlex
                  v-if="props.job.tags_country.includes(strings.remoteLiteral)"
                >
                  {{ strings.remoteLiteral }}
                </CFlex>
                <CBox
                  v-if="props.job.tags_country.includes(strings.remoteLiteral) && props.job.tags_country.length !== 1"
                  :display="{ base: 'none', lg: 'block' }"
                  w="3px"
                  h="3px"
                  bg="gray.300"
                />

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

                <CFlex
                  v-if="!job.tags_city.length"
                  v-for="(country, index) in job.tags_country"
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
              {{
                formatDistance(new Date(props.job.posted_at * 1000), new Date(), {
                  addSuffix: true,
                })
              }}
            </CText>
          </CFlex>
          
          <JobCardTags :job="props.job" />

          <CBox mt="4">
            <CText color="gray.400" font-size="sm">DESCRIPTION</CText>
            <CText mt="2" v-html="job.description_short + ' [...]'" />
          </CBox>
          
          <CBox mt="4" v-if="job.closes_at">
            <CText color="gray.400" font-size="sm">APPLICATIONS CLOSE</CText>
            <CText mt="2">
              {{
                format(new Date(props.job.closes_at * 1000), "do MMMM yyyy")
              }}
            </CText>
          </CBox>

          <CBox :mt="4 - 1">
            <CText color="gray.400" font-size="sm">ABOUT THIS ORGANISATION</CText>
            <CText mt="2" v-if="job.company_description">{{ job.company_description }}</CText>
          </CBox>
          
          <CFlex :mt="job.company_description ? 4 : 3" align="baseline" gap="4">
            <CText font-size="sm" color="gray.400">LINKS</CText>
            <CLink :href="props.job.company_url" is-external>Homepage</CLink>
            <CLink :href="props.job.company_career_page_url" is-external>Vacancies page</CLink>
          </CFlex>

          <CFlex :gap="comp.space" mt="4">
    
            <!--<CLink-->
            <!--  :href="urls.jobs.view(props.job.post_pk)"-->
            <!--  @click.left.prevent="state.isShowModal.value = true"-->
            <!--  :_hover="{textDecoration: 'none'}"-->
            <!-- >-->
            <!--  <CButton-->
            <!--    size="sm"-->
            <!--    color-scheme="blue"-->
            <!--    variant="outline"-->
            <!--  >-->
            <!--    <OhVueIcon-->
            <!--      name="oi-eye"-->
            <!--      scale="1"-->
            <!--      color="var(&#45;&#45;colors-blue-500)"-->
            <!--      style="margin-right: 5px;"-->
            <!--    />-->
            <!--    View-->
            <!--  </CButton>-->
            <!--</CLink>-->
          
            <CLink
              @click="tracking.sendEvent(props.job, 'url_external clicked');"
              @auxclick="tracking.sendEvent(props.job, 'url_external clicked');"
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
                  style="margin-left: 5px; margin-bottom: 3px;"
                />
              </CButton>
            </CLink>
    
<!--                <Transition name="fade">-->
<!--                  <CButton-->
<!--                    v-if="state.isHovering.value"-->
<!--                    variant="link"-->
<!--                    color="gray.500"-->
<!--                    font-size="sm"-->
<!--                  >-->
<!--                    <CBox-->
<!--                      :transform="state.isAccordionOpen.value ? 'rotate(180deg)' : 'rotate(0)'"-->
<!--                      :mt="'2px'"-->
<!--                      :mr="'5px'"-->
<!--                    >-->
<!--                      <OhVueIcon-->
<!--                        name="hi-chevron-down"-->
<!--                        scale="1.1"-->
<!--                        color="var(&#45;&#45;colors-gray-400)"-->
<!--                      />-->
<!--                    </CBox>-->
<!--                    <span v-if="state.isAccordionOpen.value">Collapse</span>-->
<!--                    <span v-else>Expand</span>-->
<!--                  </CButton>-->
<!--                </Transition>-->
    
            <!--<CFlex align="center">-->
            <!--  <NuxtLink :to="urls.jobs.edit(props.job.post_pk)">-->
            <!--    <CButton size="sm" variant="link">-->
            <!--      Edit-->
            <!--    </CButton>-->
            <!--  </NuxtLink>-->
            <!--</CFlex>-->
            
            <!--<BtnJobFlag :job="props.job" />-->
          </CFlex>

        </CBox>

      </TransitionCollapseFade>

    </CBox>
    
    <VueFinalModal
      v-if="state.isShowModal.value"
      v-model="state.isShowModal.value"
      :lock-scroll="false"
      :click-to-close="true"
      :esc-to-close="true"
      :key="props.job.objectID"
    >
      <CFlex
        pos="absolute"
        top="44"
        right="0"
        left="0"
        max-w="6xl"
        max-h="fit-content"
        m="auto"
        :gap="theme.spaces.md"
        :p="theme.spaces.md"
        direction="column"
        bg="white"
        border-radius="md"
      >
        <JobView
          :job-pk="props.job.objectID"
          :job="props.job"
          :is-visible="state.isShowModal.value"
        />
      </CFlex>
    </VueFinalModal>

  </CBox>
</template>
