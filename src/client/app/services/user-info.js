import {userApi} from "../../api/ultils-api/user-api";

let userInfo=()=>{
  let info=localStorage.getItem("userInfo");
  return info ? JSON.parse(info) : null;
};

let userServices={
    getInfo:()=>userInfo(),
    loginByFB:(user)=>{
        console.log(user);
        return new Promise((res,rej)=>{
            return userApi.loginFBUser(user).then(({token})=>{
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
        console.log(user);
        return new Promise((res,rej)=>{
            return userApi.loginRegUser(user).then((data)=>{
                if(data.hasOwnProperty("msg")){
                    console.log("das");
                    res(data.msg);
                }else{
                    localStorage.setItem("userInfo",JSON.stringify(user));
                    localStorage.setItem("userToken",data.token);
                    res();
                }

            }).catch((err)=>{
                rej();
            })
        });
    },
    saveUser:(user)=>{
        return new Promise((res,rej)=>{
            return userApi.saveUser(user).then(()=>{
                res();
            }).catch((err)=>{
                rej();
            })
        });
    }
};

export {userServices};