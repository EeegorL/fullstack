import axiosClient from "../utils/axiosConf";
const client = axiosClient();

export async function getAll() {

    const result = await client.get("/blogs");
    return result.data;
};

