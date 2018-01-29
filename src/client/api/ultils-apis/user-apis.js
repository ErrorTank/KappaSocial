import {api} from "../api";

const userApis={
    saveFBUser:(info)=>{
        return api.post("/api/user/fb/save",info)
    },
    saveUser:(info)=>{
        console.log(info);
        return api.post("/api/user/reg/save",info)
    }
};

export {userApis};