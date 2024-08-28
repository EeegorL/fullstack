const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");
const LoginRouter = require("express").Router();
const User = require("../models/MUser");

LoginRouter.post("/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username});
    const passwordIsCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password);

    if(!(user && passwordIsCorrect)) {
        return res.status(401).json({
            err: "incorrect username or password"
        });
    };

    const tokenData = {
        username: user.username,
        id: user.id
    };

    const token = jwt.sign(tokenData, process.env.SECRET, {expiresIn: 20 * 60}); // expiress in 20 min

    res.status(200).send({token, username: user.username, name: user.name});
});

module.exports = LoginRouter