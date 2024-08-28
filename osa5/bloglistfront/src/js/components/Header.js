import Login from "./Login";

const Header = ({ user, setUser }) => {

    const showLogin = () => {
        const form = document.getElementById("loginForm");

        form.classList.contains("hidden")
            ? form.classList.remove("hidden")
            : form.classList.add("hidden");
    };

    const signOut = () => {
        window.localStorage.clear();
        setUser();
    };

    return <header className="header">
        <div>Header</div>
        <div className="headerSideButtons">
        {window.localStorage.loggedUser
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={showLogin}>Login</button>
        }
        <Login setUser={setUser} className="loginFormShowButton"/>
        </div>
    </header>
};

export default Header;