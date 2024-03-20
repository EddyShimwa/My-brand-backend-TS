import mongoose, { Document, Schema } from 'mongoose';

export interface SkillDocument extends Document {
  name: string;
  icon: string;
}

const SkillSchema = new Schema<SkillDocument>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
}, { timestamps: true, versionKey: false });

export default mongoose.model<SkillDocument>('Skill', SkillSchema);
