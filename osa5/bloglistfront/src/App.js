import { useEffect, useState } from "react";
import "./index.css";
import Footer from "./js/components/Footer";
import Header from "./js/components/Header";
import Main from "./js/components/Main";

import * as BlogService from "./js/services/BlogService";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});



  useEffect(() => {
    const init = async()=> {
      if(window.localStorage.loggedUser) setUser(JSON.parse(window.localStorage.loggedUser));
      const result = await BlogService.getAll();
      setBlogs(result);
    };init();

  }, []);

  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <Main blogs={blogs}/>
      <Footer/>
    </div>
  );
}

export default App;
