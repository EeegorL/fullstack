const bcrypt = require("bcrypt");
const User = require("../models/MUser");

const {test, after, describe, beforeEach} = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");

const {initialUsers, usersInDB, randomPassword} = require("../utils/users_helper");
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

        for(let data of initialUsers) {
            data.passwordHash = await bcrypt.hash(data.passwordHash, sRounds); // should not be on the client side, but since these are tests its acceptable

            let newUser = new User(data);
            newUser.id = newUser._id.toString();
            await newUser.save();
        }
    });

    describe("when creating a user,", () => {
        test("a user with valid data is successfully created with 201 Created", async () => {
            const validData = {
                username: "MegaGamer453",
                name: "Akseli Holopainen",
                passwordHash: "meitsinSalasana"
            }

            await api.post("/api/users/")
            .send(validData)
            .expect(201)

            const users = (await api.get("/api/users/")).body;
            assert.strictEqual(users.length, initialUsers.length + 1);
        });

        test("creation of a user with invalid data fails with 400 Bad Request", async () => {
            const invalidData = {
                name: "Akseli Holopainen",
            }

            await api.post("/api/users/")
            .send(invalidData)
            .expect(400);

            const users = (await api.get("/api/users/")).body;
            assert.strictEqual(users.length, initialUsers.length);
        });
    });

    after(async() => {
        await mongoose.connection.close()
    });
});