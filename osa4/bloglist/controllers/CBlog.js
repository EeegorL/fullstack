const BlogRouter = require("express").Router();
const Blog = require("../models/MBlog");


BlogRouter.get("/", async (req, res) => {
  let result = await Blog.find({});
  res.json(result);
});

BlogRouter.get("/:id", async (req, res) => {
  let result = await Blog.find({ "id": req.params._id })
  res.json(result);
});

BlogRouter.post("/createOne", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    let result = blog.save()
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
});

BlogRouter.delete("/", async (req, res) => {
  try {
    let result = Blog.deleteMany({})
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
});

BlogRouter.delete("/:id", (req, res) => {
  try {
    let result = Blog.deleteOne({ "id": req.params.id })
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});


module.exports = BlogRouter;