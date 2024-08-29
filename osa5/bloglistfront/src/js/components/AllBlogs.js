const AllBlogs = ({blogs, user}) => {
    const showDelete = (e) => {
        e.target.classList.remove("transparent");


    };
    const hideDelete = (e) => {
        e.target.classList.add("transparent");
    };

    return <div>
        <h1 className="headerMain">Rizz kuningas on täällä!</h1>
        <h2>All blogs:</h2>
        {blogs.map(blog => {
            return <div key={blog.id} className="blogListItemContainer">
                <span>{blog.title}, {blog.author}</span>
                {user.id === blog.user.id
                ? <button name="deleteButton" className="transparent" onMouseOver={showDelete} onMouseOut={hideDelete}>Delete blog</button>
                : <span></span>
                }
                
            </div>
        })}
    </div>
}

export default AllBlogs;