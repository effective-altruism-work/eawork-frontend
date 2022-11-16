export const msg = {
  error:
    "An error occurred, our team has been notified. Please try again or contact support at support@eawork.org.",
} as const;
export namespace urls {
  export const jobs = {
    post: "/jobs/post",
    view: (pk: number | string) => `/jobs/${pk}/view`,
    edit: (pk: number | string) => `/jobs/${pk}/edit`,
  };
  export const about = "/about";
  export const privacyPolicy = "/privacy-policy";
  export const termsOfServices = "/terms-of-services";
}

export const breakpointsChakra = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  hd: 1280,
  "2xl": 1536,
  "3xl": 1920,
  fullHd: 1920,
};

export const strings = {
  error: msg.error,
  remoteLiteral: "Global",
} as const;

export const xRiskProblemAreas = [
  "AI safety & policy",
  "Biosecurity & pandemic preparedness",
  "Nuclear security",
  "Information security",
  "Forecasting",
  "Other policy-focused",
] as const;

export const acrossEAProblemAreas = [
  "Building effective altruism",
  "Global priorities research",
] as const;

export const otherProblemAreas = [
  "Global health & development",
  "Global health & poverty",
  "Factory farming",
  "Climate change",
  "Other (pressing)",
] as const;

export const allProblemAreas = [
  ...xRiskProblemAreas,
  ...acrossEAProblemAreas,
  ...otherProblemAreas,
] as const;
