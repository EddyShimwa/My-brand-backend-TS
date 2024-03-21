import mongoose, { Document, Schema } from 'mongoose';

export interface ProjectDocument extends Document {
  projectName: string;
  imageUrl: string;
  project_description: string;
  skills: string[];
  sourceCode: string;
  livePreview?: string;
}

const ProjectSchema = new Schema<ProjectDocument>({
  projectName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  project_description: { type: String, required: true },
  skills: { type: [String], required: true },
  sourceCode: { type: String, required: true },
  livePreview: { type: String },
}, { timestamps: true, versionKey: false });

export default mongoose.model<ProjectDocument>('Project', ProjectSchema);