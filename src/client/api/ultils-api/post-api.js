import {api} from "../api";

//TODO: change name
export const postApi = {
    uploadPost:(data)=>{
        console.log(data);
        return api.postMultipart("/api/upload/post",data)
    },
    savePost:(data)=>{
        return api.post("/api/save/post",data);
    },
    getPost:()=>{
        return api.get("/api/get/posts")
    }
};

