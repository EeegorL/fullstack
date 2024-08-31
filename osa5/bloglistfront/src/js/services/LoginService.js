import axiosClient from "../utils/axiosConf";

const client = axiosClient();

export async function verifySession (data) {
    try {
        const user = JSON.parse(data);
        const verification = await client.post("/login/verify", {token: user.token}, {headers: {"Authorization": `Bearer ${window.localStorage.loggedUser}`}});
        return verification;
    }
    catch(err) {
        return false;
    }
}

export async function login ({username, password}) {
    const login = await client.post("/login", {username, password});
    return login;

}