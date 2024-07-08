const BlogRouter = require("express").Router();
const Blog = require("../models/MBlog");


BlogRouter.get("/:id", async (req, res) => {
  try {
    const result = await Blog.findOne({ "id": req.params.id });
    if(result.id) {
      res.status(200).json(result);
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
    const result = await Blog.deleteMany({});
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.errors);
  }
});

BlogRouter.delete("/:id", async (req, res) => {
  try {
    const result = await Blog.deleteOne({ "id": req.params.id });
    if(result.acknowledged && result.deletedCount == 1) {
          res.status(200).json(result);
    }
    else res.status(404).send("Not found");
  } catch (err) {
    res.status(400).send(err.errors);
  }
});


module.exports = BlogRouter;