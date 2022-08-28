export const tagTypes = [
  "tags_role_type",
  "tags_skill",
  "tags_country",
  "tags_city",
  "tags_workload",
  "tags_area",
  "tags_degree_required",
  "tags_immigration",
  "tags_location_type",
  "tags_generic",
] as const;

export type TagTypeName = typeof tagTypes[number];

export type Tag = { pk?: number; text: string; count?: number };

export type AlgoliaTagFields = { [Property in keyof TagTypeName]: string[] };

export interface JobAlgolia extends AlgoliaTagFields {
  objectID: string;
  post_pk: number;
  id_external_80_000_hours: string | "";
  title: string;
  location: string;

  description_for_search: string;
  description_short: string;
  description: string;

  url_external: string;

  created_at: number;
  updated_at: number;
  closes_at: number;
  posted_at: number;

  experience_avg: number | null;
  experience_min: number | null;
  salary_min: number | null;
  salary_max: number | null;

  company_logo_url: string;
  company_name: string;
  company_url: string;
  company_career_page_url: string;
  company_description: string;
}
