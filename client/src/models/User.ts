import type { Book } from './Book.js';

export interface User {
  username: string;
  email: string;
  password: string;
  savedBooks: Book[];
}
