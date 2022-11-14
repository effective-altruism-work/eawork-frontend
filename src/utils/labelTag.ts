export default function labelTag(s: string): string {
  switch (s) {
    case "Biosecurity & pandemic preparedness":
      return "Biosecurity & pandemic prep";
    case "International security & cooperation":
      return "International security & coop";
    case "Global":
      return "Remote, Global";
    case "Global health & poverty":
      return "Global health & development";
    case "Software Engineering":
      return "Software engineering";
    case "is_recommended_org":
      return "Top recommended orgs";
    case "Other (pressing)":
      return "Climate change";
    default:
      return s;
  }
}
