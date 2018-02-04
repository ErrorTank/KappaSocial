module.exports=(app,db)=>{
    app.get("/api/db/create/user/fb",(req,res)=> {
        let sql = "CREATE TABLE fbUsers (userID VARCHAR(50) PRIMARY KEY , email NVARCHAR(50), name NVARCHAR(20), avartarURL VARCHAR(100))";
        db.query(sql, (err) => {
            if (err) throw err;
            res.send("Create users complete");
        });
    });
    app.get("/api/db/create/user/reg",(req,res)=> {
        let sql = "CREATE TABLE users (email NVARCHAR(50) PRIMARY KEY , name NVARCHAR(20), pass VARCHAR(20))";
        db.query(sql, (err) => {
            if (err) throw err;
            res.send("Create users complete");
        });
    });
};