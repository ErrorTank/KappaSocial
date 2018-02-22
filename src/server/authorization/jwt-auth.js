const jwt=require("jsonwebtoken");
const keys=require("../keys/keys");

module.exports={
    authorPlayer:(req,res,next)=>{
        const bearerHeader=req.headers["authorization"];
        if(bearerHeader){
           // req.token=bearerHeader.split(" ")[1];
            let token=bearerHeader.split(" ")[1];
            jwt.verify(token,keys.jwt.clientSecret,(err,decoded)=>{
                if(err) res.sendStatus(403);
                else{
                    req.parseUser=decoded;
                    next();
                }
            });
        }else{
            res.sendStatus(403);
        }
    },
    signToken: (data)=>new Promise((resolve,reject)=>{
        jwt.sign(data,keys.jwt.clientSecret,(err,token)=>{
            if(err) reject(err);
            resolve(token);
        });
    }),
    verifyToken:(token)=>new Promise((resolve,reject)=>{
        jwt.verify(token,keys.jwt.clientSecret,(err,decoded)=>{
            if(err) reject(err);
            resolve(decoded);
        });
    }),
    parseToken:(req,res,next)=>{
        req.getData=new Promise((resolve,reject)=>{
            jwt.verify(req.headers["authorization"].split(" ")[1],keys.jwt.clientSecret,(err,decoded)=>{
                if(err) reject(err);
                resolve(decoded);

            })
        });
        next();
    }
};