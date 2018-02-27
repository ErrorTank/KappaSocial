module.exports=(io,socket,app,db)=>{
    app.get("/api/socket/id",(req,res)=>{
        io.sockets.in(socket.id).emit("get socket id",socket.id);
        res.end();
    });
    app.post("/api/post/like",(req,res)=>{
        let {postKey,userID,userEmail}=req.body;
        //io.sockets.emit("some one like",postKey);
        let insertAct;
        if(userID){
            insertAct=`INSERT INTO postuser (userID,time) values ('${userID}','${postKey}')`;
        }else{
            insertAct=`INSERT INTO postuser (email,time) values ('${userEmail}','${postKey}')`;
        }
        db.query(insertAct,(err)=>{
            if(err) throw err;
            res.end();
        });


    });
    app.post("/api/post/dislike",(req,res)=>{
        let {postKey,userID,userEmail}=req.body;
        //io.sockets.emit("some one dislike",postKey);
        let deleteAct;
        if(userID){
            deleteAct=`DELETE FROM postuser  WHERE userID='${userID}' AND time='${postKey}'`;
        }else{
            deleteAct=`DELETE FROM postuser WHERE email='${userEmail}' AND time='${postKey}'`;
        }
        db.query(deleteAct,(err)=>{
            if(err) throw err;
            res.end();
        });


    });
};