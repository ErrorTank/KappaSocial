import {customHistory} from "../../app/main-routes";
import {userApi} from "../ultils-api/user-api";

export const privateLoader={
    init: () => new Promise((resolve) => {
        userApi.authorizeUser().then(()=>{
            console.log("success");
            resolve(() => {
                customHistory.push("/home")
            });
        },(()=>{
            console.log("fail");
            resolve(() => {
                customHistory.push("/login")
            });
        }));
    })
};
