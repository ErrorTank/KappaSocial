const socket=require("socket.io");

module.exports=(server,app)=>{
    const io=socket(server);
    io.on('connection', (socket) => {
        console.log("User connect to ",socket.id);
        socket.join(socket.id);
        socket.on("disconnect",()=>{
            console.log("User disconnected from "+socket.id);
        });
        require("../controllers/socket-controller")(io,socket,app);
    });
    return io;
};