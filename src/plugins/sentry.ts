import { defineNuxtPlugin } from "#app";
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";

/**
 * copy of https://github.com/nuxt-community/sentry-module/issues/358#issuecomment-1016983543
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.$config.public.env !== "dev") {
    Sentry.init({
      app: [nuxtApp.vueApp],
      dsn: "https://dd139303defc491b9710df6eac619379@o1376636.ingest.sentry.io/6685828",
      tracesSampleRate: 1.0,
      environment: nuxtApp.$config.public.env ?? "prod",
    });

    nuxtApp.vueApp.mixin(
      Sentry.createTracingMixins({
        trackComponents: true,
        timeout: 2000,
        hooks: ["activate", "mount", "update"],
      }),
    );
    Sentry.attachErrorHandler(nuxtApp.vueApp, {
      logErrors: false,
      attachProps: true,
      trackComponents: true,
      timeout: 2000,
      hooks: ["activate", "mount", "update"],
    });
  }
});
