import mongoose, { Document, Schema } from 'mongoose';

export interface CommentDocument extends Document {
  content: string;
  user: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
}

const CommentSchema = new Schema<CommentDocument>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
}, { timestamps: true, versionKey: false });

export default mongoose.model<CommentDocument>('Comment', CommentSchema);