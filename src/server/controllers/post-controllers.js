const _ = require("lodash");
const multiparty = require('multiparty');
const fs = require('fs');
const jwtAuth = require("../authorization/jwt-auth");

// const verifyToken=(req)=>{
//     let token=req.token;
//     return jwtAuth.verifyToken(token);
// };

module.exports = (app, db,io,socket) => {

    app.post("/api/upload/post", (req, res) => {

        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            let currentTime = new Date();
            currentTime = currentTime.getTime();
            let {path: tempPath, originalFilename} = files.imageFile[0];
            let copyToPath = __dirname + "/../../../public/image/uploads/" + currentTime + "_" + originalFilename;

            fs.readFile(tempPath, (err, data) => {

                fs.writeFile(copyToPath, data, (err) => {
                    res.json({fileName: "./image/uploads/"+currentTime + "_" + originalFilename});
                });
            });

        })

    });
    app.get("/api/get/posts", jwtAuth.parseToken ,async (req, res) => {
        let data=await req.getData;
        let getPost;
        if (data.hasOwnProperty("id")){
            console.log("fb user");
            let {id} = data;
            getPost=`
                     
                    SELECT content, imgURL, p.time, p.name, p.avatarURL
                    FROM posts p 
                    LEFT JOIN imgpost img on (p.time = img.time)
                    WHERE p.userID='${id}' 
                    or p.userID in (SELECT userID from followers where followerID ='${id}') 
                    or p.email in (SELECT email from followers where followerID ='${id}') 
                    `;
        }else{
            console.log("reg user");
            let {email}=data;
            getPost=`
                        
                    SELECT content, imgURL, p.time, p.name, p.avatarURL
                    FROM posts p 
                    LEFT JOIN imgpost img on (p.time = img.time)
                    WHERE p.email='${email}' 
                    or p.userID in (SELECT userID from followers where followerEmail ='${email}') 
                    or p.email in (SELECT email from followers where followerEmail ='${email}')
                  
                    `;
        }
        db.query(getPost,(err,result)=>{
            if(err) throw err;

            let newResult=[],imgList=[];
            for(let i =0;i<result.length;i++){
                let {time,content,name,avatarURL}=result[i];
                imgList=result.filter((r)=>{
                    return time===r.time;
                }).map((r)=>r.imgURL);
                i+=imgList.length-1;
                if(imgList[0]===null)
                    imgList=null;
                newResult.push({time,content,imgList,name,avatarURL:avatarURL==="null" ? null : avatarURL});
            }

            res.json(newResult);
        });

    });

    app.get("/api/post/like",(req,res)=>{
       let {userID,userEmail,key}=req.query;
       console.log(req.query);
       let check;
       if(userID){
            check=`SELECT id from postuser WHERE userID='${userID}' AND time='${key}'`;
       }else{
            check=`SELECT id from postuser WHERE email='${userEmail}' AND time='${key}'`;
       }
       db.query(check,(err,result)=>{
          if(err) throw err;
          res.json(result);
       });
    });

    app.post("/api/save/post", jwtAuth.parseToken, async (req, res) => {
        let {imgList, content,name,avatarURL,time} = req.body;
        let data = await req.getData;
        let saveArticle;
        // let saveImg=`INSERT INTO imgpost (time,imgURL) values ('${time}','')`;
        if (data.hasOwnProperty("id")) {
            let {id} = data;
            saveArticle = `INSERT INTO posts (userID,content,time,name,avatarURL) values ('${id}','${content}','${time}','${name}','${avatarURL}')`;

        } else {
            let {email} = data;
            saveArticle = `INSERT INTO posts (email,content,time,name,avatarURL) values ('${email}','${content}','${time}','${name}','${avatarURL}')`;
        }
        const insertImg = (imgURL, time) => new Promise((resolve, reject) => {
            let saveImg = `INSERT INTO imgpost (time,imgURL) values ('${time}','${imgURL}')`;
            db.query(saveImg, (err) => {
                if (err) reject(err);
                resolve();
            })
        });
        db.query(saveArticle, (err) => {
            if (err) throw err;
            let promise = [];
            for (let i = 0; i < imgList.length; i++) {
                let name = JSON.parse(imgList[i]).fileName;
                promise.push(insertImg(name, time));
            }
            Promise.all(promise).then(() => {
                res.end();
            });
        })


    });

};