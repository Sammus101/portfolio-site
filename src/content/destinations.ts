export type Destination = {
  index: string;
  href: string;
  title: [string, string];
  navLabel: string;
};

// Placeholder set taken from the reference mock — the final list is decided once the design settles.
export const DESTINATIONS: Destination[] = [
  { index: "01", href: "/work", title: ["Resume &", "Playbook"], navLabel: "Resume" },
  { index: "02", href: "/ideas", title: ["Ideas &", "Philosophy"], navLabel: "Ideas & Philosophy" },
  { index: "03", href: "/books", title: ["The", "Bookshelf"], navLabel: "Books" },
  { index: "04", href: "/projects", title: ["Ventures &", "Projects"], navLabel: "Projects" },
  { index: "05", href: "/experiments", title: ["The Experiments", "Lab"], navLabel: "Experiments" },
];
