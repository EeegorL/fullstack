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

const blogsInDB = async() => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
};

const emptyId = async() => { //DOES NOT WORK
    const tempBlog = new Blog({
        "title":"temptemptemp",
        "author":"temptemptemp",
        "url":"temptemptemp",
        "likes":123123123
    });
    await tempBlog.save();
    await tempBlog.deleteOne(); // DOES NOT DELETE :(((

    return tempBlog._id.toString();
}


module.exports = {initialBlogs, blogsInDB, emptyId};