const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");
const LoginRouter = require("express").Router();
const User = require("../models/MUser");
const {errorHandler, tokenExtractor, validateSession} = require("../utils/middleware");

LoginRouter.use(tokenExtractor);
// LoginRouter.use(validateSession);

LoginRouter.post("/", async (req, res, next) => {
    try {
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
    
        const token = jwt.sign(tokenData, process.env.SECRET, {expiresIn: 10 * 1}); // expiress in 10 min

        res.status(200).send({token, username: user.username, name: user.name, id: user.id});
    }
    catch(err) {
        next(err);
    }
});

LoginRouter.post("/verify", async (req, res, next) => {
    try {
        const token = req.body.token;

        jwt.verify(token, process.env.SECRET, (err, result) => {
            if(err) {
                res.status(401).send("token expired");
            }
            else {
                res.status(200).send("token valid");
            }
        });
    }
    catch(err) {
        next(err);
    }
});

LoginRouter.use(errorHandler);

module.exports = LoginRouter