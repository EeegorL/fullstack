import { useState } from "react";
import { addOne, getAll } from "../services/BlogService";
import showMsg from "../utils/info";
import AllBlogs from "./AllBlogs";

const AddBlogForm = ({ user, setBlogs }) => {
    const [successMsg, setSuccessMsg] = useState("");
    const [blogFormError, setBlogFormError] = useState("");

    const showSuccessMessage = () => {
        setSuccessMsg("Blog added!");
        setTimeout(()=>setSuccessMsg(""), 2000);
    };

    const addBlog = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;

            const title = form.elements.title;
            const author = form.elements.author;
            const url = form.elements.url;
            const blogCreator = user.token;

            const result = await addOne({
                user: blogCreator,
                title: title.value,
                author: author.value,
                url: url.value
            });

            if(result.success) {
                setBlogs(await getAll());
                showSuccessMessage();
            }
            else {
                showMsg(result.message, setBlogFormError, 2);
            }
        }
        catch (err) {
            showMsg(err.message, setBlogFormError, 2);
        }

    }
    return <form onSubmit={addBlog} className="addBlogForm">
        <hr />
        <h2>Add a new blog</h2>
        <p className="errMsg">{blogFormError}</p>
        <p className="successMsg">{successMsg}</p>
        <div>
            <span>Title <input name="title" /></span>
            <span>Author <input name="author" /></span>
            <span> URL <input name="url" /></span>
        </div>
        <button type="submit">Submit</button>
    </form>
}

export default AddBlogForm;