import type { Book } from './Book.js';

export interface User {
  username: string | null;
  email: string | null;
  password?: string | null;
  savedBooks: Book[];
}
