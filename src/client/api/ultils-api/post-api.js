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
    },
    likePost:(data)=>api.post("/api/post/like",data),
    dislikePost:(data)=>api.post("/api/post/dislike",data),
    getLikeStatus:({userID,userEmail,postKey})=>api.get(`/api/post/like?userID=${userID}&userEmail=${userEmail}&key=${postKey}`)
};

