import { Data } from "dataclass";

export class Node extends Data {
  label: string;

  url?: string;

  categories?: NodeCategory[];

  isMegaNode?: boolean;

  isSecondary?: boolean;
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

const baseUrl = "https://80000hours.org";

export const nodes: Node[] = [
  Node.create({
    label: "Start here",
    url: `${baseUrl}/start-here/?int_campaign=2021-12--primary-navigation__start-here`,
  }),
  Node.create({
    label: "Guides",
    isMegaNode: true,
    categories: [
      NodeCategory.create({
        label: "Key ideas",
        description: "Understand what makes for a high-impact career.",
        url: `${baseUrl}/key-ideas/`,
        extension: {
          label: "Read the full guide →",
          url: `${baseUrl}/key-ideas/`,
        },
        children: [
          NodeCategory.create({
            label: "Introduction",
            children: [
              Node.create({
                label: "Your most important decision",
                url: `${baseUrl}/make-a-difference-with-your-career/`,
              }),
              Node.create({
                label: "Summary",
                url: `${baseUrl}/key-ideas/summary/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Foundations",
            children: [
              Node.create({
                label: "A definition of impact",
                url: `${baseUrl}/articles/what-is-social-impact-definition/`,
              }),
              Node.create({
                label: "Future generations & their moral significance",
                url: `${baseUrl}/articles/future-generations/`,
              }),
              Node.create({
                label: "Effective altruism",
                url: `${baseUrl}/articles/effective-altruism/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Global priorities",
            children: [
              Node.create({
                label: "Why problem selection is crucial",
                url: `${baseUrl}/articles/your-choice-of-problem-is-crucial/`,
              }),
              Node.create({
                label: "The case for reducing existential risks",
                url: `${baseUrl}/articles/existential-risks/`,
              }),
              Node.create({
                label: "This could be the most important century",
                url: `${baseUrl}/articles/the-most-important-century/`,
              }),
              Node.create({
                label: "Our current list of pressing problems",
                url: `${baseUrl}/problem-profiles/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Solutions",
            children: [
              Node.create({
                label: "The best solutions are far more effective",
                url: `${baseUrl}/articles/solutions/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Leverage",
            children: [
              Node.create({
                label: "What is leverage, and how to get it?",
                url: `${baseUrl}/articles/leverage/`,
              }),
              Node.create({
                label: "Our list of high-impact careers",
                url: `${baseUrl}/career-reviews/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Personal fit",
            children: [
              Node.create({
                label: "Fit is more important than you think",
                url: `${baseUrl}/articles/personal-fit/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Strategy",
            children: [
              Node.create({
                label: "What is career capital?",
                url: `${baseUrl}/articles/career-capital`,
              }),
              Node.create({
                label: "How much to explore?",
                url: `${baseUrl}/articles/exploration-value/`,
              }),
              Node.create({
                label: "Coordination and impact",
                url: `${baseUrl}/articles/coordination/`,
              }),
              Node.create({
                label: "Balancing impact and doing what you love",
                url: `${baseUrl}/articles/impact-versus-happiness/`,
              }),
              Node.create({
                label: "Aim higher: a rational case for dreaming&nbsp;big",
                url: `${baseUrl}/articles/aim-higher/`,
              }),
              Node.create({
                label: "Three career stages",
                url: `${baseUrl}/articles/key-career-stages/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Conclusion",
            children: [
              Node.create({
                label: "How much do careers differ in impact?",
                url: `${baseUrl}/articles/careers-differ-in-impact/`,
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Problem profiles",
        description: "Find out about the world's biggest and most neglected problems.",
        url: `${baseUrl}/problem-profiles/`,
        extension: {
          label: "Go to problems hub →",
          url: `${baseUrl}/problem-profiles/`,
        },
        children: [
          NodeCategory.create({
            label: "Top areas to work on",
            children: [
              Node.create({
                label: "Preventing an AI-related catastrophe",
                url: `${baseUrl}/problem-profiles/artificial-intelligence/`,
              }),
              Node.create({
                label: "Global priorities research",
                url: `${baseUrl}/problem-profiles/global-priorities-research/`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Other promising areas",
            children: [
              Node.create({
                label: "Mitigating great power conflict",
                url: `${baseUrl}/problem-profiles/#reducing-great-power-conflict`,
              }),
              Node.create({
                label: "Global governance",
                url: `${baseUrl}/problem-profiles/#improve-global-governance`,
              }),
              Node.create({
                label: "Space governance",
                url: `${baseUrl}/problem-profiles/space-governance`,
              }),
              Node.create({
                label: "See more →",
                url: `${baseUrl}/problem-profiles/#potentially_promising`,
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Career reviews",
        description: "Learn about high-impact career paths.",
        url: `${baseUrl}/career-reviews/`,
        extension: {
          label: "See all our career reviews →",
          url: `${baseUrl}/career-reviews/`,
        },
        children: [
          NodeCategory.create({
            label: "Key categories of impactful careers",
            children: [
              Node.create({
                url: `${baseUrl}/articles/government-policy/`,
                label: "Government and policy",
              }),
              Node.create({
                url: `${baseUrl}/articles/organisation-building/`,
                label: "Organisation-building at effective nonprofits",
              }),
              Node.create({
                url: `${baseUrl}/articles/research-careers/`,
                label: "Research",
              }),
              Node.create({
                url: `${baseUrl}/articles/applying-an-unusual-skill-to-a-needed-niche/`,
                label: "Applying an unusual strength to a needed niche",
              }),
              Node.create({
                url: `${baseUrl}/articles/communication/`,
                label: "Communication",
              }),
              Node.create({
                url: `${baseUrl}/articles/earning-to-give/`,
                label: "Earning to give",
              }),
            ],
          }),
          NodeCategory.create({
            label: "List of top-recommended career paths",
            children: [
              Node.create({
                url: `${baseUrl}/career-reviews/ai-safety-researcher/`,
                label: "AI safety technical research",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/ai-policy-and-strategy/`,
                label: "Long-term AI policy",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/founder-impactful-organisations/`,
                label: "Founder of new projects",
              }),
              Node.create({
                url: `${baseUrl}https://80000hours.org/career-reviews/work-in-effective-altruism-organisations/`,
                label: "Helping build the effective altruism community",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/grantmaker/`,
                label: "Grantmaker",
              }),
              Node.create({
                url: `${baseUrl}https://80000hours.org/articles/operations-management/`,
                label: "Operations management in high-impact organisations",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/global-priorities-researcher/`,
                label: "Research into global priorities",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/biorisk-research/`,
                label: "Biorisk research, strategy, and policy",
              }),
              Node.create({
                url: `${baseUrl}https://80000hours.org/career-reviews/china-related-ai-safety-and-governance-paths/`,
                label: "China-related AI safety and governance",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/forecasting/`,
                label: "Forecasting research and implementation",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Sometimes-recommended paths",
            children: [
              Node.create({
                url: `${baseUrl}/career-reviews/#high-impact-but-especially-competitive`,
                label: "High-impact but especially competitive",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/#potentially-high-impact-but-still-under-researched`,
                label: "Promising but under-researched",
              }),
              Node.create({
                url: `${baseUrl}/career-reviews/#other-impactful-options-if-youre-an-especially-good-fit`,
                label: "Impactful if you're an especially good fit",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Recommended career capital",
            children: [
              Node.create({
                url: `${baseUrl}/career-reviews/#steps-to-build-career-capital-and-increase-your-future-impact`,
                label: "Steps to build your skills and network",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Making the most of your current job",
            children: [
              Node.create({
                url: `${baseUrl}/career-guide/making-a-difference/`,
                label: "Doing good in any career",
              }),
              Node.create({
                url: `${baseUrl}/career-guide/how-to-be-successful/`,
                label: "How to invest in yourself",
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Planning & decision making",
        description: "Use our tools to make concrete plans.",
        url: `${baseUrl}/career-planning/`,
        extension: {
          label: "See all planning resources →",
          url: `${baseUrl}/career-planning/`,
        },
        children: [
          NodeCategory.create({
            label: "Create a high-impact career plan",
            children: [
              Node.create({
                url: `${baseUrl}/career-planning/process/`,
                label: "8-week career planning course",
              }),
              Node.create({
                url: `${baseUrl}/career-planning/summary/`,
                label: "Summary",
              }),
              Node.create({
                url: `${baseUrl}/career-planning/career-plan-template/`,
                label: "Career plan template",
              }),
              Node.create({
                url: `${baseUrl}/career-planning/annual-career-review/`,
                label: "Annual career check-up",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Make good career decisions",
            children: [
              Node.create({
                url: `${baseUrl}/career-decision/article/`,
                label: "Make an immediate decision",
              }),
              Node.create({
                url: `${baseUrl}/career-planning/#learn-more-about-career-decision-making`,
                label: "Improve your decision-making skills",
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Browse all our content",
        description: "Pick a topic to explore or check out our most popular pieces.",
        url: `${baseUrl}/topics/`,
        children: [
          NodeCategory.create({
            label: "Selected topics",
            extension: { label: "See all topics →", url: `${baseUrl}/topics/` },
            children: [
              Node.create({
                url: `${baseUrl}/topic/big-picture/moral-philosophy/`,
                label: "Moral philosophy ",
              }),
              Node.create({
                url: `${baseUrl}/topic/planning/career-capital/skills/`,
                label: "Skills ",
              }),
              Node.create({
                url: `${baseUrl}/topic/planning/personal-fit/job-satisfaction/`,
                label: "Job satisfaction ",
              }),
              Node.create({
                url: `${baseUrl}/topic/other/anonymous-advice/`,
                label: "Anonymous advice ",
              }),
              Node.create({
                url: `${baseUrl}/topic/other/unconventional-advice/`,
                label: "Unconventional advice ",
              }),
              Node.create({
                url: `${baseUrl}/topic/other/what-to-study/`,
                label: "What to study ",
              }),
              Node.create({
                url: `${baseUrl}/topic/strategies/advocacy-strategies/`,
                label: "Advocacy ",
              }),
              Node.create({
                url: `${baseUrl}/topic/causes/catastrophic-risks/`,
                label: "Catastrophic risks ",
              }),
              Node.create({
                url: `${baseUrl}/topic/causes/meta-causes/`,
                label: "Meta-causes ",
              }),
              Node.create({
                url: `${baseUrl}/topic/priority-paths/`,
                label: "Priority paths ",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Top articles from outside our guides",
            extension: {
              label: "All articles →",
              url: `${baseUrl}/research/#list-of-everything`,
            },

            children: [
              Node.create({
                url: `${baseUrl}/career-guide/job-satisfaction/`,
                label: "What makes for a dream job? ",
              }),
              Node.create({
                url: `${baseUrl}/articles/best-charity/`,
                label: "Best charities to donate to ",
              }),
              Node.create({
                url: `${baseUrl}/2020/08/misconceptions-effective-altruism/`,
                label: "Misconceptions about effective altruism ",
              }),
              Node.create({
                url: `${baseUrl}/articles/research-questions-by-discipline/`,
                label: "High-impact research questions ",
              }),
              Node.create({
                url: `${baseUrl}/2015/07/what-are-your-odds-of-getting-into-congress-if-you-try/`,
                label: "What are your chances of getting elected to Congress, if you try? ",
              }),
              Node.create({
                url: `${baseUrl}/2012/08/how-many-lives-does-a-doctor-save/`,
                label: "How many lives does a doctor save? ",
              }),
              Node.create({
                url: `${baseUrl}/articles/is-voting-important/`,
                label: "What's the impact of voting? ",
              }),
              Node.create({
                url: `${baseUrl}/articles/advice-for-undergraduates/`,
                label: "Advice for undergraduates ",
              }),
            ],
          }),
          NodeCategory.create({
            label: "2017 career guide",
            children: [
              Node.create({
                url: "https://80000hours.org/career-guide/",
                label: "All career guide pages →",
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
            url: `${baseUrl}/podcast/`,
          }),
          Node.create({
            label: "80k After Hours",
            url: `${baseUrl}/after-hours-podcast/`,
          }),
        ],
      }),
      NodeCategory.create({
        label: "Curated series",
        children: [
          Node.create({
            label: "Effective Altruism: An Introduction",
            url: `${baseUrl}/podcast/effective-altruism-an-introduction/`,
          }),
          Node.create({
            label: "Effective Altruism: Ten Global Problems",
            url: `${baseUrl}/podcast/effective-altruism-ten-global-problems//`,
          }),
        ],
      }),
    ],
  }),
  Node.create({
    label: "Get 1-1 advice",
    url: `${baseUrl}/speak-with-us/?int_campaign=2021-08__primary-navigation`,
  }),
  Node.create({
    label: "Book giveaway",
    url: `${baseUrl}/book-giveaway/`,
  }),
];

export const nodesSecondary: Node[] = [
  Node.create({
    isSecondary: true,
    label: "New releases",
    url: `${baseUrl}/latest/`,
  }),
  Node.create({
    isSecondary: true,
    label: "All articles",
    url: `${baseUrl}/all-articles/`,
  }),
  Node.create({
    isSecondary: true,
    label: "Community",
    url: `${baseUrl}/community/`,
  }),
  Node.create({
    isSecondary: true,
    label: "About",
    url: `${baseUrl}/about/`,
    categories: [
      NodeCategory.create({
        label: "About us",
        children: [
          Node.create({
            label: "Introduction",
            url: `${baseUrl}/about/`,
          }),
          Node.create({
            label: "Meet the team",
            url: `${baseUrl}/about/meet-the-team/`,
          }),
          Node.create({
            label: "Our donors",
            url: `${baseUrl}/about/donors/`,
          }),
          Node.create({
            label: "Media coverage",
            url: `${baseUrl}/about/media-coverage/`,
          }),
          Node.create({
            label: "Contact us",
            url: `${baseUrl}/about/contact-us/`,
          }),
        ],
      }),
      NodeCategory.create({
        label: "Support us",
        children: [
          Node.create({
            label: "Take our survey",
            url: `${baseUrl}/user-survey/`,
          }),
          Node.create({
            label: "Donate",
            url: `${baseUrl}/support-us/donate/`,
          }),
          Node.create({
            label: "Stay updated",
            url: `${baseUrl}/about/stay-updated/`,
          }),
          Node.create({
            label: "Acknowledgements",
            url: `${baseUrl}/support-us/acknowledgements/`,
          }),
          Node.create({
            label: "Work with us",
            url: `${baseUrl}/about/work-with-us/`,
          }),
        ],
      }),
      NodeCategory.create({
        label: "Our impact & credibility",
        children: [
          Node.create({
            label: "Evaluations",
            url: `${baseUrl}/about/credibility/evaluations/`,
          }),
          Node.create({
            label: "Our mistakes",
            url: `${baseUrl}/about/credibility/evaluations/mistakes/`,
          }),
          Node.create({
            label: "Research principles",
            url: `${baseUrl}/about/credibility/research-principles/`,
          }),
          Node.create({
            label: "Endorsements",
            url: `${baseUrl}/about/credibility/endorsements/`,
          }),
          Node.create({
            label: "Testimonials",
            url: `${baseUrl}/about/impact/testimonials/`,
          }),
        ],
      }),
    ],
  }),
];

export const nodesAll = nodes.concat(nodesSecondary);
