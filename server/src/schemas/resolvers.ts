import { AuthenticationError } from 'apollo-server-errors';
import User from '../models/User.ts';
import type { UserDocument } from '../models/User.ts';
import { signToken } from '../services/auth.ts';

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
      if (!user || !(await user.isCorrectPassword(password))) {
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
      return User.findByIdAndUpdate(
        context.user._id.toString(),
        { $push: { savedBooks: input } },
        { new: true }
      );
    },

    removeBook: async (_parent: any, { bookId }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return User.findByIdAndUpdate(
        context.user._id.toString(),
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
