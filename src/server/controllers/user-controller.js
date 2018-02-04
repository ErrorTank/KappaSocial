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
                        jwtAuth.signToken({email}).then((token)=>res.json({token}));
                    }
                });
            }
        });

    })
};