import { useRuntimeConfig } from "#app";
import { FormKitNode } from "@formkit/core";
import axios from "axios";
import { ref } from "vue";
import { strings } from "~/constants";

export function useForm(args: {
  path: string;
  dataExtra?: any | CallableFunction;
  serializers?: { [key: string]: (value: any) => any };
  afterSend?: () => void;
}) {
  const hooks = {
    config: useRuntimeConfig(),
  };

  const state = {
    isSuccess: ref(false),
  };

  async function submit(data: any, node: FormKitNode) {
    state.isSuccess.value = false;

    let dataAll = {};
    if (typeof args.dataExtra === "object") {
      dataAll = { ...dataAll, ...args.dataExtra };
    } else if (typeof args.dataExtra === "function") {
      dataAll = { ...dataAll, ...args.dataExtra() };
    }

    try {
      const res = await axios.post(`${hooks.config.public.apiBase}${args.path}`, dataAll);
      // todo rename to `is_success`
      if (res.data.success === true) {
        state.isSuccess.value = true;
        node.reset();
      } else {
        node.setErrors([strings.error]);
      }
    } catch (error) {
      // todo sentry
      node.setErrors([strings.error]);
    }
  }

  return {
    submit: submit,
    isSuccess: state.isSuccess,
  };
}
