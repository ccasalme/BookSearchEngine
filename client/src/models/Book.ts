export interface Book {
  bookId: string;  // ✅ This must always match Google Books `id`
  authors: string[];
  description: string;
  image: string;
  link: string;
  title: string;
}
