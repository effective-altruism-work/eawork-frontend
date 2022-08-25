export type TagTypeName =
  | "tags_role"
  | "tags_skill"
  | "tags_country"
  | "tags_city"
  | "tags_area"
  | "tags_location_type"
  | "tags_generic";

export type Tag = { pk?: number; text: string; count?: number };
