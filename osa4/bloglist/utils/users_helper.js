const User = require("../models/MUser");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const hash = async(password, saltRounds) => await bcrypt.hash("salasana123", saltRounds);

const initialUsers = [
    {
        username: "username1",
        name: "Jarkko Koski",
        passwordHash: hash("salasana123", saltRounds)
    }
];

const usersInDB = async() => {
    const users = await User.find({})
    return users.map(note => note.toJSON())
};


module.exports = {initialUsers, usersInDB};