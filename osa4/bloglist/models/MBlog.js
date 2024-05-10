const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
  _id: Number,
  title: String,
  author: String,
  url: String,
  likes: Number
  },
  {versionKey:false}) //removes the __v from returned values

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;