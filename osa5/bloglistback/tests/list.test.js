const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
];

const listWithManyBlogs = [
      // https://raw.githubusercontent.com/fullstack-hy2020/misc/master/blogs_for_test.md
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422abcdb54a676234d17f7",
        title: "React vs Vue",
        author: "Michael Chan",
        url: "https://reactsaladmmmyummy.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422absdf54a676234d17f7",
        title: "React vs Vue",
        author: "Michael Chan",
        url: "https://reactsaladmmmyummy.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      }
];

const listWithNoBlogs = [

];

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
    test("when list has only one blog equals the likes of that", () => {
      const result = listHelper.totalLikes(listWithOneBlog);
      assert.strictEqual(result, 5);
    });
    test("when list has many blogs equals the sum of all blogs' likes", () => {
        const result = listHelper.totalLikes(listWithManyBlogs);
        assert.strictEqual(result, 48);
      });
});

describe("favorite blog", () => {
    test("from list of many returns correct", () => {
        const trueMostLiked = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        };
        const mostLiked = listHelper.favoriteBlog(listWithManyBlogs);
        assert.deepStrictEqual(trueMostLiked, mostLiked);
    });
    test("from list of one returns correct", () => {
        const trueMostLiked = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
          };
        const mostLiked = listHelper.favoriteBlog(listWithOneBlog);
        assert.deepStrictEqual(trueMostLiked, mostLiked);
    });
    test("from list of none returns null", () => {
        const trueMostLiked = null;
        const mostLiked = listHelper.favoriteBlog(listWithNoBlogs);
        assert.deepStrictEqual(trueMostLiked, mostLiked);
    });
});

describe("author with most blogs from", () => {
  test("a list of many", () => {
    const mostBlogs = listHelper.mostBlogs(listWithManyBlogs);
    const authorWithMostBlogs = {
      author: "Michael Chan", blogs: 3
    };
    assert.deepStrictEqual(mostBlogs, authorWithMostBlogs);
  });
  test("a list of one", () => {
    const mostBlogs = listHelper.mostBlogs(listWithOneBlog);
    const authorWithMostBlogs = {
      author: "Edsger W. Dijkstra", blogs: 1
    };
    assert.deepStrictEqual(mostBlogs, authorWithMostBlogs);
  });
  test("a list of none", () => {
    const mostBlogs = listHelper.mostBlogs(listWithNoBlogs);
    const authorWithMostBlogs = null;
    assert.deepStrictEqual(mostBlogs, authorWithMostBlogs);
  });
});

describe("author with most likes from" , () => {
  test("a list of many" ,() => {
    const mostBlogs = listHelper.mostLikes(listWithManyBlogs);
    const authorWithMostLikes = { author: 'Michael Chan', likes: 21 };
    assert.deepStrictEqual(mostBlogs, authorWithMostLikes);
  });
  test("a list of one", () => {
    const mostBlogs = listHelper.mostLikes(listWithOneBlog);
    const authorWithMostLikes = { author: 'Edsger W. Dijkstra', likes: 5 };
    assert.deepStrictEqual(mostBlogs, authorWithMostLikes);
  });
  test("a list of none", () => {
    const mostBlogs = listHelper.mostLikes(listWithNoBlogs);
    const authorWithMostLikes = { author: null, likes: 0 };
    assert.deepStrictEqual(mostBlogs, authorWithMostLikes);
  });
});