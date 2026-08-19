const express = require("express");
const profileRouter = express.Router();
const {userauth} = require("../middleware/auth");
const {validateEditProfileData} = require("../utils/validate");


profileRouter.get("/profile/view",  userauth, async (req, res)=>{
    try{
  const user = req.user;
  res.send(user);
}
catch(err){
  res.send("something went wrong while fetching the profile data" + err.message);
}
});

profileRouter.patch("/profile/edit", userauth, async (req, res)=>{
 try{
    if(!validateEditProfileData(req)){
        throw new Error("Invalid update request");
    }
    const loggedInUser = req.user;
    console.log("user orignal details without update:", loggedInUser);// it will send 

    Object.keys(req.body).forEach((key)=>{
        loggedInUser[key] = req.body[key];
    });
    console.log("user details are updated:" , loggedInUser);
   res.send(`${loggedInUser.firstname}, your profile updated successfully`);
 }
 catch(err){
    res.status(400).send("something went wrong while editing the profile:  " + err.message);
 }
});
module.exports = profileRouter;