const bcrypt = require("bcrypt");
const UserRouter = require("express").Router();
const User = require("../models/MUser");
const { usersInDB } = require("../utils/users_helper");

UserRouter.post("/", async (req, res) => {
    try {
        const sRounds = 10;
    
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, sRounds);
        user.id = user._id.toString();

        const allBlogs = await User.find({});
        if(allBlogs.some(blog => blog.username == user.username)) {
            res.status(409).send("Username already exists");
        }
        else {
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        }
    }
    catch(err) {
        res.status(400).send(err.errors);
    }
});

UserRouter.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch(err) {
        res.status(404).send(err);
    }
});

UserRouter.get("/:id", async (req, res) => {
    try{
        const user = await User.find({id: req.params.id});

        if(user) res.status(200).send(user);
        else res.status(404);
    }
    catch(err) {
        res.status(404).send(err.errors);
    }
});

module.exports = UserRouter;