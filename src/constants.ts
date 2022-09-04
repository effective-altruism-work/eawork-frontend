export const msg = {
  error: "An error occurred, our team has been notified. Please try again or contact support at support@eawork.org."
};
export namespace urls {
  export const jobs = {
    post: "/jobs/post",
    view: (pk: number | string) => `/jobs/${pk}/view`,
    edit: (pk: number | string) => `/jobs/${pk}/edit`,
  }
  export const about = "/about";
  export const privacyPolicy = "/privacy-policy";
  export const termsOfServices = "/terms-of-services";
}
