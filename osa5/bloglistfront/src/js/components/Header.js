import LoginModal from "./LoginModal";

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
        <h1 className="headerH1">Header</h1>
        <div className="headerSideButtons">
        {user
            ? <span>
                <span>{user.username}</span>
                <button onClick={signOut}>Sign out</button>
            </span>
            : <button onClick={showLogin}>Login</button>
        }
        <LoginModal setUser={setUser} className="loginFormShowButton"/>
        </div>
    </header>
};

export default Header;