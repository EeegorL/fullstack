import { useState } from "react";
import axiosClient from "../utils/axiosConf";
import showMsg from "../utils/info";

const client = axiosClient();
const Login = ({setUser}) => { 
    const [err, setErr] = useState("");

    const login = async(e) => {
        e.preventDefault();
        try {
            const username = e.target.elements.username.value;
            const password = e.target.elements.password.value;
    
            const login = await client.post("/login", {username, password});
            if(login) {
                window.localStorage.setItem("loggedUser", JSON.stringify(login.data));
                setUser(login.data);

                const form = document.getElementById("loginForm");

                form.classList.contains("hidden")
                    ? form.classList.remove("hidden")
                    : form.classList.add("hidden");
            }
        }
        catch(err) {
            showMsg(err.response.data.err, setErr, 2);
        }
    };

    return <div className="login">
        <p name="errorField" className="errMsg">{err}</p>
        <form onSubmit={login} id="loginForm" className="hidden">
        <label>Username<input name="username"/></label>
        <br/>
        <label>Password<input name="password"/></label>
        <br/>
        <button>Login</button>
        </form>
        </div>
};

export default Login;