import { formatDistance } from "date-fns";

export default function relativePostingTime(timestamp: number) {
  const millisecondDifference = new Date().getTime() - new Date(timestamp * 1000).getTime();
  const isToday = millisecondDifference < 86_400_000; // less than 24 hours
  if (isToday) {
    return "Today";
  }

  let formatted = formatDistance(new Date(timestamp * 1000), new Date(), {
    addSuffix: true,
  });

  formatted = formatted.replace("about ", "");

  // flatten dates from over two months ago
  if (
    (formatted.includes("months ago") && formatted !== "2 months ago") ||
    formatted.includes("year")
  ) {
    formatted = ">2 months ago";
  }

  return formatted;
}
