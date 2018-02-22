const jwtAuth=require("../authorization/jwt-auth");
//TODO: change name to controller
module.exports=(app,db)=>{
    app.post("/api/user/fb/login",(req,res)=>{
        console.log(req.body);
        let {id,name,email,avatarURL}=req.body;
        let checkUser=`SELECT userID FROM fbusers WHERE userID='${id}'`;
        let createUser = `INSERT INTO fbusers (userID,name,email,avatarURL) VALUES ('${id}',N'${name}','${email}','${avatarURL}')`;
        db.query(checkUser, (err,result) => {
            if (err) throw err;
            if(!result.length){
                db.query(createUser,(err)=>{
                    if (err) throw err;
                    jwtAuth.signToken({id,email}).then((token)=>res.json({token}));
                });
            }else{
                jwtAuth.signToken({id,email}).then((token)=>res.json({token}));
            }
        });

    });
    app.post("/api/user/reg/save",(req,res)=>{
        let {name,email,pass}=req.body;
        let checkUser=`SELECT email FROM users WHERE email='${email}'`;
        let createUser = `INSERT INTO users (name,email,pass) VALUES ('${name}',N'${email}','${pass}')`;
        db.query(checkUser, (err,result) => {
            if (err) throw err;
            if(!result.length){
                db.query(createUser,(err)=>{
                    if (err) throw err;
                    jwtAuth.signToken({email}).then((token)=>res.json({token}));
                });
            }else{
                res.sendStatus(404);
            }
        });

    });
    app.get("/api/auth/user",(req,res)=>{
        res.end();
    });
    app.post("/api/user/reg/login",(req,res)=>{
        let {email,pass}=req.body;
        let checkEmailUser=`SELECT * FROM users WHERE email='${email}'`;
        let checkPassUser=`SELECT * FROM users WHERE pass='${pass}' AND email='${email}'`;
        db.query(checkEmailUser, (err,result) => {
            if (err) throw err;
            if(!result.length){
                res.json({msg:"Wrong email"});
            }else{
                db.query(checkPassUser,(err,result)=>{
                    if (err) throw err;
                    if(!result.length){
                        res.json({msg:"Wrong pass"});
                    }else{
                        jwtAuth.signToken({email}).then((token)=>res.json({token,result}));
                    }
                });
            }
        });

    });
    app.get("/api/user/all",jwtAuth.authorPlayer,(req,res)=>{
        let {id,email} =req.parseUser;
        let keyword=req.query.keyword;
        let myKey=req.query.key;
        let getFBFollow,getRegFollow,getFBUnFollow,getRegUnFollow;



            getFBFollow=`SELECT userID,name,email,avatarURL FROM fbusers Where name Like '%${keyword}%' AND userID in (SELECT userID FROM followers where followerEmail = '${myKey}')`;
            getRegFollow=`SELECT name,email,avatarURL FROM users Where email != '${email}' AND name Like '%${keyword}%' AND email in (SELECT email FROM followers where followerEmail = '${myKey}')`;
            getFBUnFollow=`SELECT userID,name,email,avatarURL FROM fbusers Where name Like '%${keyword}%' AND userID not in (SELECT userID FROM followers where followerEmail = '${myKey}')`;
            getRegUnFollow=`SELECT name,email,avatarURL FROM users Where email != '${email}' AND name Like '%${keyword}%' AND email not in (SELECT email FROM followers where followerEmail = '${myKey}')`;

        if(id){
            getFBFollow=`SELECT userID,name,email,avatarURL FROM fbusers Where userID != '${id}' AND name Like '%${keyword}%' AND userID in (SELECT userID FROM followers where followerID = '${myKey}')`;
            getRegFollow=`SELECT name,email,avatarURL FROM users Where name Like '%${keyword}%'  AND email in (SELECT email FROM followers where followerID = '${myKey}')`;
            getFBUnFollow=`SELECT userID,name,email,avatarURL FROM fbusers Where userID != '${id}' AND name Like '%${keyword}%' AND userID not in (SELECT userID FROM followers where followerID = '${myKey}')`;
            getRegUnFollow=`SELECT name,email,avatarURL FROM users Where name Like '%${keyword}%'  AND email not in (SELECT email FROM followers where followerID = '${myKey}')`;
        }

        db.query(getFBFollow, (err,result1) => {
            if (err) throw err;
            db.query(getRegFollow,(err,result2)=>{
                if(err) throw err;
                db.query(getFBUnFollow,(err,result3)=>{
                    if(err) throw err;
                    db.query(getRegUnFollow,(err,result4)=>{
                        if(err) throw err;
                        let follow=[...result1,...result2];
                        let unfollow=[...result3,...result4];
                        res.json({follow,unfollow});
                    });
                });
            });
        });
    });
    app.post("/api/user/follow",(req,res)=>{
        let {myEmail,myID}=req.body.me;
        let {email,userID}=req.body.guess;

        myEmail = !myID ? myEmail : null;
        email = !userID ? email : null;

        let addFollower=`INSERT INTO followers (email,userID,followerEmail,followerID) VALUES('${email}','${userID}','${myEmail}','${myID}')`;
        db.query(addFollower,(err)=>{
            if (err) throw err;
            res.end();
        });

    });
    // app.get("/api/user/reg/all/:id",(req,res)=>{
    //     let email=req.params.id;
    //     let getRegUsers=`SELECT name,email,avatarURL FROM users Where email!='${email}'`;
    //     db.query(getRegUsers, (err,result) => {
    //         if (err) throw err;
    //         res.json(result);
    //     });
    // });
    // app.get("/api/user/fb/all/:id",(req,res)=>{
    //     let fbID=req.params.id;
    //     let getFBUsers=`SELECT name,email,avatarURL FROM fbusers Where userID!='${fbID}'`;
    //     db.query(getFBUsers, (err,result) => {
    //         if (err) throw err;
    //         res.json(result);
    //     });
    // });
};