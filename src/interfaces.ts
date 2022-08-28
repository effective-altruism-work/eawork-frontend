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
  company_description: string;
  
  tags_area: string[];
  tags_generic: string[];
  tags_degree_required: string[];
  tags_country: string[];
  tags_city: string[];
  tags_role_type: string[];
  tags_skill: string[];
  tags_location_type: string[];
  tags_workload: string[];
  tags_immigration: string[];
}
