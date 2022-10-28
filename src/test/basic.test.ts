import { describe, expect, test } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils-edge";

describe("fake test", async () => {
  await setup({});

  test("my fake test", () => {
    expect(2 + 2).toBe(4);
  });

  test("my fake html test", async () => {
    const html = await $fetch("/");
    console.log(typeof html);
    expect(html.includes("Job")).toBe(true);
  });
});
