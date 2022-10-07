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

export type Tag = { pk?: number; text: string; count?: number; is_featured?: boolean };

export type TagDjango = { pk?: number; name: string; count?: number; is_featured: boolean };

export type AlgoliaTagFields = { [Property in keyof TagTypeName]: string[] };

export interface JobAlgolia {
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
  company_ea_forum_url: string;
  company_description: string;
  company_is_recommended_org: boolean;

  tags_role_type: string[];
  tags_skill: string[];
  tags_country: string[];
  tags_city: string[];
  tags_workload: string[];
  tags_area: string[];
  tags_exp_required: string[];
  tags_degree_required: string[];
  tags_immigration: string[];
  tags_location_type: string[];
  tags_location_80k: string[];
  tags_generic: string[];
}

export interface Comment {
  pk: number;
  parent: number;
  post: number;
  author: {
    email: string;
    first_name: string;
    last_name: string;
  };
  content: string;
  children: Array<Comment> | null;
  updated_at: string;
  created_at: string;
}
