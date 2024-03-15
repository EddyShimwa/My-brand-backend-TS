import mongoose, { Document, Schema } from 'mongoose';

export interface BlogDocument extends Document {
  title: string;
  image: string;
  description: string;

}

const BlogSchema = new Schema<BlogDocument>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true, versionKey: false });

export default mongoose.model<BlogDocument>('Blog', BlogSchema);
