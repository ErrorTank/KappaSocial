import io from "socket.io-client";
import {api} from "./api";

let socket=null;
const clientSocket={
    connect:()=> new Promise((res,rej)=>{
        socket=io(`http://localhost:2000`);
        res(socket);
    }),
    getSocket:()=>socket,
    getSocketID:()=>{
        if(!socket.hasOwnProperty("id")){
            api.get("/api/socket/id").then((sID)=>{
               socket.id=sID;
               return socket.id;
            });
        }else{
            return socket.id;
        }

    }
};

export {clientSocket};