import { Schema, type Document } from 'mongoose';

interface BookDocument extends Document {
  bookId: string;  // ✅ Ensure this exists in MongoDB!
  title: string;
  authors: string[];
  description: string;
  image: string;
  link: string;
}

const bookSchema = new Schema<BookDocument>({
  bookId: { type: String, required: true },  // ✅ Ensure it's required!
  authors: [{ type: String }],
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  title: { type: String, required: true },
});

export default bookSchema;
export type { BookDocument };
