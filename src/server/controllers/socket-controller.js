module.exports=(io,socket,app)=>{
    app.get("/api/socket/id",(req,res)=>{
        io.sockets.in(socket.id).emit("get socket id",socket.id);
        res.end();
    });

};