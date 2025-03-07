import { Schema, model, type Document, type Types } from 'mongoose';
import bcrypt from 'bcrypt';
import bookSchema from './Book.js';
import type { BookDocument } from './Book.js';

interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  savedBooks: BookDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
  removeBook(bookId: string): Promise<UserDocument>; // ✅ Added this!
}


const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedBooks: [bookSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// **🔥 Hash password before saving**
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// **🔥 Compare passwords for login**
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// **🔥 Virtual for book count**
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model<UserDocument>('User', userSchema);

export { type UserDocument };
export default User;
