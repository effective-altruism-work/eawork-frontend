import { xRiskProblemAreas, acrossEAProblemAreas, otherProblemAreas } from "~/constants";

export default function getProblemSubarea(areas: string[]) {
  let arr = [];
  for (let area of areas) {
    let a = "";
    if (xRiskProblemAreas.includes(area as any)) {
      a = "Reducing existential risks";
    } else if (acrossEAProblemAreas.includes(area as any)) {
      a = "Work across areas";
    } else if (otherProblemAreas.includes(area as any)) {
      a = "Other important problems";
    }

    arr.push(a);
  }

  return [...new Set(arr)];
}
