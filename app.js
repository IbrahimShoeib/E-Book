//express init
const express = require('express');
const logger =require ("./middleware/logger");
const {notFound,errorHandler} = require ("./middleware/errors");
const { User , validationRegisterUser, validationLoginUser,validationUpdateUser} = require ("./models/user");
const { connectingDataBase } = require('./config/db');
const path = require("path")

//config require
require('dotenv').config();
connectingDataBase()
const app = express();


//apply malewere
app.use(express.json());
app.use ( logger );

app.set("view engine" , "ejs")
//static folder
app.use(express.static(path.join(__dirname,"images")))
//Router
app.use("/api/books",require("./routers/books"));
app.use("/api/authers",require("./routers/authers"));
app.use("/api/auth",require ("./routers/auth"));
app.use("/api/users",require ("./routers/users"));
app.use("/api/upload",require ("./routers/upload"));
app.use("/password",require ("./routers/password"));

//Error
app.use(notFound);
app.use(errorHandler);


// Users
app.use(User);
app.use(validationRegisterUser);
app.use(validationLoginUser);
app.use(validationUpdateUser);




// runing server
const PORT=process.env.PORT || 2000 ;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));








