const AllBlogs = ({blogs}) => {
    return <div>
        <h1>Rizz kuningas on täällä!</h1>
        <h2>All blogs:</h2>
        {blogs.map(blog => {
            return <div key={blog.id.slice(0,10)}>{blog.title}, {blog.author}</div>
        })}
    </div>
}

export default AllBlogs;