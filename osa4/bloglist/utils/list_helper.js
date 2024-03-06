const dummy = (blogs) => {
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

module.exports = {
    dummy, totalLikes, favoriteBlog
};