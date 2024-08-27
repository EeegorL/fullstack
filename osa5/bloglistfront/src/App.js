import { useEffect, useState } from "react";
import "./index.css";
import Footer from "./js/components/Footer";
import Header from "./js/components/Header";
import Main from "./js/components/Main";
import BlogService from "./js/services/BlogService";

function App() {
  const [blogs, setBlogs] = useState([]);
  const blogService = new BlogService();


  useEffect(() => {
    const init = async()=> {
      const result = await blogService.getAll();
      setBlogs(result);

    };
    init();
  }, []);

  return (
    <div>
      <Header/>
      <Main blogs={blogs}/>
      <Footer/>
    </div>
  );
}

export default App;
