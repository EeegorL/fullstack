import AllBlogs from "./AllBlogs";

const Main = ({blogs, setBlogs, user}) => { 
    return <div className="main">
        <AllBlogs blogs={blogs} setBlogs={setBlogs} user={user}/>
        </div>
};

export default Main;