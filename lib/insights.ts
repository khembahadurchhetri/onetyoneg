export type Insight = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];
};

export const insights: Insight[] = [
  {
    slug: "before-you-build-your-business-website",
    category: "Websites",
    title: "Before you build a business website, get clear on these five things",
    excerpt:
      "A useful website starts with a clear purpose. A short checklist can save time before design and development begin.",
    readingTime: "4 min read",
    sections: [
      {
        heading: "Start with the visitor",
        paragraphs: [
          "Before choosing colours or layouts, think about the person who will arrive on your site. What are they looking for, and what should they be able to do next?",
        ],
        points: [
          "Name the main audience you want to reach.",
          "Choose the most important action: call, message, book, or request a quote.",
          "Put that action somewhere visitors can find it quickly.",
        ],
      },
      {
        heading: "Gather the essentials",
        paragraphs: [
          "A website project moves more smoothly when the basic content is ready early. You do not need polished copy on day one, but you do need a useful starting point.",
        ],
        points: [
          "A short explanation of what you offer and who it is for.",
          "Current contact details, business hours, and service areas.",
          "Real photos, examples of your work, and answers to common questions.",
        ],
      },
      {
        heading: "Plan for phones first",
        paragraphs: [
          "Many customers will discover a business on a phone. Check that the key information is easy to read, buttons are comfortable to tap, and contact options work without pinching or zooming.",
        ],
      },
      {
        heading: "Keep the first version focused",
        paragraphs: [
          "A smaller, clearer website is often more useful than a large site full of unfinished pages. Start with what your customers need today, then improve it as you learn from real enquiries.",
        ],
      },
    ],
  },
  {
    slug: "getting-ready-for-a-digital-project",
    category: "Working together",
    title: "How to get ready for your first digital project",
    excerpt:
      "You do not need a perfect brief. A few honest notes about your goals, audience, and constraints are enough to get a good conversation started.",
    readingTime: "3 min read",
    sections: [
      {
        heading: "Describe the problem in plain language",
        paragraphs: [
          "Instead of starting with a list of features, explain what is difficult right now. Maybe customers cannot find the right information, bookings take too many messages, or a manual process keeps slowing the team down.",
        ],
      },
      {
        heading: "Bring examples, not solutions",
        paragraphs: [
          "Show examples of experiences you like and explain what works for you. They are useful conversation starters, but the best result should still fit your business, customers, and budget.",
        ],
      },
      {
        heading: "Be open about practical limits",
        paragraphs: [
          "A realistic budget, deadline, and list of must-haves helps a team recommend an achievable approach. It is fine if some details are undecided; identifying the open questions is part of planning.",
        ],
        points: [
          "What needs to be ready first?",
          "Who will provide or approve content?",
          "What would make the project feel successful to you?",
        ],
      },
      {
        heading: "Make room for feedback",
        paragraphs: [
          "Good digital work is collaborative. Decide who will collect feedback and make approvals so useful decisions do not get lost across too many conversations.",
        ],
      },
    ],
  },
  {
    slug: "a-practical-online-presence-for-local-business",
    category: "Marketing",
    title: "A practical online presence for a local business",
    excerpt:
      "You do not have to be everywhere online. Keep the places customers rely on accurate, helpful, and easy to contact.",
    readingTime: "4 min read",
    sections: [
      {
        heading: "Make the basics consistent",
        paragraphs: [
          "Use the same business name, phone number, address, and opening hours wherever customers look. If something changes, update the places that matter most to your customers first.",
        ],
      },
      {
        heading: "Show what customers can expect",
        paragraphs: [
          "Recent, genuine photos and a clear description of your products or services help people decide whether you are the right fit. Specific details are more useful than broad claims.",
        ],
      },
      {
        heading: "Choose a manageable rhythm",
        paragraphs: [
          "A sustainable posting routine is better than starting on many channels and abandoning them. Focus on one or two places your customers already use, and share updates that answer real questions.",
        ],
      },
      {
        heading: "Make it easy to take the next step",
        paragraphs: [
          "Check that your website, social profiles, and listings make the next action obvious. That might be a phone call, a map, a booking enquiry, or a message.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
