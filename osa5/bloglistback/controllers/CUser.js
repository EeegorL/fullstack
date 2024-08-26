const bcrypt = require("bcrypt");
const UserRouter = require("express").Router();
const User = require("../models/MUser");
const {errorHandler} = require("../utils/middleware");
const { usersInDB } = require("../utils/users_helper");

UserRouter.post("/", async (req, res, next) => {
    try {
        const sRounds = 10;
    
        const user = new User(req.body);
        if(!user.password || user.password.length < 3) {
            res.status(400).json({error: "password must be atleast 3 characters long"});
        }
        else {
            user.password = await bcrypt.hash(user.password, sRounds);
            user.id = user._id.toString();
    
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        }

    }
    catch(err) {
        next(err);
    }
});

UserRouter.get("/", async (req, res, next) => {
    try {
        const users = await User.find({}).populate("blogs");
        res.status(200).send(users);
    }
    catch(err) {
        next(err);
    }
});

UserRouter.get("/:id", async (req, res, next) => {
    try{
        const user = await User.find({id: req.params.id}).populate("blogs");

        if(user.length > 0) res.status(200).send(user);
        else next(new Error("Not found"));
    }
    catch(err) {
        next(err);
    }
});

const userErrorHandler = (err, req, res, next) => {
    if(err.message === "Not found") {
        return res.status(404).send({error : "user does not exist"});
     }
    else if(err.message === "data and salt arguments required") {
       return res.status(400).send({ error: "a password is required" });
    }
     next(err);
}

UserRouter.use(userErrorHandler);
UserRouter.use(errorHandler);

module.exports = UserRouter;