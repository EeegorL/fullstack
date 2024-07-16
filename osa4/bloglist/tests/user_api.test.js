const bcrypt = require("bcrypt");
const User = require("../models/MUser");

const {test, after, describe, beforeEach} = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");

const {initialUsers, usersInDB, randomPassword} = require("../utils/users_helper");
const bodyParser = require("body-parser");

const supertest = require("supertest");
const app = require("../app");
const { initial } = require("lodash");
const api = supertest(app);

const sRounds = 10;

app.use(bodyParser.urlencoded({
    extended: true
}));

describe("db having initial users,", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        for(let data of initialUsers) {
            data.password = await bcrypt.hash(data.password, sRounds); // should not be on the client side, but since these are tests its acceptable

            let newUser = new User(data);
            newUser.id = newUser._id.toString();
            await newUser.save();
        }
    });

    describe("when fetching all,", () => {
        test("all are returned", async () => {
            await api.get("/api/users")
            .expect(200);

            const all = (await api.get("/api/users")).body;

            assert.strictEqual(all.length, initialUsers.length);
        });
    });

    describe("when fetching one,", () => {
        test("using correct id fetches a user", async () => {
            const users = (await api.get("/api/users")).body;
            const user = users[0];

            const result = (await api.get("/api/users/" + user.id)).body;
            
            assert.deepEqual(result[0].username, initialUsers[0].username);
            assert.deepEqual(result[0].name, initialUsers[0].name);
        });

        test("using incorrect id throws 404 Not found", async () => {
            await api.get("/api/users/" + "invalidId")
            .expect(404);
        });
    });

    describe("when creating a user,", () => {
        test("a user with valid data is successfully created with 201 Created", async () => {
            const validData = {
                username: "MegaGamer453",
                name: "Akseli Holopainen",
                password: "meitsinSalasana"
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

        test("creation of a user with already existing username fails with 409 Conflict", async () => {
            const alreadyExistingUser = {
                username: "username1",
                name: "Jarkko Koski",
                password: "salasana123"
            }

            await api.post("/api/users/")
            .send(alreadyExistingUser)
            .expect(409);
        });
    });

    after(async() => {
        await mongoose.connection.close()
    });
});