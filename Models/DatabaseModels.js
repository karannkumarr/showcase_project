import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: true },
  description: { type: String, minlength: 2, maxlength: 1000 },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true },
  image: { type: String, required: true },
  liveSiteUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  category: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export { User, Project };
