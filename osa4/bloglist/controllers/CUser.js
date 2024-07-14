const bcrypt = require("bcrypt");
const UserRouter = require("express").Router();
const User = require("../models/MUser");
const { usersInDB } = require("../utils/users_helper");

UserRouter.post("/", async (req, res) => {
    try {
        const sRounds = 10;
    
        const user = new User(req.body);
        
        user.passwordHash = await bcrypt.hash(user.passwordHash, sRounds);
        user.id = user._id.toString();

        const savedUser = await user.save();
        res.status(201).json(savedUser);
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

module.exports = UserRouter;