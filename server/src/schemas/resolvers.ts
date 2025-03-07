import { AuthenticationError } from 'apollo-server-errors';
import User from '../models/User.js';
import type { UserDocument } from '../models/User.js';
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return User.findById(context.user._id);
    },
  },

  Mutation: {
    login: async (_parent: any, { email, password }: { email: string, password: string }) => {
      const user: UserDocument | null = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      
      const isValid = await user.isCorrectPassword(password);
      if (!isValid) {
        throw new AuthenticationError('Invalid credentials');
      }
      
      const token = signToken({
        _id: user._id.toHexString(),
        username: user.username,
        email: user.email,
      });
      return { token, user };
    },

    addUser: async (_parent: any, { username, email, password }: { username: string, email: string, password: string }) => {
      const user: UserDocument = await User.create({ username, email, password });
      
      const token = signToken({
        _id: user._id.toHexString(),
        username: user.username,
        email: user.email,
      });
      return { token, user };
    },

    saveBook: async (_parent: any, { input }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
    
      console.log("📥 Saving book:", input);
    
      if (!input.bookId) {
        throw new Error("❌ bookId is required!");
      }
    
      return User.findByIdAndUpdate(
        context.user._id.toString(),
        { $addToSet: { savedBooks: input } },  // ✅ Prevents duplicate books
        { new: true }
      );
    },    
    
    removeBook: async (_parent: any, { bookId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
    
      console.log("🗑 Removing book with ID:", bookId);
    
      return await User.findByIdAndUpdate(
        context.user._id.toString(),
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },    
  },
};

export default resolvers;
