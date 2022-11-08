<script setup lang="ts">
import { useRuntimeConfig } from "#app";
import { CFlex, CButton, CInput, CText, CBox } from "@chakra-ui/vue-next";
// import { captureEvent } from "@sentry/vue";
import axios from "axios";
import { OhVueIcon } from "oh-vue-icons";
import { ref, watch } from "vue";
import { theme } from "~/styles/theme";
import { tracking } from "~/utils/tracking";
import * as Sentry from "@sentry/vue";
import emailIsValid from "../utils/emailIsValid";
const { captureEvent } = Sentry;

const props = defineProps<{
  queryJson: null | {
    query: string;
    facetFilters: string[][];
  };
  totalFiltersLength: number;
}>();

const hooks = {
  config: useRuntimeConfig(),
};

const state = {
  email: ref(""),
  isShowModal: ref(false),
  fsm: ref<"ready" | "success" | "submitting" | "error">("ready"),
  error: ref(""),
};

watch(state.isShowModal, () => {
  state.fsm.value = "ready";
});

async function createJobAlert() {
  state.error.value = "";
  if (state.email.value === "") {
    return;
  }

  if (!emailIsValid(state.email.value)) {
    state.fsm.value = "error";
    state.error.value = "Email is invalid";
    return;
  }

  state.fsm.value = "submitting";

  try {
    const res = await axios.post(`${hooks.config.public.apiBase}/jobs/subscribe`, {
      email: state.email.value,
      query_json: props.queryJson,
      query_string: "",
    });

    if (res.data.success) {
      state.fsm.value = "success";

      const separated: { [key: string]: string[] } = {};

      if (props?.queryJson?.facetFilters) {
        for (const subarr of props.queryJson.facetFilters) {
          const prefix = subarr[0].substring(0, subarr[0].indexOf(":"));

          switch (prefix) {
            case "tags_area":
              separated["tags_area"] = subarr;
              break;
            case "tags_role_type":
              separated["tags_role_type"] = subarr;
              break;
            case "tags_city":
              separated["tags_city"] = subarr;
              break;
            case "tags_country":
              separated["tags_country"] = subarr;
              break;
            default:
              break;
          }
        }
      }

      await tracking.sendEvent("alert sign up", {
        label: window.location.href,
        problemArea: separated?.tags_area || null,
        roleType: separated?.tags_role_type || null,
        ...tracking.get80kLocations(
          "tags_city" in separated ? separated.tags_city : [],
          "tags_country" in separated ? separated.tags_country : [],
        ),
      });
    } else {
      console.log("non success");
      state.fsm.value = "error";
    }
  } catch (e) {
    captureEvent(e);
    console.log("error", e);
    state.fsm.value = "error";
  }
}
</script>

<template>
  <CButton color-scheme="blue" @click="state.isShowModal.value = true">
    <OhVueIcon name="md-addalert-round" scale="1" color="white" />
    <CText ml="2">
      <span>Set up alerts</span>
      <span v-if="props.queryJson"> for this filter</span>
    </CText>
  </CButton>

  <VueFinalModal
    v-model="state.isShowModal.value"
    :lock-scroll="true"
    :click-to-close="true"
    :esc-to-close="true"
  >
    <!-- max-h="fit-content" -->
    <CFlex
      pos="absolute"
      :top="{ base: '48px', lg: totalFiltersLength > 8 ? 24 : 44 }"
      right="0"
      left="0"
      max-w="390px"
      m="auto"
      max-height="fit-content"
      :gap="theme.spaces.md"
      :p="theme.spaces.md"
      direction="column"
      bg="white"
    >
      <CFlex justify="space-between">
        <CText v-if="props.queryJson" w="fit-content" font-size="lg">
          Subscribe to new jobs that match your query
        </CText>
        <CBox v-else>
          <CText w="fit-content" font-size="lg">Subscribe to all new job posts</CText>
          <CText w="fit-content" color="gray.500" font-size="sm"
            >(because you haven't selected any filters or searched for any keywords)</CText
          >
        </CBox>

        <CBox
          font-size="xs"
          color="blue.500"
          border="1px solid"
          border-color="blue.500"
          border-radius="5"
          px="1"
          m="2"
          h="fit-content"
        >
          BETA
        </CBox>
      </CFlex>

      <CText
        v-if="props.queryJson"
        bg="gray.100"
        border-radius="md"
        py="3"
        px="4"
        mt="-1"
        :font-size="{
          base: 'xs',
          lg: totalFiltersLength > 16 ? 'xs' : totalFiltersLength > 8 ? 'sm' : 'md',
        }"
      >
        <CText v-if="props.queryJson.query">Query: {{ props.queryJson.query }}</CText>
        <CText
          v-for="filter in props.queryJson?.facetFilters
            .flat()
            .filter((f) => !f.includes('Multiple experience levels')) || // don't need to display this
          []"
          :key="filter"
        >
          {{
            filter
              .replace("company_is_recommended_org:true", "Filter: Recommended orgs")
              .replace("company_name:", "Org: ")
              .replace("org_data:", "Org: ")
              .replace(/tags_\w*:/, "Filter: ")
          }}
        </CText>
      </CText>

      <CInput
        v-model="state.email.value"
        type="email"
        name="email"
        font-size="md"
        placeholder="joe@example.com"
      />

      <CFlex justify="space-between">
        <CText font-size="12px" max-w="200px" line-height="1.3" color="gray.600">
          You will receive updates daily (if there are new roles that match your query) and
          you can unsubscribe at any time
        </CText>

        <CButton
          @click="createJobAlert()"
          :is-loading="state.fsm.value === 'submitting'"
          max-w="fit-content"
          :disabled="!state.email.value"
          align-self="flex-end"
          color-scheme="blue"
          :opacity="state.email.value ? 1 : 0.5"
          font-size="lg"
          :_hover="
            state.email.value
              ? { cursor: 'pointer', backgroundColor: 'blue.700' }
              : { backgroundColor: null, cursor: 'default' }
          "
        >
          Subscribe
        </CButton>
      </CFlex>

      <CText v-if="state.fsm.value === 'success'" color="green.500">Subscribed!</CText>
      <CText v-if="state.fsm.value === 'error'" color="red.500">{{
        state.error.value || "An error occurred"
      }}</CText>
    </CFlex>
  </VueFinalModal>
</template>
