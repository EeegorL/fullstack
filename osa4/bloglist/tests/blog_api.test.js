const {test, after, describe, beforeEach} = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/MBlog");

const initialBlogs = [
    {
        "title":"1st blog",
        "author":"skibby",
        "url":null,
        "likes":565435
    },
    {
        "title":"2nd blog",
        "author":"me",
        "url":null,
        "likes":34
    },
    {
        "title":"3rd blog",
        "author":"you",
        "url":null,
        "likes":0
    },
    {
        "title":"nth blog",
        "author":"someone idk",
        "url":null,
        "likes":500
    }
];

const api = supertest(app);
describe("backend testing", () => {
    beforeEach(async() => {
        await Blog.deleteMany({});
        let newBlog = new Blog(initialBlogs[0]);
        await newBlog.save();
        newBlog = new Blog(initialBlogs[1]);
        await newBlog.save();
        newBlog = new Blog(initialBlogs[2]);
        await newBlog.save();
        newBlog = new Blog(initialBlogs[3]);
        await newBlog.save();

        // initialBlogs.map(async blog => {
        //     let newBlog = new Blog(blog);
        //     await newBlog.save();
        // });
    });

    test("fetching returns value of the same length as initial data", async() => {
        const resp = await api.get("/api/blogs");
        assert.strictEqual(resp._body.length, initialBlogs.length);
    });

    test("blogs are returned as json", async() => {
        await api.get("/api/blogs/getAll")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("added blogs have id instead of _id", async() => {
        const newBlog = new Blog({
            title: "The century of Rizz",
            author: "Rizz-king",
            url: "null",
            likes: 22
        });
        newBlog.save();

        const addedBlog = (await api.get("/api/blogs")).body[initialBlogs.length];

        assert(Object.hasOwn(addedBlog, "id") && !Object.hasOwn(addedBlog, "_id") ); //object has id and does not have _id
    });

    test("adding a blog grows 'blogs' by one and blogs contain the added content", async() => {
        const newBlog = new Blog({
            title: "The century of Rizz",
            author: "Rizz-king",
            url: "null",
            likes: 22
        });
        newBlog.save();
        
        const blogs = await api.get("/api/blogs");

        assert(blogs.body.some(i => i.title == newBlog.get("title") && i.author == newBlog.get("author"))); //blogs contain a blog with title and author of a just added blog
        assert.equal(blogs.body.length, initialBlogs.length + 1); // amount grows by one
    });

    after(async() => {
        await mongoose.connection.close()
    });
});