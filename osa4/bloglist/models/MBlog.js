const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
  id: Object,
  title: String,
  author: String,
  url: String,
  likes: Number
  }).set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;