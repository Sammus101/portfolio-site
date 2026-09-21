// All homepage copy lives here. Edit the text; the section components in src/components/home/
// read from this file. Projects for "Selected Work" come from src/content/projects.ts.
export const home = {
  hero: {
    name: "Samuel Ehret",
    subtitle: "Product · Technology · Science",
    quote: "I like understanding complex things and building useful ones.",
    cta: { label: "Explore my work", href: "#work" },
  },

  fragments: {
    title: "A Life in Fragments",
    // One card per chapter. `label` is the card name (it also picks the icon in
    // fragment-icons.tsx); `subtitle` and `text` appear on hover.
    steps: [
      {
        label: "Biology",
        subtitle: "Learning to understand complex systems.",
        text: "Biology taught me to look at the world as interconnected systems rather than isolated parts. It ingrained in me the idea that even a small element can have a powerful impact on the whole.",
      },
      {
        label: "Climate Science",
        subtitle: "Understanding the forces shaping our world.",
        text: "Climate science taught me how complex systems interact across economic, social, and geopolitical dimensions. It also showed me the importance of communication as a vector for change.",
      },
      {
        label: "Research",
        subtitle: "Turning questions into evidence.",
        text: "Research taught me to work with uncertainty, challenge assumptions, and follow evidence rather than intuition. It showed me that, given enough time and curiosity, even complex topics can be understood.",
      },
      {
        label: "Product",
        subtitle: "Turning problems into something useful.",
        text: "Product taught me to move from understanding a problem to creating something people can actually use. It also showed me that creation is not the end of the process; integrating something into the real world is where much of the work begins.",
      },
      {
        label: "Technology & AI",
        subtitle: "Exploring what becomes possible when we build.",
        text: "Technology gives me a way to turn ideas into tools, experiment quickly, and explore problems that were previously difficult to tackle. AI has become a catalyst for growth across domains, not a replacement for thinking, but a tool that helps me learn faster, go deeper, and turn ideas into action.",
      },
    ],
  },

  mind: {
    title: "What Occupies My Mind",
    // `label` is the card name; `subtitle` and `text` appear when the card is opened.
    topics: [
      {
        label: "Life",
        subtitle: "Trying to understand what makes a life worth living.",
        text: "Understanding how to live a worthwhile life is one of the most important pursuits an individual can undertake. This search has taken me through ancient philosophy, modern psychology, different cultures, and experiences that have fundamentally changed how I see the world.",
      },
      {
        label: "Investing",
        subtitle: "Understanding businesses, systems, and where value comes from.",
        text: "Investing brings together many of the things I enjoy studying: businesses, products, markets, incentives, and complex systems. I enjoy understanding how companies create value, where their advantages come from, and how those insights can translate into long-term investment opportunities.",
      },
      {
        label: "Human Nature",
        subtitle: "Understanding what drives people, and how we can work together.",
        text: "Learning about psychology, communication, and human nature is one of the most useful tools for navigating both the world and ourselves. I want to understand what drives us, what makes us change, and how incentives can be aligned to solve problems together.",
      },
      {
        label: "Science",
        subtitle: "Exploring the unknown.",
        text: "The search to understand our universe is one of humanity's oldest pursuits. From Aristotle to Newton and beyond, we have continually pushed the boundaries of what we know. Every discovery reveals another layer of the extraordinary complexity of existence.",
      },
      {
        label: "Technology",
        subtitle: "A tool for shaping the future.",
        text: "To me, technology is where scientific understanding meets human ambition. It can alleviate some of the world's greatest challenges, while creating new ones when poorly understood or misused. I want to understand that double-edged power and use it to improve the human condition.",
      },
    ],
  },

  selectedWork: {
    title: "Selected Work",
    viewAll: { label: "View all", href: "/projects" },
  },

  now: {
    title: "Now",
    items: ["Learning", "Building", "Reading", "Exploring", "Thinking"],
  },

  explore: {
    title: "There's more to explore",
    links: [
      { label: "Work", href: "/work" },
      { label: "Think", href: "/ideas" },
      { label: "Build", href: "/projects" },
      { label: "Life", href: "/about" },
    ],
  },
};
