const {test, after, describe, beforeEach} = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/MBlog");
const {initialBlogs, blogsInDB, emptyId} = require("../utils/blogs_helper");
const bodyParser = require("body-parser");

const api = supertest(app);
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  


describe("initial blogs having data", () => {
    beforeEach(async() => {
        await Blog.deleteMany({});

        for(let data of initialBlogs) {
            let newBlog = new Blog(data);
            newBlog.id = newBlog._id.toString(); //!!!!!!!
            await newBlog.save();
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

        test("data contains blog from the initial blogs", async() => {
            const blogs = (await api.get("/api/blogs")).body;

            const contains = i => 
                i.title == initialBlogs[2].title && 
                i.author == initialBlogs[2].author
            ;

            assert(blogs.some(contains));
        });
    });

    describe("when fetching one,", () => {
        test("a blog is successfully returned", async() => {
            const allBlogs = (await api.get("/api/blogs")).body;
            const blogToView = allBlogs[1];

            const blog = await api.get(`/api/blogs/${blogToView.id}`);
            delete blog.body.id; // id is created by mongoose from the _id, thus not saved in initialBlogs

            assert.deepStrictEqual(blog.body, initialBlogs[1]);
       });

       test("a blog with nonexistent id fails with 404 Not found", async() => {
        const id = await emptyId();
        await api.get("/api/blogs/" + id)
        .expect(404);
       });
    });

    describe("when adding one", () => { 
        test("added blogs have id instead of _id", async() => {
            const newBlog = {
                title: "The century of Rizz",
                author: "Rizz-king",
                url: "null",
                likes: 22
            };
            await api.post("/api/blogs/").send(newBlog);
            const addedBlog = (await api.get("/api/blogs")).body[initialBlogs.length];
            
            assert(Object.hasOwn(addedBlog, "id") && !Object.hasOwn(addedBlog, "_id") ); //object has id and does not have _id
        });
    
        test("adding a blog grows 'blogs' by one and blogs contain the added content", async() => {
            const newBlog = {
                title: "The century of Rizz",
                author: "Rizz-king",
                url: "null",
                likes: 22
            };
            await api.post("/api/blogs/").send(newBlog);
    
            const blogs = (await api.get("/api/blogs/")).body;
    
            assert(blogs.some(i => //has data from new blog
                i.title == newBlog.title && 
                i.author == newBlog.author
            ));
    
            assert.equal(blogs.length, initialBlogs.length + 1); // amount grows by one
        });

        test("blog without likes is put at 0 likes", async() => {
            const blogWithoutLikes = {
                title: "titletitle",
                author: "authorauthor",
                url: "https://url.url/url"
            };
            await api.post("/api/blogs/").send(blogWithoutLikes);

            const addedBlog = (await api.get("/api/blogs")).body[[initialBlogs.length]];
            assert(addedBlog.likes == 0);
        });
    });

    after(async() => {
        await mongoose.connection.close()
    });
});