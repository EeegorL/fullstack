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

const blogsInDB = async() => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
};

const emptyId = async() => {
    const tempBlog = new Blog({
        "title":"temptemptemp",
        "author":"temptemptemp",
        "url":"temptemptemp",
        "likes":123123123
    });
    await tempBlog.save();
    await tempBlog.deleteOne();

    return tempBlog.get("id");
}


module.exports = {initialBlogs, blogsInDB, emptyId};