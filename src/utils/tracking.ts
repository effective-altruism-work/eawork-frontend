import { Analytics, AnalyticsBrowser, Context } from "@segment/analytics-next";
// import { captureEvent } from "@sentry/vue";
import { JobAlgolia } from "~/utils/types";
import * as Sentry from "@sentry/vue";
import getProblemSubarea from "./getProblemSubarea";
const { captureEvent } = Sentry;

const eightyKProps = {
  category: "Job Board",
} as const;

export namespace tracking {
  const separator = " / ";
  let analytics: Analytics | null = null;
  let context: Context | null = null;
  const prefix = "data-80k-event";
  const clickTimeout = 300;

  async function waitForInit() {
    while (true) {
      if (analytics) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  function get80KAction(action: Action): Action80k {
    switch (action) {
      case "viewed":
        return "Viewed vacancy description";
      case "url_external clicked":
        return "Viewed vacancy details";
      case "company_url clicked":
        return "Viewed organisation homepage";
      case "company_career_page_url clicked":
        return "Viewed organisation vacancies page";
      case "company_ea_forum_url clicked":
        return "Viewed organisation ea forum page";
      case "alert sign up":
        return "Signed up for email alerts";
      case "Stayed on page":
        return "Stayed on page";
      default:
        return action;
    }
  }

  export async function init(writeKey: string) {
    [analytics, context] = await AnalyticsBrowser.load({ writeKey });
  }

  export async function sendJobEvent(
    job: JobAlgolia,
    action: Action,
    // featuredList: string[],
  ) {
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
      default:
        break;
    }

    await analytics.track(eventProps.action, {
      ...eventProps,
      ...propsExtra,
    });
  }

  export async function sendEvent(action: Action, data: { [key: string]: any }) {
    try {
      await waitForInit();
      const action80k = get80KAction(action);
      analytics.track(action80k, { ...data, ...eightyKProps });
    } catch (err) {
      captureEvent(err);
    }
  }

  export async function page(name: string, data: { [key: string]: any }) {
    analytics.page("Job Board", name, { data, ...eightyKProps });
  }

  export function get80kLocations(tags_city: string[] = [], tags_country: string[] = []) {
    return {
      locationList: [...tags_country, ...tags_city],
      location: [...tags_country, ...tags_city].join(separator),
    };
  }

  // function problemAreaIsRecommended(areas: string[], featuredList: string[]) {
  //   let recommended = false;

  //   const featuredLowercase = featuredList.map((s) => s.toLowerCase());
  //   for (const area of areas) {
  //     // if any of the role's areas are recommended, the role is recommended.
  //     if (featuredLowercase.includes(area.toLowerCase())) {
  //       recommended = true;
  //     }
  //   }
  //   return recommended;
  // }

  function get80kJobProps(
    job: JobAlgolia,
    action: Action,
    // featuredList: string[],
  ): JobEvent80k {
    const props = {
      ...eightyKProps,
      label: job.url_external,
      organization: job.company_name,
      title: job.title,
      tier: "", // todo add to algolia
      problemArea: job.tags_area,
      problemSubarea: getProblemSubarea(job.tags_area),
      // problemAreaIsRecommended: problemAreaIsRecommended(job.tags_area, featuredList),
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
      case "Stayed on page":
        return {
          action: get80KAction(action),
          label: "Stayed on page",
          ...props,
        };
      case "company_ea_forum_url clicked":
        return {
          action: get80KAction(action),
          label: "Viewed organisation ea forum page",
          ...props,
        };
      case "alert sign up":
        return {
          action: get80KAction(action),
          label: "Signed up for email alerts",
          ...props,
        };
      default:
        return {
          action,
          label: props.label,
          ...props,
        };
    }
  }

  interface JobEvent80k {
    action: Action80k;
    category: "Engagement" | "Job Board";
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
    | "company_ea_forum_url clicked"
    | "company_url clicked"
    | "alert sign up"
    | "Stayed on page";

  type Action80k =
    | "Viewed vacancy details"
    | "Viewed vacancy description"
    | "Viewed organisation homepage"
    | "Viewed organisation vacancies page"
    | "Viewed organisation ea forum page"
    | "Searched job board"
    | "Results found"
    | "No results found"
    | "Signed up for email alerts"
    | "Errors"
    | "Stayed on page"
    | "Warning";

  type CompanyExternalURL = string;
  type JobExternalURL = string;
}
