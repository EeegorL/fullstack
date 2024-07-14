const Blog = require("../models/MBlog");

const initialBlogs = [
    {
        "title":"1st blog",
        "author":"skibby",
        "url":"posfkgoskdog",
        "likes":565435
    },
    {
        "title":"2nd blog",
        "author":"me",
        "url":"osjgospeårlpåglerh",
        "likes":34
    },
    {
        "title":"3rd blog",
        "author":"you",
        "url":"spgey5ojt",
        "likes":0
    },
    {
        "title":"nth blog",
        "author":"someone idk",
        "url":"hpfjpo6o0+",
        "likes":500
    }
];

const blogsInDB = async() => { // I want to refrain from using this to make such tests as if they are called by the client, thus api.get(...) instead of Blog.find({})
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
};


module.exports = {initialBlogs, blogsInDB};