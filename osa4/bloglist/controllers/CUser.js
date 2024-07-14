const bcrypt = require("bcrypt");
const UserRouter = require("express").Router();
const User = require("../models/MUser");

UserRouter.post("/", async (req, res) => {
    const { username, name, password } = request.body;

    const sRounds = 10;
    const passwordHash = await bcrypt.hash(password, sRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });
    user.id = user._id.toString();

    const savedUser = await user.save();

    res.status(201).json(savedUser);
});

module.exports = UserRouter;