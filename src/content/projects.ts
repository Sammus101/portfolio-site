export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

// Shared by the homepage teaser and the future /projects page.
export const projects: Project[] = [
  {
    id: "project-one",
    title: "Placeholder project one",
    description: "Placeholder project description — replace once content is ready.",
    tags: ["Tag"],
  },
  {
    id: "project-two",
    title: "Placeholder project two",
    description: "Placeholder project description — replace once content is ready.",
    tags: ["Tag"],
  },
  {
    id: "project-three",
    title: "Placeholder project three",
    description: "Placeholder project description — replace once content is ready.",
    tags: ["Tag"],
  },
];
