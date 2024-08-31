import { useState } from "react";
import showMsg from "../utils/info";
import * as LoginService from "../services/LoginService";

const Login = ({setUser}) => { //not really a modal but idk this will do
    const [err, setErr] = useState("");

    const login = async(e) => {
        e.preventDefault();
        try {
            const usernameField = e.target.elements.username;
            const passwordField = e.target.elements.password;

            const username = usernameField.value;
            const password = passwordField.value;

            const login = await LoginService.login({username, password});
            if(login) {
                window.localStorage.setItem("loggedUser", JSON.stringify(login.data));
                setUser(login.data);
            }
            usernameField.value = "";
            passwordField.value = "";
        }
        catch(err) {
            showMsg(err.response.data.err, setErr, 2);
        }
    };

    return <div className="loginMain">
        <h2>Sign in</h2>
        <p>Kalle : Kulle</p>
        <p>Testimies : salasana</p>
        <p name="errorField" className="errMsg">{err}</p>
        <form onSubmit={login} id="loginForm">
        <label>Username<input name="username"/></label>
        <br/>
        <label>Password<input name="password"/></label>
        <br/>
        <button>Login</button>
        </form>
        </div>
};

export default Login;