import {userApis} from "../api/ultils-apis/user-apis";

let userInfo=()=>{
  let info=localStorage.getItem("userInfo");
  return info ? JSON.parse(info) : null;
};

let userServices={
    getInfo:()=>userInfo(),
    loginByFB:(user)=>{
        return new Promise((res,rej)=>{
            return userApis.saveFBUser(user).then(({token})=>{
                console.log(token);
                localStorage.setItem("userInfo",JSON.stringify(user));
                localStorage.setItem("userToken",token);
                res();
            }).catch((err)=>{
                console.log(err);
                rej();
            })
        });
    },
    regularLogin:(user)=>{
        return new Promise((res,rej)=>{
            return userApis.saveUser(user).then(({token})=>{
                console.log(token);
                localStorage.setItem("userInfo",JSON.stringify(user));
                localStorage.setItem("userToken",token);
                res();
            }).catch((err)=>{
                rej();
            })
        });
    }
};

export {userServices};