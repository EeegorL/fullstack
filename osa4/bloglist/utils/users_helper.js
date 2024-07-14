const User = require("../models/MUser");
const bcrypt = require("bcrypt");

const initialUsers = [
    {
        username: "nameuser123",
        name: "Karkko Joski",
        passwordHash: "sasalana321"
    },
    {
        username: "username1",
        name: "Jarkko Koski",
        passwordHash: "salasana123"
    }
]

const randomPassword = () => {
    const testSymbols = ["fish","dog","cat","car","elephant","fox","window","vase","mouse","1","2","3","4","5","6","7","8","9"]; // I know there's a better way but this will work for now
    let password = "";
    const passwordLength = Math.floor(Math.random() * (10 - 5 + 1) + 5); // password with length of 10-20 symbols

    for(let i = 0; i <= passwordLength; i++) {
        password += testSymbols[Math.floor(Math.random() * testSymbols.length)]
    }
    return password;
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(note => note.toJSON())
};


module.exports = { initialUsers, usersInDB, randomPassword };