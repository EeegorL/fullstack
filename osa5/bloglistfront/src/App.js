import { useEffect, useState } from "react";
import "./index.css";
import Footer from "./js/components/Footer";
import Header from "./js/components/Header";
import Main from "./js/components/Main";

import * as BlogService from "./js/services/BlogService";
import * as LoginService from "./js/services/LoginService";
import Login from "./js/components/Login";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();



  useEffect(() => {
    const init = async()=> {
      //set blogs
      const result = await BlogService.getAll();
      setBlogs(result);

      //set logged user
      if(window.localStorage.loggedUser) {
        if(await LoginService.verifySession(window.localStorage.loggedUser)) {
          setUser(JSON.parse(window.localStorage.loggedUser));
        }
        else {
          window.localStorage.clear();
        }
      }
    };init();

  }, [window.localStorage.loggedUser]);
  return (
    <div>
      <Header user={user} setUser={setUser}/>
      {user
      ? <Main blogs={blogs} setBlogs={setBlogs} user={user}/>
      : <Login setUser={setUser}/>
    }
      <Footer/>
    </div>
  );
}

export default App;
