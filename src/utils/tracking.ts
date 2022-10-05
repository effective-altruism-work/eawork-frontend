import { Analytics, AnalyticsBrowser, Context } from "@segment/analytics-next";
import { captureEvent } from "@sentry/vue";
import { JobAlgolia } from "~/utils/types";

export namespace tracking {
  const separator = " / ";
  let analytics: Analytics | null = null;
  let context: Context | null = null;
  const prefix = "data-80k-event";
  const clickTimeout = 300;

  export async function init(writeKey: string) {
    [analytics, context] = await AnalyticsBrowser.load({ writeKey });
  }

  export async function sendJobEvent(job: JobAlgolia, action: Action) {
    await waitForInit();

    const eventProps = get80kJobProps(job, action);

    let propsExtra = {};
    switch (action) {
      case "company_url clicked": {
        propsExtra = { label: job.company_url };
        break;
      }
      case "url_external clicked": {
        propsExtra = { label: job.url_external };
        break;
      }
    }
    await analytics.track(eventProps.action, { ...eventProps, ...propsExtra });
  }

  export async function sendEvent(action: Action, data: any) {
    try {
      await waitForInit();
      const action80k = get80KAction(action);
      await analytics.track(action80k, data);
    } catch (err) {
      captureEvent(err);
    }
  }

  async function waitForInit() {
    while (true) {
      if (analytics) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  function get80kJobProps(job: JobAlgolia, action: Action): JobEvent80k {
    let props = {
      category: "Job board",
      label: job.url_external,
      organization: job.company_name,
      title: job.title,
      tier: "", // todo add to algolia
      problemArea: job.tags_area,
      roleType: job.tags_role_type,
      ...get80kLocations(job.tags_city, job.tags_country),
      experienceRequirement: job.tags_exp_required[0],
      degreeRequirement: job.tags_degree_required[0],
      nonInteraction: false,
    };
    switch (action) {
      case "viewed":
        return {
          action: get80KAction(action),
          ...props,
        };
      case "url_external clicked":
        return {
          action: get80KAction(action),
          label: job.url_external,
          ...props,
        };
      case "company_url clicked":
        return {
          action: get80KAction(action),
          label: job.company_url,
          ...props,
        };
      case "company_career_page_url clicked":
        return {
          action: get80KAction(action),
          label: job.company_career_page_url,
          ...props,
        };
    }
  }

  export function get80kLocations(tags_city: string[] = [], tags_country: string[] = []) {
    return {
      locationList: [...tags_country, ...tags_city],
      location: [...tags_country, ...tags_city].join(separator),
    };
  }

  function get80KAction(action: Action) {
    switch (action) {
      case "viewed":
        return "Viewed vacancy description";
      case "url_external clicked":
        return "Viewed vacancy details";
      case "company_url clicked":
        return "Viewed organisation homepage";
      case "company_career_page_url clicked":
        return "Viewed organisation vacancies page";
      case "alert sign up":
        return "Signed up for email alerts";
    }
  }

  interface JobEvent80k {
    action: Action80k;
    category: string | "Job board" | null;
    degreeRequirement: string | "Master's degree";
    experienceRequirement: string | "5+ years of experience";
    label: JobExternalURL | CompanyExternalURL;
    location: string;
    locationList: string[];
    nonInteraction: boolean;
    organization: string;
    problemArea: string[];
    roleType: string[];
    tier: string | "1";
    title: string;
  }

  type Action =
    | "viewed"
    | "url_external clicked"
    | "company_career_page_url clicked"
    | "company_url clicked"
    | "alert sign up";

  type Action80k =
    | "Viewed vacancy details"
    | "Viewed vacancy description"
    | "Viewed organisation homepage"
    | "Viewed organisation vacancies page"
    | "Searched job board"
    | "Results found"
    | "No results found"
    | "Signed up for email alerts"
    | "Errors"
    | "Warning";

  type CompanyExternalURL = string;
  type JobExternalURL = string;
}
