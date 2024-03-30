const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  posterId: { 
    type: String,
    required: true
  },
  postedOn: {
    type: String,
    default: Date.now
  },
  imagePath: {
    type: String,
    required: false
  }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;