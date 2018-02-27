
import {userApi} from "../ultils-api/user-api";
import {customHistory} from "../../app/main-routes";
import {clientSocket} from "../client-socket";

export const privateLoader={
    init: () => new Promise((resolve) => {
        userApi.authorizeUser().then(()=>{
            console.log("success");
            resolve(() => {

                customHistory.push("/")
            });
        },(()=>{
            console.log("fail");
            resolve(() => {
                customHistory.push("/login")
            });
        }));
    })
};
