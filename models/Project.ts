import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    name: String,
    imageURL: String,
    live_link: String,
    description: String,
    github_link: String,
    tools: [String],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default Project;
