 const jwt = require("jsonwebtoken");
 const User = require("../models/user");
 
 const adminauth = (req, res, next)=>{
    //LOGIC OF CHECKING IF REQUEST IS AUTHORIZED
    console.log("admin auth is getting checked")
    const token = "xyz";
    const isadminauthorized = token === "xyz";
    if(!isadminauthorized){
        res.status(401).send("user can access the data");
    }
    else{
        next();
    }
}

const userauth = async (req, res, next)=>{
try{
const {token} = req.cookies;
if(!token){
    res.status(401).send("Unauthorized: No token provided");
}
const decodedMessage =  await jwt.verify(token, "Dev@tinder9090");
const {_id} = decodedMessage;
const user = await User.findById({_id});
if(!user){
    res.status(401).send("user not found");     
}
req.user = user;
next();
}
catch(err){
    console.log("error while verifying the token", err);
    res.status(401).send("Unauthorized: Invalid token");
}
}
module.exports = {adminauth, userauth};