import { useState } from "react";
import { addOne, getAll } from "../services/BlogService";
import showMsg from "../utils/info";

const AddBlogForm = ({ user, setBlogs }) => {
    const [successMsg, setSuccessMsg] = useState("");
    const [blogFormError, setBlogFormError] = useState("");

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");


    const showSuccessMessage = () => {
        setSuccessMsg("Blog added!");
        setTimeout(() => setSuccessMsg(""), 2000);
    };

    const addBlog = async (e) => {
        e.preventDefault();
        try {
            const blogCreator = user.token;

            const result = await addOne({
                user: blogCreator,
                title: title,
                author: author,
                url: url
            });

            if (result.success) {
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

    const toggleFormVisibilityAndClean = (e) => {
        e.preventDefault();

        const form = document.getElementById("addBlogForm");
        const toggleButton = document.getElementById("addBlogFormToggleButton");

        form.classList.contains("noDisplay")
        ? form.classList.remove("noDisplay")
        : form.classList.add("noDisplay");

        toggleButton.classList.contains("noDisplay")
        ? toggleButton.classList.remove("noDisplay")
        : toggleButton.classList.add("noDisplay");

        setTitle("");
        setAuthor("");
        setUrl("");

        for(let input of form.children.namedItem("inputsDiv").children) {
            input.children[0].value = "";
        }
    };

    return <div>
        <button onClick={toggleFormVisibilityAndClean} id="addBlogFormToggleButton">Add new blog?</button>
        <form onSubmit={addBlog} className="addBlogForm noDisplay" id="addBlogForm">
            <hr/>
            <h2>Add a new blog</h2>
            <p className="errMsg">{blogFormError}</p>
            <p className="successMsg">{successMsg}</p>
            <div name="inputsDiv">
                <span>Title <input onChange={e => setTitle(e.target.value)}/></span>
                <span>Author <input onChange={e => setAuthor(e.target.value)}/></span>
                <span> URL <input onChange={e => setUrl(e.target.value)}/></span>
            </div>
            <button type="submit">Submit</button>
            <button onClick={toggleFormVisibilityAndClean}>Cancel</button>
            <hr/>
        </form>
    </div>
}

export default AddBlogForm;