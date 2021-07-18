//modules
const express = require("express");
const routerUser = require("./router/router.user");
const routerTree = require("./router/router.tree");
const routerFiles = require("./router/router.files");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookie =  require("cookie-parser")
const {frontend} =  require("./urls");
//app
const app = express();

//database
require("./database");


const urlFrontend = frontend

console.log(urlFrontend);

//middlewares
app.use(cors({
    origin: [urlFrontend],
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookie());

//routers   
app.use("/user",routerUser);
app.use("/tree",routerTree);
app.use("/",routerFiles);

//static files
app.use(express.static(path.join(__dirname,"public")))

//start the server 
const server = async ()=>{
    app.listen(3000);
    console.log("start the server");
}

server();