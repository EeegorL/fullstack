const BlogRouter = require("express").Router();
const Blog = require("../models/MBlog");


BlogRouter.get("/", (req, res) => {
  Blog.find({})
    .then(blogs => {
      res.json(blogs);
    });
});
BlogRouter.get("/:id", (req, res) => {
  Blog.find({ "id": req.params._id })
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => res.json(err));
});

BlogRouter.post("/createOne", (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.status(201).json(result);
    });
});

BlogRouter.delete("/", (req, res) => {
  Blog.deleteMany({})
    .then(result => {
      res.status(201).json(result);
    }).catch(err => console.log(err));
});

BlogRouter.delete("/:id", (req, res) => {
  Blog.deleteOne({ "id": req.params.id })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

module.exports = BlogRouter;