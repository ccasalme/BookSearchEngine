import type { Book } from './Book.js';

export interface User {
  username: string;
  email: string;
  password: string;
  savedBooks: Book[];
  removeBook?(bookId: string): void;  // ✅ Ensures removeBook function exists
}
