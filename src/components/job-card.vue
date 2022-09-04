<script setup lang="ts">
import { CFlex, CBox, CButton, CLink, CText } from "@chakra-ui/vue-next";
import { formatDistance } from "date-fns";
import { OhVueIcon } from "oh-vue-icons";
import { onMounted, ref, watch } from "vue";
import JobView from "~/components/job-view.vue";
import JobSkills from "~/components/job-skills.vue";
import BtnJobFlag from "~/components/btn-job-flag.vue";
import { theme } from "~/styles/theme";
import { urls } from "~/constants";
import { JobAlgolia } from "~/utils/types";

const props = defineProps<{ job: JobAlgolia; isHasTextQuery?: boolean | string | null; }>();

const state = {
  isShowModal: ref(false),
};
const space = 6;


</script>

<template>
  <CBox mb="12" :key="job.objectID" display="block">
    <CBox display="block">
      <CFlex>
        <CLink :href="job.company_url">
          <chakra.img
            v-if="job.company_logo_url"
            :src="job.company_logo_url"
            w="56px"
            h="56px"
            bg="gray.200"
            border="1px solid #E2E8F0"
            loading="lazy"
          />
        </CLink>

        <CFlex
          :ml="job.company_logo_url ? 3 : 0"
          mt="1"
          mb="1"
          justiy="space-between"
          direction="column"
        >
          <CText font-size="lg" font-weight="bold" line-height="1">
            <ais-snippet :hit="job" attribute="title" />
          </CText>

          <CFlex mt="5px" gap="3" align="center" display="flex">
            <CText><ais-snippet :hit="job" attribute="company_name" /></CText>
            <CBox v-if="job.tags_city[0]" w="3px" h="3px" mt="2px" bg="gray.300" />
            <CText v-if="job.tags_city[0]">{{ job.tags_city[0] }}</CText>
          </CFlex>
        </CFlex>
      </CFlex>
      
      <JobSkills :job="props.job"/>

      <CBox v-if="props.isHasTextQuery" :mt="space / 2">
        <ais-snippet :hit="job" attribute="description_short" />
      </CBox>
    </CBox>

    <CFlex mt="3" justify="space-between" align="center">
      <CFlex :gap="space">

        <CLink
          :href="urls.jobs.view(props.job.post_pk)"
          @click.left.prevent="state.isShowModal.value = true"
          :_hover="{textDecoration: 'none'}"
        >
          <CButton
            size="sm"
            color-scheme="blue"
            variant="outline"
          >
            <OhVueIcon
              name="oi-eye"
              scale="1"
              color="var(--colors-blue-500)"
              style="margin-right: 5px;"
            />
            View
          </CButton>
        </CLink>
      
        <CLink
          :href="job.url_external"
          is-external
          :_hover="{ textDecoration: 'none !important' }"
          display="flex"
          align-items="center"
        >
          <CButton size="sm" color-scheme="blue" variant="link">
            Apply
            <OhVueIcon
              name="ri-external-link-line"
              scale="0.7"
              color="var(--colors-blue-500)"
              style="margin-left: 5px; margin-top: 1px;"
            />
          </CButton>
        </CLink>
        
        <CFlex align="center">
          <NuxtLink :to="urls.jobs.edit(props.job.post_pk)">
            <CButton size="sm" variant="link">
              Edit
            </CButton>
          </NuxtLink>
        </CFlex>

        <BtnJobFlag :job="props.job" />
      </CFlex>

      <CFlex gap="3" align="center" justify="center" h="100%" pt="0.5">
        <CText v-if="props.job.closes_at" color="gray.500" font-size="sm">
          Closes
          {{
            formatDistance(new Date(props.job.closes_at * 1000), new Date(), {
              addSuffix: true,
            })
          }}
        </CText>
        <CBox v-if="props.job.closes_at" w="3px" h="3px" mt="3px" bg="gray.300" />
        <CText color="gray.500" font-size="sm">
          Posted
          {{
            formatDistance(new Date(props.job.posted_at * 1000), new Date(), {
              addSuffix: true,
            })
          }}
        </CText>
      </CFlex>

    </CFlex>
    
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
