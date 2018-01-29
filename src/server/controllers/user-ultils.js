const jwtAuth=require("../authorization/jwt-auth");

module.exports=(app,db)=>{
    app.post("/api/user/fb/save",(req,res)=>{
        console.log(req.body);
        let {id,name,email,avatarURL}=req.body;
        let checkUser=`SELECT userID FROM fbUsers WHERE userID='${id}'`;
        let createUser = `INSERT INTO fbUsers (userID,name,email,avatarURL) VALUES ('${id}',N'${name}','${email}','${avatarURL}')`;
        db.query(checkUser, (err,result) => {
            if (err) throw err;
            if(!result.length){
                db.query(createUser,(err)=>{
                    if (err) throw err;
                    jwtAuth.signToken({id}).then((token)=>res.json({token}));
                });
            }else{
                jwtAuth.signToken({id}).then((token)=>res.json({token}));
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
};