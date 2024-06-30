const BlogRouter = require("express").Router();
const Blog = require("../models/MBlog");


BlogRouter.get("/:id", async (req, res) => {
  try {
    const result = await Blog.findOne({ "id": req.params.id });
    if(result.id) {
      res.status(200).json(result)
    }
    else res.status(404).json("Blog does not exist");
  }
  catch(err) {
    res.status(404).json(err);
  }
});

BlogRouter.get("/", async (req, res) => {
  const result = await Blog.find({});
  res.json(result);
});

BlogRouter.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    blog.id = blog._id.toString();

    const result = await blog.save();

    res.status(201).json(result);
  } catch (err) {
      res.status(400).send(err.errors);
  }
});

BlogRouter.delete("/", async (req, res) => {
  try {
    const result = Blog.deleteMany({})
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
});

BlogRouter.delete("/:id", (req, res) => {
  try {
    const result = Blog.deleteOne({ "id": req.params.id })
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});


module.exports = BlogRouter;