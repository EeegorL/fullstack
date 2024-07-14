const bcrypt = require("bcrypt");
const User = require("../models/MUser");

const {test, after, describe, beforeEach} = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");

const {initialUsers, usersInDB} = require("../utils/users_helper");
const bodyParser = require("body-parser");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const sRounds = 10;

app.use(bodyParser.urlencoded({
    extended: true
}));

describe("db having initial users,", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        for(let data of initialBlogs) {
            let newUser = new User(data);
            newUser.id = newUser._id.toString();
            await newUser.save();
        }
        console.log(await usersInDB())
    });

    describe("when creating a user,", () => {
        test("a user with valid data is successfully created", async () => {
            const newUser = new User({
                username: "Jormaaaa",
                name: "Jorma Saarinen",
                passwordHash: bcrypt.hash("JormaOnKuningas", sRounds)
            });

            assert(newUser.username == "Jormaaaa")
        });
    })
});