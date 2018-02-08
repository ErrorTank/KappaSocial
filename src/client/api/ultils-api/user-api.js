import {api} from "../api";

//TODO: change name
export const userApi = {
    loginFBUser: (info) => {
        return api.post("/api/user/fb/login", info)
    },
    saveUser: (info) => {
        return api.post("/api/user/reg/save", info)
    },
    authorizeUser: () => api.get("/api/auth/user"),
    loginRegUser: (info) => {
        return api.post("/api/user/reg/login", info)
    },
    getAllUser:()=>{
        return api.get(`/api/user/all`)
    },
    searchUser: (keyword,key) => {
        return api.get(`/api/user/all?keyword=${keyword}&key=${key}`)
    },
    followUser:(guess,me)=>{
        return api.post("/api/user/follow",{guess,me})
    }
};

