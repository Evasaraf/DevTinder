const express = require("express");
const app = express();
const {adminauth} = require("./middleware/auth.js");

app.use("/getuserdata", (req,res)=>{
    try{
    res.send("send user data")
    }
    catch(err){
        res.status(500).send("something went wrong")
    }
})

app.use("/", (err, req, res, next)=>{
    if(err){
        //error handling using err 
        res.status(404).send("some error occured")
    }
})

app.listen(7777, ()=> {
    console.log("server is successfully litening on port 7777")
});