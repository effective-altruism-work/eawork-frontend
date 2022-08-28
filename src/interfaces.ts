export interface JobAlgolia {
  objectID: string;
  title: string;
  location: string;
  description: string;
  url_external: string;
  tags_city: string[];

  created_at: number;

  company_logo_url: string;
  company_name: string;
  company_url: string;
}
