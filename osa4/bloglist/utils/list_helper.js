const _ = require("lodash");

const dummy = () => {
    return 1;
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    else {
        let likesSum = 0;
        for (let blog of blogs) {
            likesSum += blog.likes;
        };
        return likesSum;
    };
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    else {
        let mostLikes = 0;
        let favoriteBlog = null;
        for (let blog of blogs) {
            if (blog.likes > mostLikes) {
                mostLikes = blog.likes;
                favoriteBlog = blog;
            }
        }
        return {
            title: favoriteBlog.title,
            author: favoriteBlog.author,
            likes: favoriteBlog.likes,
            url: favoriteBlog.url
        };
    }
};

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.map(blogs, "author");
    if(blogsByAuthor.length === 0) return null;
    else {
        const authorsAndCounts = _.chain(blogsByAuthor).countBy().toPairs().maxBy(_.last);
        //creates method chain -> counts each occurrence -> pairs authors' names with amounts of occurrences -> takes one with most occurrences by last piece of array (occurrences)
        return {author: authorsAndCounts.value()[0], blogs: authorsAndCounts.value()[1]};
    };
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
};