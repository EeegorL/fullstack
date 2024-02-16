const BlogRouter = require("express").Router();
const Blog = require("../models/Blog");


BlogRouter.get("/getAll", (req, res) => {
    Blog.find({})
      .then(blogs => {
        res.json(blogs);
      });
  });
  
  BlogRouter.post("/createOne", (req, res) => {
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.status(201).json(result);
      });
  });

module.exports = BlogRouter;