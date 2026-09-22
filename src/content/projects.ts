export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

// Shared by the homepage teaser and the future /projects page. Card art for the homepage teaser
// is keyed off `id` in src/components/home/work-graphics.tsx.
export const projects: Project[] = [
  {
    id: "second-brain",
    title: "Second Brain",
    description:
      "A digital repository for my ideas, projects, and the knowledge I encounter. Rather than simply storing information, I use it to map how ideas connect across different domains, so everything I learn feeds into everything I do, helping me spot blind spots, connect distant ideas, and turn knowledge into action.",
    tags: ["Knowledge Management", "Systems Thinking"],
  },
  {
    id: "masters-thesis",
    title: "Master's Thesis",
    description:
      "An investigation into how climate change could affect one of Switzerland's most devastating natural hazards: flash floods. I analysed more than 125 years of data alongside projections from over 50 climate models to study changes in atmospheric moisture transport toward Switzerland, contributing to research on how the frequency and intensity of these events may change.",
    tags: ["Climate Science", "Atmospheric Rivers"],
  },
  {
    id: "investing-guide",
    title: "Investing Guide",
    description:
      "A structured guide to investing for beginners, built from years of informally helping friends and family navigate markets. The goal isn't to recommend specific investments, but to explain how markets work and how small, rational decisions can compound over a lifetime.",
    tags: ["Financial Literacy", "Investing"],
  },
];
