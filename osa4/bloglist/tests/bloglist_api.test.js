const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/MBlog");
const User = require("../models/MUser");
const { initialBlogs } = require("../utils/blogs_helper");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const { initialUsers, usersInDB } = require("../utils/users_helper");
const sRounds = 10;

const api = supertest(app);
app.use(bodyParser.urlencoded({
    extended: true
}));


describe("initial blogs having data", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});

        for (let data of initialUsers) {
            data.password = await bcrypt.hash(data.password, sRounds); // should not be on the client side, but since these are tests its acceptable

            let newUser = new User(data);
            newUser.id = newUser._id.toString();
            await newUser.save();
        }
        let blogOrder = [0,0,1,1];
        let i = 0;
        const users = (await api.get("/api/users")).body;

        for (let data of initialBlogs) {
            let thisAuthor = users[blogOrder[i]];


            let newBlog = new Blog(data);
            newBlog.id = newBlog._id.toString();
            newBlog.user = thisAuthor.id;
            thisAuthor.blogs.push(newBlog._id.toString());

            await newBlog.save();
            i++;
        }
    });

    describe("when fetching all,", () => {
        test("all blogs are returned", async () => {
            const blogs = (await api.get("/api/blogs")).body;
            assert.strictEqual(blogs.length, initialBlogs.length);
        });

        test("blogs are returned as json", async () => {
            await api.get("/api/blogs")
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        test("data contains blog from the initial blogs", async () => {
            const blogs = (await api.get("/api/blogs")).body;

            const contains = i =>
                i.title == initialBlogs[2].title &&
                i.author == initialBlogs[2].author
                ;

            assert(blogs.some(contains));
        });
    });

    describe("when fetching one,", () => {
        test("a blog is successfully returned", async () => {
            const allBlogs = (await api.get("/api/blogs")).body;
            const blogToView = allBlogs[1];

            const blog = await api.get(`/api/blogs/${blogToView.id}`);
            delete blog.body.id; // id is created by mongoose from the _id, thus not saved in initialBlogs
            delete blog.body.user; //user is set in test initialization, and does not appear in initialBlogs

            assert.deepStrictEqual(blog.body, initialBlogs[1]);
        });

        test("a blog with nonexistent id fails with 404 Not found", async () => {
            await api.get("/api/blogs/thisIdDoesNotExist")
                .expect(404);
        });
    });

    describe("when adding one,", () => {
        test("added blogs have id instead of _id", async () => {
           const loginToken = (await api.post("/api/login/").send({username: "username1", password: "salasana123"})).body.token;
           const author = (await usersInDB())[0];

           const newBlog = {
                title: "The century of Rizz",
                author: "Rizz-king",
                url: "null",
                likes: 22,
                user: author.id
            };
            await api.post("/api/blogs/")
                .send(newBlog)
                .set("Authorization", `Bearer ${loginToken}`);

            const addedBlog = (await api.get("/api/blogs")).body[initialBlogs.length];
            assert(Object.hasOwn(addedBlog, "id") && !Object.hasOwn(addedBlog, "_id")); //object has id and does not have _id
        });

        test("adding a blog grows 'blogs' by one and blogs contain the added content", async () => {
            const loginToken = (await api.post("/api/login/").send({username: "username1", password: "salasana123"})).body.token;
            const author = (await usersInDB())[1];

            const newBlog = {
                title: "The century of Rizz",
                author: "Rizz-king",
                url: "null",
                likes: 22,
                user: author.id
            };

            await api.post("/api/blogs/")
            .send(newBlog)
            .set("Authorization", `Bearer ${loginToken}`);

            const blogs = (await api.get("/api/blogs/")).body;

            assert(blogs.some(i => //has data from new blog
                i.title == newBlog.title &&
                i.user == newBlog.user
            ));

            assert.equal(blogs.length, initialBlogs.length + 1); // amount grows by one
        });

        test("blog without likes is put at 0 likes", async () => {
            const loginToken = (await api.post("/api/login/").send({username: "username1", password: "salasana123"})).body.token;
            const author = (await usersInDB())[1];

            const blogWithoutLikes = {
                title: "titletitle",
                author: "authorauthor",
                url: "https://url.url/url",
                user: author.id
            };
            await api.post("/api/blogs/")
            .send(blogWithoutLikes)
            .set("Authorization", `Bearer ${loginToken}`);

            const allBlogs = (await api.get("/api/blogs/")).body;
            const addedBlog = allBlogs[allBlogs.length - 1];
            assert(addedBlog.likes == 0);
        });

        test("creating a blog adds its id to the authors blog list", async () => {
            const loginToken = (await api.post("/api/login/").send({username: "username1", password: "salasana123"})).body.token;
            const author = (await usersInDB())[1];
            
            const blogWithoutLikes = {
                title: "titletitle",
                author: "authorauthor",
                url: "https://url.url/url",
                likes: 0,
                user: author.id
            };
            await api.post("/api/blogs/")
            .send(blogWithoutLikes)
            .set("Authorization", `Bearer ${loginToken}`);

            const userWithAddedBlog = (await usersInDB())[1];

            assert(userWithAddedBlog.blogs.length > 0);
        });
    });

    describe("when deleting one,", () => {
        test("deletion with a valid id succeeds with 200", async () => {
            const allBlogs = (await api.get("/api/blogs/")).body;
            const blogToDelete = allBlogs[0];

            await api.delete("/api/blogs/" + blogToDelete.id)
                .expect(200);
        });

        test("deletion with an invalid id fails with 404", async () => {
            await api.delete("/api/blogs/anInvalidId123")
                .expect(404);
        });
    });

    describe("when patching a blog", () => {
        test("a blog is successfully patched", async () => {
            const newBlogData = {
                title: "New Title",
                likes: 10
            };
            const blogs = (await api.get("/api/blogs/")).body;
            const blogToPatch = blogs[0];

            await api.patch("/api/blogs/" + blogToPatch.id)
                .send(newBlogData)
                .expect(200);

            const patchedBlog = (await api.get("/api/blogs/" + blogToPatch.id)).body;

            assert.equal(patchedBlog.title, newBlogData.title);
            assert.equal(patchedBlog.likes, newBlogData.likes);
        });

        test("invalid patch data throws 400 Bad Request", async () => {
            const invalidBlogData = {
                title: 52,
                likes: "fifty two"
            };
            const blogs = (await api.get("/api/blogs/")).body;
            const blogToPatch = blogs[0];

            await api.patch("/api/blogs/" + blogToPatch.id)
                .send(invalidBlogData)
                .expect(400);
        });
    });

describe("db having initial users,", () => {

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
                    password: "meitsinSalasana",
                    likes: 10
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
    });

    after(async () => {
        await User.deleteMany({});
        await Blog.deleteMany({})
        await mongoose.connection.close()
    })
});