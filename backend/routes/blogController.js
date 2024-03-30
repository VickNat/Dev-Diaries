const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
    console.log("Blogs fetched successfully", blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error fetching blogs", error);
  }
})

// Get all blogs with user id
router.get('/user/:id', async (req, res) => {
  try {
    const blogs = await Blog.find({ posterId: req.params.id });
    res.json(blogs);
    console.log("Blogs fetched successfully", blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error fetching blogs", error);
  }
})

// Get one blog
router.get('/:id', getBlog, (req, res) => {
  res.json(res.blog);
})

// Get single blog middleware
async function getBlog(req, res, next) {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.blog = blog;
  next();
}

// Create one blog
router.post('/', async (req, res) => {
  const blog = new Blog({
    headline: req.body.headline,
    content: req.body.content,
    posterId: req.body.posterId,
    postedOn: req.body.postedOn,
    // image: req.body.image
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
    console.log("Blog created successfully", newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error creating blog", error);
  }
})

// Update one blog
router.patch('/:id', getBlog, async (req, res) => {
  if (req.body.headline != null) {
    res.blog.headline = req.body.headline;
  }
  if (req.body.content != null) {
    res.blog.content = req.body.content;
  }
  if (req.body.posterId != null) {
    res.blog.posterId = req.body.posterId;
  }
  if (req.body.postedOn != null) {
    res.blog.postedOn = req.body.postedOn;
  }
  // if (req.body.image != null) {
  //   res.blog.image = req.body.image;
  // }

  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
    console.log("Blog updated successfully", updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error updating blog", error);
  }
})

// Delete one blog
router.delete('/:id', getBlog, async (req, res) => {
  try {
    // await res.blog.remove();
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
    console.log("Blog deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error deleting blog", error);
  }
})

module.exports = router;