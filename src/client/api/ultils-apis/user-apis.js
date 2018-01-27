import {api} from "../api";

const userApis={
    saveUser:(info)=>{
        return api.post("/api/user/save",info)
    }
};

export {userApis};