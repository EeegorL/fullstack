import { useState } from "react";
import axiosClient from "../utils/axiosConf";
import showMsg from "../utils/info";

const client = axiosClient();
const LoginModal = ({setUser}) => { //not really a modal but idk this will do
    const [err, setErr] = useState("");

    const login = async(e) => {
        e.preventDefault();
        try {
            const usernameField = e.target.elements.username;
            const passwordField = e.target.elements.password;

            const username = usernameField.value;
            const password = passwordField.value;

            const login = await client.post("/login", {username, password});
            if(login) {
                window.localStorage.setItem("loggedUser", JSON.stringify(login.data));
                setUser(login.data);

                const form = document.getElementById("loginForm");


                form.classList.contains("hidden")
                    ? form.classList.remove("hidden")
                    : form.classList.add("hidden");
            }
            usernameField.value = "";
            passwordField.value = "";
        }
        catch(err) {
            showMsg(err.response.data.err, setErr, 2);
        }
    };

    return <div className="login">
        <form onSubmit={login} id="loginForm" className="hidden">
        <h2>Sign in</h2>
        <p name="errorField" className="errMsg">{err}</p>
        <label>Username<input name="username"/></label>
        <br/>
        <label>Password<input name="password"/></label>
        <br/>
        <button>Login</button>
        </form>
        </div>
};

export default LoginModal;