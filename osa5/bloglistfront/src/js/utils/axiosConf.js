import axios from "axios";

const axiosClient = () => {
    return axios.create({
        baseURL: "http://localhost:3001/api"
    });
};

export default axiosClient;