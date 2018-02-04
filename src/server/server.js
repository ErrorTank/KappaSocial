const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const keys = require("./keys/keys");
const app = express();
const validRoutes = ["/login", "/home"];
const mysql = require("mysql");
const jwtAuth = require("./authorization/jwt-auth");

app.use(express.static("./public"));
app.use(bodyParser.json());
// app.use("/api/db",(req,res,next)=>{ //ask for private
//     if(req.query.key===keys.serverKey){
//         console.log("match");
//         next();
//     }
// });
app.use("/api/auth", jwtAuth.authorPlayer);
const port = 2000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "kappa-social"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connect successfully");
});


// const redirectRoute=(req,res,next)=>{
//   console.log(req.baseURL);
//   next();
// };


app.get(validRoutes, (req, res) => {
    console.log("valid");
    res.sendFile(path.resolve(__dirname, "../../public/index.html"));
});


const server = app.listen(port, () => {
    console.log(`Listen on port ${port}...`);
});

require("./sockets/socket")(server, app);
require("./controllers/db-controller")(app, db);
require("./controllers/user-controller")(app, db);

