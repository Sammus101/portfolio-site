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
    topics: ["AI", "Climate", "Investing", "Science", "Technology", "Human nature"],
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
