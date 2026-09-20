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
    steps: ["Biology", "Climate", "Research", "Product", "Technology", "AI"],
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
