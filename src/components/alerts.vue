<script setup lang="ts">
import { useRuntimeConfig } from "#app";
// import { captureEvent } from "@sentry/vue";
import axios from "axios";
import { OhVueIcon } from "oh-vue-icons";
import { ref, watch } from "vue";
import { theme } from "~/styles/theme";
import { tracking } from "~/utils/tracking";
import * as Sentry from "@sentry/vue";
import emailIsValid from "~/utils/emailIsValid";
import labelTag from "~/utils/labelTag";
import KButton from "./generics/kButton.vue";
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

function replacer(s: string): string {
  return s
    .replace("company_is_recommended_org", "Filter")
    .replace("company_name:", "Org")
    .replace("org_data:", "Org")
    .replace(/tags_\w*/, "Filter");
}
</script>

<template>
  <AlertsButton
    :filtered="!!props?.queryJson"
    @show-modal="() => (state.isShowModal.value = true)"
  />

  <VueFinalModal
    v-model="state.isShowModal.value"
    :lock-scroll="true"
    :click-to-close="true"
    :esc-to-close="true"
  >
    <!-- max-h="fit-content" -->
    <div
      class="flex absolute top-12 right-0 left-0 max-w-[390px] m-auto max-h-fit gap-2 p-2 flex-col bg-white"
      :class="totalFiltersLength > 8 ? 'top-8' : 'top-11'"
    >
      <div class="flex justify-between">
        <p class="w-fit text-lg" v-if="props.queryJson">
          Subscribe to new jobs that match your query
        </p>
        <div v-else>
          <p class="w-fit text-lg">Subscribe to all new job posts</p>
          <p class="w-fit text-gray-500 text-sm">
            (because you haven't selected any filters or searched for any keywords)
          </p>
        </div>

        <div
          class="text-xs text-eightyk-500 border border-eightyk-500 rounded px-1 m-2 h-fit"
        >
          BETA
        </div>
      </div>

      <div
        v-if="props.queryJson"
        class="bg-gray-100 rounded py-3 px-4 -mt-1 text-xs"
        :class="
          totalFiltersLength > 16
            ? 'lg:text-xs'
            : totalFiltersLength > 8
            ? 'lg:text-sm'
            : 'lg:text-md'
        "
      >
        <p v-if="props.queryJson.query">Query: {{ props.queryJson.query }}</p>
        <p
          v-for="filter in props.queryJson?.facetFilters
            .flat()
            .filter((f) => !f.includes('Multiple experience levels')) || // don't need to display this
          []"
          :key="filter"
        >
          {{
            filter
              .split(":")
              .map((x, i) => (i ? labelTag(x) : replacer(x)))
              .join(": ")
          }}
        </p>
      </div>

      <input
        class="text-base"
        v-model="state.email.value"
        type="email"
        name="email"
        placeholder="joe@example.com"
      />

      <div class="flex justify-between">
        <p class="text-xs max-w-[200px] text-gray-600 leading-tight">
          You will receive updates daily (if there are new roles that match your query) and
          you can unsubscribe at any time
        </p>

        <KButton
          class="max-w-fit self-end text-lg"
          :class="
            state.email.value
              ? 'opacity-100 hover:cursor-pointer hover:bg-eightyk-700'
              : 'opacity-50'
          "
          @click="createJobAlert()"
          :is-loading="state.fsm.value === 'submitting'"
          :disabled="!state.email.value"
        >
          Subscribe
        </KButton>
      </div>

      <p class="text-green-500" v-if="state.fsm.value === 'success'">Subscribed!</p>
      <p class="text-red-500" v-if="state.fsm.value === 'error'">
        {{ state.error.value || "An error occurred" }}
      </p>
    </div>
  </VueFinalModal>
</template>
