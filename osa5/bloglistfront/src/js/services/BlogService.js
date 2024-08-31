import axiosClient from "../utils/axiosConf";
const client = axiosClient();

export async function getAll() {
    const result = await client.get("/blogs", 
        {headers: {"Authorization": `Bearer ${window.localStorage.loggedUser}`}}
    );
    return result.data;
};

export async function getOneById(id) {
    try {
        const result = await client.get("/blogs/" + id, 
            {headers: {"Authorization": `Bearer ${window.localStorage.loggedUser}`}}
        );
        return result;
    }
    catch(err) {
        return err;
    }

}

export async function deleteOne(id) {
    try {
        const result = await client.delete("/blogs/" + id, 
            {headers: {"Authorization": `Bearer ${window.localStorage.loggedUser}`}}
        );
        return result;
    }
    catch(err) {
        return err;
    }
}

export async function addOne(body) {
    try {
        const result = await client.post("/blogs/", body, 
            {headers: {"Authorization": `Bearer ${window.localStorage.loggedUser}`}}
        );
        return {success: true, message: "Blog added!"};
    }
    catch(err) {
        return {success: false, message: "Invalid blog data"};
        // return {success: false, message: err};
    }
}

