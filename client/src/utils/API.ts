import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';
import type { User } from '../models/User';
import type { Book } from '../models/Book';

// Get logged-in user's info
export const useUserData = () => {
  const { data, refetch } = useQuery<{ me: User }>(GET_ME); // ✅ Ensure refetch is included
  return { data, refetch };
};

// Create a new user
export const useSignup = () => {
  return useMutation<{ addUser: { token: string; user: User } }, { username: string; email: string; password: string }>(ADD_USER);
};

// Login a user
export const useLogin = () => {
  return useMutation<{ login: { token: string; user: User } }, { email: string; password: string }>(LOGIN_USER);
};

// Save a book for logged-in user
export const useSaveBook = () => {
  return useMutation<{ saveBook: User }, { input: Book }>(SAVE_BOOK);
};

// Remove saved book from user profile
export const useRemoveBook = () => {
  return useMutation<{ removeBook: User }, { bookId: string }>(REMOVE_BOOK);
};
