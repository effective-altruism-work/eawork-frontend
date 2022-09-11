<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CText } from "@chakra-ui/vue-next";
import { formatDistance, format } from "date-fns";
import { OhVueIcon } from "oh-vue-icons";
import { onMounted, ref, watch } from "vue";
import JobCardTags from "~/components/job-card-tags.vue";
import JobView from "~/components/job-view.vue";
import { theme } from "~/styles/theme";
import { useComp } from "~/utils/structs";
import { JobAlgolia } from "~/utils/types";
import { tracking } from "~/utils/tracking";
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

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
    activeShadow: `0 8px 24px 0 #9badb629, ${activeShadowBorder}`,
  }
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
    p="6"
    border-radius="12px"
    :_hover="{
      cursor: 'pointer',
      boxShadow: state.isAccordionOpen.value ? comp.activeShadow : comp.activeShadowBorder,
    }"
    :box-shadow="state.isAccordionOpen.value ? comp.activeShadow : 0"
    transition="box-shadow 0.2s"
  >
    <CBox>
      <CFlex>
        <CLink :href="job?.company_url" :id="comp.id">
          <chakra.img
            v-if="props.job"
            :src="job.company_logo_url"
            w="60px"
            min-w="60px"
            h="60px"
            bg="white"
            loading="lazy"
          />
        </CLink>

        <CFlex
          ml="3"
          justify="center"
          direction="column"
          gap="3"
        >
          <CText font-weight="bold" line-height="none" font-size="xl">
            <span v-if="props.isMissingAlgoliaContext">{{ job.title }}</span>
            <ais-snippet v-else :hit="job" attribute="title" />
          </CText>

          <CText line-height="none">
            <span v-if="props.isMissingAlgoliaContext">{{ job.company_name }}</span>
            <ais-snippet v-else :hit="job" attribute="company_name" />
          </CText>
        </CFlex>
      </CFlex>
  
      <CFlex
        ml="60px"
        pl="3"
        mt="3"
        justify="space-between"
        align="center"
        font-size="sm"
      >
        <CFlex align="center" gap="1">
          <OhVueIcon
            name="fa-map-marker-alt"
            scale="0.75"
            color="#9BADB6"
            style="margin-bottom: 1px"
          />
          <CFlex
            v-for="(city, index) in props.job.tags_city"
            :key="city"
            align="center"
            gap="3"
            color="#9BADB6"
          >
            <CText>{{ city }}</CText>
            <CBox
              v-if="job.tags_city[index + 1]"
              w="3px"
              h="3px"
              mr="3"
              bg="gray.300"
            />
          </CFlex>
        </CFlex>
        
        <CText color="#9BADB6">
          <span v-if="props.job.closes_at">Posted</span>
          {{
            formatDistance(new Date(props.job.posted_at * 1000), new Date(), {
              addSuffix: true,
            })
          }}
        </CText>
      </CFlex>

      <CollapseTransition>
        <CBox
          :mt="comp.space / 2"
          v-show="!state.isAccordionOpen.value && props.isHasTextQuery"
          font-size="15px"
        >
          <ais-snippet :hit="job" attribute="description_short" />
        </CBox>
      </CollapseTransition>

      
      <CollapseTransition>
        <CBox v-show="state.isAccordionOpen.value">
          <Transition name="fade">
            
            <CBox
              v-if="state.isAccordionOpen.value"
              mt="4"
              font-size="15px"
            >
              <JobCardTags :job="props.job" />

              <CBox mt="4">
                <CText color="gray.400" font-size="sm">DESCRIPTION</CText>
                <CText mt="2">{{ job.description_short }}</CText>
              </CBox>
              
              <CBox mt="4" v-if="job.closes_at">
                <CText color="gray.400" font-size="sm">APPLICATIONS CLOSE</CText>
                <CText mt="2">
                  {{
                    format(new Date(props.job.closes_at * 1000), "do MMMM yyyy")
                  }}
                </CText>
              </CBox>

              <CBox mt="4">
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

          </Transition>
        </CBox>
      </CollapseTransition>

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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
