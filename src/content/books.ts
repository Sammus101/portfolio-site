export type Book = {
  id: string;
  title: string;
  author: string;
  note?: string;
};

// Reading list — feeds the future /books page.
export const books: Book[] = [
  {
    id: "book-one",
    title: "Placeholder title",
    author: "Placeholder author",
  },
];
