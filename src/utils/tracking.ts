import { Analytics, AnalyticsBrowser, Context } from "@segment/analytics-next";
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

  export async function sendEvent(job: JobAlgolia, action: Action) {
    await waitForInit();

    const eventProps = get80kJobProps(job, action);
    await analytics.track(eventProps.action, eventProps);
  }
  
  interface BindArgs {
    selector: string;
    action: Action;
    defaults?: {
      category?: "Job board";
      label?: string;
    };
    job: JobAlgolia;
  }

  export async function bindAnchorsTracking(args: BindArgs) {
    await waitForInit();
    const anchors: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(args.selector);
    for (const anchor of anchors) {
      anchor.addEventListener("click", async (event) => {
        event.preventDefault();
        setTimeout(() => window.location.href = anchor.href, clickTimeout);
        await sendAnchorClick(anchor, args);
      });
      anchor.addEventListener("auxclick", async () => {
        await sendAnchorClick(anchor, args);
      });
    }
  }

  async function sendAnchorClick(anchor: HTMLAnchorElement, bindArgs: BindArgs) {
    await waitForInit();
    const eightyProps = get80kJobProps(bindArgs.job, bindArgs.action);
    await analytics.track(
      eightyProps.action,
      {
        ...eightyProps,
        category: anchor.getAttribute(`${prefix}-category`) ?? bindArgs.defaults.category ?? "Job board",
        label: anchor.getAttribute(`${prefix}-label`) ?? bindArgs.defaults.label ?? anchor.href,
        objectId: anchor.getAttribute(`${prefix}-object-id`),
        userFacingLabel: anchor.innerText,
        objectType: "link",
      }
    );
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
      location: [...job.tags_country, ...job.tags_city].join(separator),
      locationList: [...job.tags_country, ...job.tags_city],
      experienceRequirement: job.tags_exp_required[0],
      degreeRequirement: job.tags_degree_required[0],
      nonInteraction: false,
    }
    switch (action) {
      case "viewed":
        return {
          action: "Viewed vacancy description",
          ...props,
        }
      case "url_external clicked":
        return {
          action: "Viewed vacancy details",
          label: job.url_external,
          ...props,
        }
      case "company_url clicked":
        return {
          action: "Viewed organisation homepage",
          label: job.company_url,
          ...props,
        }
      case "company_career_page_url clicked":
        return {
          action: "Viewed organisation vacancies page",
          label: job.company_career_page_url,
          ...props,
        }
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
    "viewed" |
    "url_external clicked" |
    "company_career_page_url clicked" |
    "company_url clicked";

  type Action80k =
    "Viewed vacancy details" |
    "Viewed vacancy description" |
    "Viewed organisation homepage" |
    "Viewed organisation vacancies page" | 
    "Searched job board" | 
    "Results found" | 
    "No results found" | 
    "Signed up for email alerts" | 
    "Errors" | 
    "Warning";
  
  type CompanyExternalURL = string;
  type JobExternalURL = string;
}
