module.exports=(app,db)=>{
    app.get("/api/db/create/user",(req,res)=> {
        let sql = "CREATE TABLE users (userID VARCHAR(50) PRIMARY KEY , email NVARCHAR(50), name NVARCHAR(20), pass VARCHAR(20), loginType VARCHAR(10), avartarURL VARCHAR(100))";
        db.query(sql, (err) => {
            if (err) throw err;
            res.send("Create users complete");
        });
    });

};