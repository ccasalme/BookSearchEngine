import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';
import { User } from '../models/User.js';
import type { Book } from '../models/Book.js';

// Get logged-in user's info
export const useUserData = () => {
  return useQuery(GET_ME);
};

// Create a new user
export const useSignup = () => {
  return useMutation(ADD_USER);
};

// Login a user
export const useLogin = () => {
  return useMutation(LOGIN_USER);
};

// Save a book for logged-in user
export const useSaveBook = () => {
  return useMutation(SAVE_BOOK);
};

// Remove saved book from user profile
export const useRemoveBook = () => {
  return useMutation(REMOVE_BOOK);
};
