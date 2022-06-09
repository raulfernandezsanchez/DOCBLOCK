const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const dbroutes = require('./routes/route');
const cors = require('cors');
const { default: ReferenceSet } = require("yup/lib/util/ReferenceSet");

const PORT = process.env.PORT || 3008;

//middleware


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }
    next();
});


//routes
app.use('/api',dbroutes);


app.use(cors());

//connect to mongodb atlas

mongoose
    .connect(
        process.env.MONGO_URL,
        {useNewUrlParser:true , useUnifiedTopology: true}
    )
    .then(() => {
    console.log("Connected to mongodb atlas");
    }).catch(error => {
        console.log("Something wrong happened, error")
    })

// start server
app.listen(PORT,() => {
    console.log(`Server started at PORT"${PORT}`);
});