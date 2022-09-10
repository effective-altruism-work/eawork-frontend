import { Data } from "dataclass";

export class Node extends Data {
  label: string;
  url?: string;
  categories?: NodeCategory[];
  isMegaNode?: boolean;
}

export class NodeCategory extends Data {
  label: string;
  description?: string;
  url?: string;
  children: Node[] | NodeCategory[];
  extension?: {
    url: string;
    label: string;
  };
}

export const nodes: Node[] = [
  Node.create({
    label: "Start here",
    url: "/start-here/?int_campaign=2021-12--primary-navigation__start-here",
  }),
  Node.create({
    label: "Guides",
    isMegaNode: true,
    categories: [
      NodeCategory.create({
        label: "Key ideas",
        description: "Understand what makes for a high-impact career.",
        url: "/key-ideas/",
        extension: {
          label: "Read the full guide →",
          url: "/key-ideas/",
        },
        children: [
          NodeCategory.create({
            label: "Introduction",
            children: [
              Node.create({
                label: "Your most important decision",
                url: "/make-a-difference-with-your-career/",
              }),
              Node.create({
                label: "Summary",
                url: "/key-ideas/summary/",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Foundations",
            children: [
              Node.create({
                label: "A definition of impact",
                url: "/articles/what-is-social-impact-definition/",
              }),
              Node.create({
                label: "Future generations & their moral significance",
                url: "/articles/future-generations/",
              }),
              Node.create({
                label: "Effective altruism",
                url: "https://80k.local/articles/effective-altruism/",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Global priorities",
            children: [
              Node.create({
                label: "Why problem selection is crucial",
                url: "https://80k.local/articles/your-choice-of-problem-is-crucial/",
              }),
              Node.create({
                label: "The case for reducing existential risks",
                url: "https://80k.local/articles/existential-risks/",
              }),
              Node.create({
                label: "This could be the most important century",
                url: "https://80k.local/articles/the-most-important-century/",
              }),
              Node.create({
                label: "Our current list of pressing problems",
                url: "https://80k.local/problem-profiles/",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Solutions",
            children: [
              Node.create({
                label: "The best solutions are far more effective",
                url: "https://80k.local/articles/solutions/",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Leverage",
            children: [
              Node.create({
                label: "What is leverage, and how to get it?",
                url: "https://80k.local/articles/leverage/",
              }),
              Node.create({
                label: "Our list of high-impact careers",
                url: "https://80k.local/career-reviews/",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Personal fit",
            children: [
              Node.create({
                label: "Fit is more important than you think",
                url: "https://80k.local/articles/personal-fit/",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Strategy",
            children: [
              Node.create({
                label: "What is career capital?",
                url: "https://80k.local/articles/career-capital",
              }),
              Node.create({
                label: "What is career capital?",
                url: "https://80k.local/articles/career-capital",
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Problem profiles",
        description: "Find out about the world's biggest and most neglected problems.",
        url: "/problem-profiles/",
        extension: {
          label: "Go to problems hub →",
          url: "https://80k.local/problem-profiles/",
        },
        children: [
          NodeCategory.create({
            label: "Top areas to work on",
            children: [
              Node.create({
                label: "Preventing an AI-related catastrophe",
                url: "https://80k.local/problem-profiles/artificial-intelligence/",
              }),
              Node.create({
                label: "Global priorities research",
                url: "https://80k.local/problem-profiles/global-priorities-research/",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Other promising areas",
            children: [
              Node.create({
                label: "Mitigating great power conflict",
                url: "https://80k.local/problem-profiles/#reducing-great-power-conflict",
              }),
              Node.create({
                label: "Global governance",
                url: "https://80k.local/problem-profiles/#improve-global-governance",
              }),
              Node.create({
                label: "Space governance",
                url: "https://80k.local/problem-profiles/space-governance",
              }),
              Node.create({
                label: "See all →",
                url: "https://80k.local/problem-profiles/#potentially_promising",
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  Node.create({
    label: "Job board",
    url: "https://jobs.80000hours.org",
  }),
  Node.create({
    label: "Podcast",
    categories: [
      NodeCategory.create({
        label: "Our podcasts",
        children: [
          Node.create({
            label: "The 80,000 Hours Podcast",
            url: "/podcast/",
          }),
          Node.create({
            label: "80k After Hours",
            url: "/after-hours-podcast/",
          }),
        ],
      }),
      NodeCategory.create({
        label: "Curated series",
        children: [
          Node.create({
            label: "Effective Altruism: An Introduction",
            url: "/podcast/effective-altruism-an-introduction/",
          }),
          Node.create({
            label: "Effective Altruism: Ten Global Problems",
            url: "/podcast/effective-altruism-ten-global-problems//",
          }),
        ],
      }),
    ],
  }),
  Node.create({
    label: "Get 1-1 advice",
    url: "/speak-with-us/?int_campaign=2021-08__primary-navigation",
  }),
  Node.create({
    label: "Book giveaway",
    url: "/book-giveaway/",
  }),
];
