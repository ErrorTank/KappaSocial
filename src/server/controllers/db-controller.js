module.exports=(app,db)=>{
    app.get("/api/db/create/user/fb",(req,res)=> {
        let sql = "CREATE TABLE fbUsers (userID VARCHAR(50) PRIMARY KEY , email NVARCHAR(50), name NVARCHAR(20), avatarURL VARCHAR(100))";
        db.query(sql, (err) => {
            if (err) throw err;
            res.send("Create users complete");
        });
    });
    app.get("/api/db/create/user/reg",(req,res)=> {
        let sql = "CREATE TABLE users (email NVARCHAR(50) PRIMARY KEY , name NVARCHAR(20), pass VARCHAR(20), avatarURL VARCHAR(100))";
        db.query(sql, (err) => {
            if (err) throw err;
            res.send("Create users complete");
        });
    });
    app.get("/api/db/create/followers",(req,res)=>{
        let sql="CREATE TABLE followers (ID int NOT NULL AUTO_INCREMENT Primary key,email VARCHAR(50),userID VARCHAR(50),followerID VARCHAR(50),followerEmail VARCHAR(50))";
        db.query(sql,(err)=>{
            if (err) throw err;
            res.send("Create users complete");
        });
    });
    app.get("/api/db/create/post",(req,res)=> {
        let sql = "CREATE TABLE posts (email NVARCHAR(50) , userID NVARCHAR(20), content NVARCHAR(200),time VARCHAR(20) Primary key,name NVARCHAR(50),avatarURL VARCHAR(100))";
        db.query(sql, (err) => {
            if (err) throw err;
            res.send("Create posts complete");
        });
    });
    app.get("/api/db/create/post/img",(req,res)=>{
        let sql = "CREATE TABLE imgPost (imgID int NOT NULL AUTO_INCREMENT Primary key, time VARCHAR(20), imgURL VARCHAR(100))";
        db.query(sql, (err) => {
            if (err) throw err;
            res.send("Create img post complete");
        });
    });
};