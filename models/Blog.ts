import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: String,
    content: String,
    date: Date,
    medium_link: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
