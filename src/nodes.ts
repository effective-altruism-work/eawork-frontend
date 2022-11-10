import { Data } from "dataclass";
import urlWrap from "./utils/urlWrap";

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



export const nodes: Node[] = [
  Node.create({
    label: "Start here",
    url: urlWrap`/start-here/?int_campaign=2021-12--primary-navigation__start-here`,
  }),
  Node.create({
    label: "Guides",
    isMegaNode: true,
    categories: [
      NodeCategory.create({
        label: "Key ideas",
        description: "Understand what makes for a high-impact career.",
        url: urlWrap`/key-ideas`,
        extension: {
          label: "Read the full guide →",
          url: urlWrap`/key-ideas`,
        },
        children: [
          NodeCategory.create({
            label: "Introduction",
            children: [
              Node.create({
                label: "Your most important decision",
                url: urlWrap`/make-a-difference-with-your-career`,
              }),
              Node.create({
                label: "Summary",
                url: urlWrap`/key-ideas/summary`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Foundations",
            children: [
              Node.create({
                label: "A definition of impact",
                url: urlWrap`/articles/what-is-social-impact-definition`,
              }),
              Node.create({
                label: "Future generations & their moral significance",
                url: urlWrap`/articles/future-generations`,
              }),
              Node.create({
                label: "Effective altruism",
                url: urlWrap`/articles/effective-altruism`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Global priorities",
            children: [
              Node.create({
                label: "Why problem selection is crucial",
                url: urlWrap`/articles/your-choice-of-problem-is-crucial`,
              }),
              Node.create({
                label: "The case for reducing existential risks",
                url: urlWrap`/articles/existential-risks`,
              }),
              Node.create({
                label: "This could be the most important century",
                url: urlWrap`/articles/the-most-important-century`,
              }),
              Node.create({
                label: "Our current list of pressing problems",
                url: urlWrap`/problem-profiles`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Solutions",
            children: [
              Node.create({
                label: "The best solutions are far more effective",
                url: urlWrap`/articles/solutions`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Leverage",
            children: [
              Node.create({
                label: "What is leverage, and how to get it?",
                url: urlWrap`/articles/leverage`,
              }),
              Node.create({
                label: "Our list of high-impact careers",
                url: urlWrap`/career-reviews`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Personal fit",
            children: [
              Node.create({
                label: "Fit is more important than you think",
                url: urlWrap`/articles/personal-fit`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Strategy",
            children: [
              Node.create({
                label: "What is career capital?",
                url: urlWrap`/articles/career-capital`,
              }),
              Node.create({
                label: "How much to explore?",
                url: urlWrap`/articles/exploration-value`,
              }),
              Node.create({
                label: "Coordination and impact",
                url: urlWrap`/articles/coordination`,
              }),
              Node.create({
                label: "Balancing impact and doing what you love",
                url: urlWrap`/articles/impact-versus-happiness`,
              }),
              Node.create({
                label: "Aim higher: a rational case for dreaming&nbsp;big",
                url: urlWrap`/articles/aim-higher`,
              }),
              Node.create({
                label: "Three career stages",
                url: urlWrap`/articles/key-career-stages`,
              }),
            ],
          }),
          NodeCategory.create({
            label: "Conclusion",
            children: [
              Node.create({
                label: "How much do careers differ in impact?",
                url: urlWrap`/articles/careers-differ-in-impact`,
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Problem profiles",
        description: "Find out about the world's biggest and most neglected problems.",
        url: urlWrap`/problem-profiles`,
        extension: {
          label: "Go to problems hub →",
          url: urlWrap`/problem-profiles`,
        },
        children: [
          NodeCategory.create({
            label: "Top areas to work on",
            children: [
              Node.create({
                url: urlWrap`/problem-profiles/artificial-intelligence`,
                label: "Preventing an AI-related catastrophe",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/preventing-catastrophic-pandemics`,
                label: "Catastrophic pandemics",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/promoting-effective-altruism`,
                label: "Building effective altruism",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/global-priorities-research`,
                label: "Global priorities research",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/nuclear-security`,
                label: "Nuclear war",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/improving-institutional-decision-making`,
                label: "Epistemics and institutional decision making",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/climate-change`,
                label: "Climate change",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/great-power-conflict`,
                label: "Great power conflict",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Other promising areas",
            children: [
              Node.create({
                url: urlWrap`/problem-profiles/promoting-positive-values`,
                label: "Promoting positive values",
              }),
              Node.create({
                url: urlWrap`/problem-profiles/space-governance`,
                label: "Space governance",
              }),
              Node.create({
                label: "See more →",
                url: urlWrap`/problem-profiles/#potentially_promising`,
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Career reviews",
        description: "Learn about high-impact career paths.",
        url: urlWrap`/career-reviews`,
        extension: {
          label: "See all our career reviews →",
          url: urlWrap`/career-reviews`,
        },
        children: [
          NodeCategory.create({
            label: "Key categories of impactful careers",
            children: [
              Node.create({
                url: urlWrap`/articles/government-policy`,
                label: "Government and policy",
              }),
              Node.create({
                url: urlWrap`/articles/organisation-building`,
                label: "Organisation-building at effective nonprofits",
              }),
              Node.create({
                url: urlWrap`/articles/research-careers`,
                label: "Research",
              }),
              Node.create({
                url: urlWrap`/articles/applying-an-unusual-skill-to-a-needed-niche`,
                label: "Applying an unusual strength to a needed niche",
              }),
              Node.create({
                url: urlWrap`/articles/communication`,
                label: "Communication",
              }),
              Node.create({
                url: urlWrap`/articles/earning-to-give`,
                label: "Earning to give",
              }),
            ],
          }),
          NodeCategory.create({
            label: "List of top-recommended career paths",
            children: [
              Node.create({
                url: urlWrap`/career-reviews/ai-safety-researcher`,
                label: "AI safety technical research",
              }),
              Node.create({
                url: urlWrap`/career-reviews/ai-policy-and-strategy`,
                label: "Long-term AI policy",
              }),
              Node.create({
                url: urlWrap`/career-reviews/founder-impactful-organisations`,
                label: "Founder of new projects",
              }),
              Node.create({
                url: urlWrap`https://80000hours.org/career-reviews/work-in-effective-altruism-organisations`,
                label: "Helping build the effective altruism community",
              }),
              Node.create({
                url: urlWrap`/career-reviews/grantmaker`,
                label: "Grantmaker",
              }),
              Node.create({
                url: urlWrap`https://80000hours.org/articles/operations-management`,
                label: "Operations management in high-impact organisations",
              }),
              Node.create({
                url: urlWrap`/career-reviews/global-priorities-researcher`,
                label: "Research into global priorities",
              }),
              Node.create({
                url: urlWrap`/career-reviews/biorisk-research`,
                label: "Biorisk research, strategy, and policy",
              }),
              Node.create({
                url: urlWrap`https://80000hours.org/career-reviews/china-related-ai-safety-and-governance-paths`,
                label: "China-related AI safety and governance",
              }),
              Node.create({
                url: urlWrap`/career-reviews/forecasting`,
                label: "Forecasting research and implementation",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Sometimes-recommended paths",
            children: [
              Node.create({
                url: urlWrap`/career-reviews/#high-impact-but-especially-competitive`,
                label: "High-impact but especially competitive",
              }),
              Node.create({
                url: urlWrap`/career-reviews/#potentially-high-impact-but-still-under-researched`,
                label: "Promising but under-researched",
              }),
              Node.create({
                url: urlWrap`/career-reviews/#other-impactful-options-if-youre-an-especially-good-fit`,
                label: "Impactful if you're an especially good fit",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Recommended career capital",
            children: [
              Node.create({
                url: urlWrap`/career-reviews/#steps-to-build-career-capital-and-increase-your-future-impact`,
                label: "Steps to build your skills and network",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Making the most of your current job",
            children: [
              Node.create({
                url: urlWrap`/career-guide/making-a-difference`,
                label: "Doing good in any career",
              }),
              Node.create({
                url: urlWrap`/career-guide/how-to-be-successful`,
                label: "How to invest in yourself",
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Planning & decision making",
        description: "Use our tools to make concrete plans.",
        url: urlWrap`/career-planning`,
        extension: {
          label: "See all planning resources →",
          url: urlWrap`/career-planning`,
        },
        children: [
          NodeCategory.create({
            label: "Create a high-impact career plan",
            children: [
              Node.create({
                url: urlWrap`/career-planning/process`,
                label: "8-week career planning course",
              }),
              Node.create({
                url: urlWrap`/career-planning/summary`,
                label: "Summary",
              }),
              Node.create({
                url: urlWrap`/career-planning/career-plan-template`,
                label: "Career plan template",
              }),
              Node.create({
                url: urlWrap`/career-planning/annual-career-review`,
                label: "Annual career check-up",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Make good career decisions",
            children: [
              Node.create({
                url: urlWrap`/career-decision/article`,
                label: "Make an immediate decision",
              }),
              Node.create({
                url: urlWrap`/career-planning/#learn-more-about-career-decision-making`,
                label: "Improve your decision-making skills",
              }),
            ],
          }),
        ],
      }),
      NodeCategory.create({
        label: "Browse all our content",
        description: "Pick a topic to explore or check out our most popular pieces.",
        url: urlWrap`/topics`,
        children: [
          NodeCategory.create({
            label: "Selected topics",
            extension: { label: "See all topics →", url: urlWrap`/topics` },
            children: [
              Node.create({
                url: urlWrap`/topic/big-picture/moral-philosophy`,
                label: "Moral philosophy ",
              }),
              Node.create({
                url: urlWrap`/topic/planning/career-capital/skills`,
                label: "Skills ",
              }),
              Node.create({
                url: urlWrap`/topic/planning/personal-fit/job-satisfaction`,
                label: "Job satisfaction ",
              }),
              Node.create({
                url: urlWrap`/topic/other/anonymous-advice`,
                label: "Anonymous advice ",
              }),
              Node.create({
                url: urlWrap`/topic/other/unconventional-advice`,
                label: "Unconventional advice ",
              }),
              Node.create({
                url: urlWrap`/topic/other/what-to-study`,
                label: "What to study ",
              }),
              Node.create({
                url: urlWrap`/topic/strategies/advocacy-strategies`,
                label: "Advocacy ",
              }),
              Node.create({
                url: urlWrap`/topic/causes/catastrophic-risks`,
                label: "Catastrophic risks ",
              }),
              Node.create({
                url: urlWrap`/topic/causes/meta-causes`,
                label: "Meta-causes ",
              }),
              Node.create({
                url: urlWrap`/topic/priority-paths`,
                label: "Priority paths ",
              }),
            ],
          }),
          NodeCategory.create({
            label: "Top articles from outside our guides",
            extension: {
              label: "All articles →",
              url: urlWrap`/research/#list-of-everything`,
            },

            children: [
              Node.create({
                url: urlWrap`/career-guide/job-satisfaction`,
                label: "What makes for a dream job? ",
              }),
              Node.create({
                url: urlWrap`/articles/best-charity`,
                label: "Best charities to donate to ",
              }),
              Node.create({
                url: urlWrap`/2020/08/misconceptions-effective-altruism`,
                label: "Misconceptions about effective altruism ",
              }),
              Node.create({
                url: urlWrap`/articles/research-questions-by-discipline`,
                label: "High-impact research questions ",
              }),
              Node.create({
                url: urlWrap`/2015/07/what-are-your-odds-of-getting-into-congress-if-you-try`,
                label: "What are your chances of getting elected to Congress, if you try? ",
              }),
              Node.create({
                url: urlWrap`/2012/08/how-many-lives-does-a-doctor-save`,
                label: "How many lives does a doctor save? ",
              }),
              Node.create({
                url: urlWrap`/articles/is-voting-important`,
                label: "What's the impact of voting? ",
              }),
              Node.create({
                url: urlWrap`/articles/advice-for-undergraduates`,
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
            url: urlWrap`/podcast`,
          }),
          Node.create({
            label: "80k After Hours",
            url: urlWrap`/after-hours-podcast`,
          }),
        ],
      }),
      NodeCategory.create({
        label: "Curated series",
        children: [
          Node.create({
            label: "Effective Altruism: An Introduction",
            url: urlWrap`/podcast/effective-altruism-an-introduction`,
          }),
          Node.create({
            label: "Effective Altruism: Ten Global Problems",
            url: urlWrap`/podcast/effective-altruism-ten-global-problems`,
          }),
        ],
      }),
    ],
  }),
  Node.create({
    label: "Get 1-1 advice",
    url: urlWrap`/speak-with-us/?int_campaign=2021-08__primary-navigation`,
  }),
  Node.create({
    label: "Book giveaway",
    url: urlWrap`/book-giveaway`,
  }),
];

export const nodesSecondary: Node[] = [
  Node.create({
    isSecondary: true,
    label: "New releases",
    url: urlWrap`/latest`,
  }),
  Node.create({
    isSecondary: true,
    label: "All articles",
    url: urlWrap`/all-articles`,
  }),
  Node.create({
    isSecondary: true,
    label: "Community",
    url: urlWrap`/community`,
  }),
  Node.create({
    isSecondary: true,
    label: "About",
    url: urlWrap`/about`,
    categories: [
      NodeCategory.create({
        label: "About us",
        children: [
          Node.create({
            label: "Introduction",
            url: urlWrap`/about`,
          }),
          Node.create({
            label: "Meet the team",
            url: urlWrap`/about/meet-the-team`,
          }),
          Node.create({
            label: "Our donors",
            url: urlWrap`/about/donors`,
          }),
          Node.create({
            label: "Media coverage",
            url: urlWrap`/about/media-coverage`,
          }),
          Node.create({
            label: "Contact us",
            url: urlWrap`/about/contact-us`,
          }),
        ],
      }),
      NodeCategory.create({
        label: "Support us",
        children: [
          Node.create({
            label: "Take our survey",
            url: urlWrap`/user-survey`,
          }),
          Node.create({
            label: "Donate",
            url: urlWrap`/support-us/donate`,
          }),
          Node.create({
            label: "Stay updated",
            url: urlWrap`/about/stay-updated`,
          }),
          Node.create({
            label: "Acknowledgements",
            url: urlWrap`/support-us/acknowledgements`,
          }),
          Node.create({
            label: "Work with us",
            url: urlWrap`/about/work-with-us`,
          }),
        ],
      }),
      NodeCategory.create({
        label: "Our impact & credibility",
        children: [
          Node.create({
            label: "Evaluations",
            url: urlWrap`/about/credibility/evaluations`,
          }),
          Node.create({
            label: "Our mistakes",
            url: urlWrap`/about/credibility/evaluations/mistakes`,
          }),
          Node.create({
            label: "Research principles",
            url: urlWrap`/about/credibility/research-principles`,
          }),
          Node.create({
            label: "Endorsements",
            url: urlWrap`/about/credibility/endorsements`,
          }),
          Node.create({
            label: "Testimonials",
            url: urlWrap`/about/impact/testimonials`,
          }),
        ],
      }),
    ],
  }),
];

export const nodesAll = nodes.concat(nodesSecondary);
