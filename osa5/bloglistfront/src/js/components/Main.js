import AddBlogForm from "./AddBlogForm";
import AllBlogs from "./AllBlogs";

const Main = ({blogs, setBlogs, user}) => { 
    return <div className="main">
        <AllBlogs blogs={blogs} user={user}/>
        <AddBlogForm user={user} setBlogs={setBlogs}/>
        </div>
};

export default Main;