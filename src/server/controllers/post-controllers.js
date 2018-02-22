const _ = require("lodash");
const multiparty = require('multiparty');
const fs = require('fs');
const jwtAuth = require("../authorization/jwt-auth");

// const verifyToken=(req)=>{
//     let token=req.token;
//     return jwtAuth.verifyToken(token);
// };

module.exports = (app, db) => {

    app.post("/api/upload/post", (req, res) => {

        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            let currentTime = new Date();
            currentTime = currentTime.getTime();
            let {path: tempPath, originalFilename} = files.imageFile[0];
            let copyToPath = __dirname + "/../../../public/image/uploads/" + currentTime + "_" + originalFilename;

            fs.readFile(tempPath, (err, data) => {

                fs.writeFile(copyToPath, data, (err) => {
                    res.json({fileName: currentTime + "_" + originalFilename});
                });
            });

        })

    });
    app.get("/api/get/posts", jwtAuth.parseToken ,async (req, res) => {
        let data=await req.getData;
        let getPost;
        console.log(data);
        if (data.hasOwnProperty("id")){
            console.log("fb user");
            let {id} = data;
            getPost=`SELECT content, imgURL, p.time
                    FROM posts p 
                    INNER JOIN imgpost img on p.time = img.time
                    WHERE p.userID='${id}' 
                    or p.userID in (SELECT userID from followers where followerID ='${id}') 
                    or p.email in (SELECT email from followers where followerID ='${id}') 
                    `;
        }else{
            console.log("reg user");
            let {email}=data;
            getPost=`SELECT content, imgURL, p.time
                    FROM posts p 
                    INNER JOIN imgpost img on p.time = img.time
                    WHERE p.email='${email}' 
                    or p.userID in (SELECT userID from followers where followerEmail ='${email}') 
                    or p.email in (SELECT email from followers where followerEmail ='${email}')
                    `;
        }
        db.query(getPost,(err,result)=>{
            if(err) throw err;

            let newResult=[],imgList=[];
            for(let i =0;i<result.length;i++){
                let {time,content}=result[i];
                imgList=result.filter((r)=>{
                    return time===r.time;
                }).map((r)=>r.imgURL);
                i+=imgList.length-1;
                newResult.push({time,content,imgList});
            }
            res.json(newResult);
        });

    });
    app.post("/api/save/post", jwtAuth.parseToken, async (req, res) => {
        let {imgData, value} = req.body;
        let data = await req.getData;
        let saveArticle;
        let time = new Date();
        let stamp = time.getTime();
        // let saveImg=`INSERT INTO imgpost (time,imgURL) values ('${time}','')`;
        if (data.hasOwnProperty("id")) {
            let {id} = data;
            saveArticle = `INSERT INTO posts (userID,content,time) values ('${id}','${value}','${stamp}')`;

        } else {
            let {email} = data;
            saveArticle = `INSERT INTO posts (email,content,time) values ('${email}','${value}','${stamp}')`;
        }
        const insertImg = (imgURL, stamp) => new Promise((resolve, reject) => {
            let saveImg = `INSERT INTO imgpost (time,imgURL) values ('${stamp}','${imgURL}')`;
            db.query(saveImg, (err) => {
                if (err) reject(err);
                resolve();
            })
        });
        db.query(saveArticle, (err) => {
            if (err) throw err;
            let promise = [];
            for (let i = 0; i < imgData.length; i++) {
                let name = JSON.parse(imgData[i]).fileName;
                promise.push(insertImg(name, stamp));
            }
            Promise.all(promise).then(() => {
                res.end();
            });
        })


    });

};