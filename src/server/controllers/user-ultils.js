const jwtAuth=require("../authorization/jwt-auth");

module.exports=(app,db)=>{
    app.post("/api/user/save",(req,res)=>{
        console.log(req.body);
        let {id,name,email,avatarURL}=req.body;
        let checkUser=`SELECT userID FROM users WHERE userID='${id}'`;
        let createUser = `INSERT INTO users (userID,name,email,avatarURL) VALUES ('${id}',N'${name}','${email}','${avatarURL}')`;
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
};