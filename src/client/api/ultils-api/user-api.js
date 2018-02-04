import {api} from "../api";

//TODO: change name
export const userApi = {
    loginFBUser: (info) => {
        return api.post("/api/user/fb/login", info)
    },
    saveUser: (info) => {
        console.log(info);
        return api.post("/api/user/reg/save", info)
    },
    authorizeUser: () => api.get("/api/auth/user"),
    loginRegUser: (info) => {
        return api.post("/api/user/reg/login", info)
    }
};

