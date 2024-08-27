import axios from "axios";

export default class BlogService {
    #path = "http://localhost:3001/api/blogs/";
    async getAll() {
        const result = await axios.get(this.#path);
        return result.data;
    }
};