const baseUrl = "https://80000hours.org";
const jbSource = "/?int_source=job-board";

export default function urlWrap(strings) {
  return `${baseUrl}${strings[0]}${jbSource}`;
}