import axiosClient from "../utils/axiosConf";
const client = axiosClient();

export async function getAll() {
    let currentToken = JSON.parse(window.localStorage.loggedUser).token;

    const result = await client.get("/blogs", 
        {headers: {"Authorization": `Bearer ${currentToken}`}}
    );
    return result.data;
};

export async function getOneById(id) {
    try {
        let currentToken = JSON.parse(window.localStorage.loggedUser).token;

        const result = await client.get("/blogs/" + id, 
            {headers: {"Authorization": `Bearer ${currentToken}`}}
        );
        return result;
    }
    catch(err) {
        return err;
    }

}

export async function deleteOne(id) {
    try {
        let currentToken = JSON.parse(window.localStorage.loggedUser).token;

        const result = await client.delete("/blogs/" + id, 
            {headers: {"Authorization": `Bearer ${currentToken}`}}
        );
        return result;
    }
    catch(err) {
        return err;
    }
}

export async function addOne(body) {
    try {
        let currentToken = JSON.parse(window.localStorage.loggedUser).token;

        const result = await client.post("/blogs/", body, 
            {headers: {"Authorization": `Bearer ${currentToken}`}}
        );
        return {success: true, message: "Blog added!"};
    }
    catch(err) {
        return {success: false, message: "Invalid blog data"};
        // return {success: false, message: err};
    }
}

