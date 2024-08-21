const BlogRouter = require("express").Router();
const Blog = require("../models/MBlog");
const User = require("../models/MUser");


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
    const authorUser = await User.findById(req.body.user);

    const blog = new Blog(req.body);
    blog.id = blog._id.toString();

    blog.user = authorUser.id; 
    authorUser.blogs.push(blog);
    authorUser.save();

    const result = await blog.save();

    res.status(201).json(result);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
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

BlogRouter.patch("/:id", async (req, res) => {
  try {
    const blog = req.body;

    const result = await Blog.findOneAndUpdate({id: req.params.id}, blog);
    res.status(200).send(result);
  }
  catch(err) {
    res.status(400).send(err.errors);
  }
});


module.exports = BlogRouter;