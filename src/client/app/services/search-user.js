// import {userApi} from "../../api/ultils-api/user-api";
// import {userServices} from "./user-info";
//
// let searchResult=[];
//
//
// //
// export const searchUser={
//     queryUser:(val)=> new Promise((res,rej)=>{
//         userApi.getAllUser().then((data)=>{
//             setTimeout(() => {
//
//                 let resArr=data.map((user,i)=>{
//                     let check=user.name.toLowerCase().indexOf(val.toLowerCase());
//                     if(check!==-1)
//                         return {str:user,range:[check,check+val.length-1]};
//                 });
//                 res(resArr.filter((user)=>!!user))
//             }, 200)
//         });
//     })
// };
