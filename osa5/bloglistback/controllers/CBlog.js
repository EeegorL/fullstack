const BlogRouter = require("express").Router();
const Blog = require("../models/MBlog");
const User = require("../models/MUser");
const {errorHandler, tokenExtractor, userExtractor, validateSession} = require("../utils/middleware");

BlogRouter.use(tokenExtractor);
BlogRouter.use(userExtractor);
// BlogRouter.use(validateSession);


BlogRouter.get("/:id", async (req, res, next) => {
  try {
    const result = await Blog.findOne({ "id": req.params.id }).populate("user");
    if(result) {
      res.status(200).json(result);
    }
    else res.status(404).json("Blog does not exist");
  }
  catch(err) {
    next(err);
  }
});

BlogRouter.get("/", async (req, res) => {
  const result = await Blog.find({}).populate("user");
  res.json(result);
});

BlogRouter.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({error: "invalid token"});
    }
    const authorUser = await User.findById(req.user.id);

    const blog = new Blog(req.body);
    blog.id = blog._id.toString();

    blog.user = authorUser.id; 
    authorUser.blogs.push(blog);
    authorUser.save();

    const result = await blog.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

BlogRouter.delete("/", async (req, res, next) => {
  try {
    const result = await Blog.deleteMany({});
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

BlogRouter.delete("/:id", async (req, res, next) => {
  try {
    const blogToDelete = await Blog.findById(req.params.id);
    if(blogToDelete) {
      if (!req.user) {
        return res.status(401).json({err: "invalid token"});
      }
      const blogToDeleteAuthor = await User.find({id: blogToDelete.user.toString()});
      if(!(req.user.username === blogToDeleteAuthor[0].username)) {
        return res.status(401).json({err: "Not authorized to delete"});
      }
  
      const result = await Blog.deleteOne({ "id": req.params.id });
  
      if(result.acknowledged && result.deletedCount == 1) {
            res.status(200).json(result);
      }
      else { // should not go here...
        res.status(404).send("Not found");
      }
    }
    else {
      res.status(404).send("Not found");
    }
  } catch (err) {
      next(err);
  }
});

BlogRouter.patch("/:id", async (req, res, next) => {
  try {
    const blogToPatch = await Blog.findById(req.params.id);
    if(blogToPatch) {
      if (!req.user) {
        return res.status(401).json({err: "invalid token"});
      }
      const blogToPatchAuthor = await User.find({id: blogToPatch.user.toString()});
      if(!(req.user.username === blogToPatchAuthor[0].username)) {
        return res.status(401).json({err: "Not authorized to update"});
      }
      const blog = req.body;
      const result = await Blog.findOneAndUpdate({id: req.params.id}, blog);

      res.status(200).send(result);
    }
    else {
      res.status(404).send("Not found");
    }
  }
  catch(err) {
    next(err);
  }
});

BlogRouter.use(errorHandler);


module.exports = BlogRouter;