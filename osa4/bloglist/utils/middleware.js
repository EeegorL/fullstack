const jwt = require("jsonwebtoken");

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"});
};

const errorHandler = (err, req, res, next) => {
    if(err.name === "CastError") {
        return res.status(400).send({ error: "id of wrong format" })
    } 
    else if(err.name === "ValidationError") {
        return res.status(400).json({ error: err.message })
    } 
    else if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key error")) {
        return res.status(409).json({ error: "username should be unique" })
    } 
    else if(err.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "invalid token" })
    } 
    else if(err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "token expired" });
    }
    next(err);
};

const tokenExtractor = (req, res, next) => {
    const auth = req.get("authorization");

    if(auth && auth.startsWith("Bearer ")) {
      req.token = auth.replace("Bearer ", "");
    }
    next();
}

const userExtractor = (req, res, next) => {
    const auth = req.get("authorization");
    if(auth && auth.startsWith("Bearer ")) {
        const token = auth.replace("Bearer ", "");
        const decodedToken = jwt.decode(token, process.env.SECRET);

        req.user = {
            id: decodedToken.id,
            username: decodedToken.username
        };
      };
    next();
}

module.exports = {unknownEndpoint, errorHandler, tokenExtractor, userExtractor}