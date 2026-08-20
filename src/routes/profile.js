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
    const loggedInUser = req.user;// 
    console.log("user orignal details without update:", loggedInUser);// give the details of loggedin user

    Object.keys(req.body).forEach((key)=>{// modify the fields, as given in request body of postman
        loggedInUser[key] = req.body[key];
    });
    console.log("user details are updated:" , loggedInUser);// give the updated details of loggedinuser

    await loggedInUser.save();// make  the changes in mongodb also and save 

   res.send(`${loggedInUser.firstname}, your profile updated successfully`);
 }
 catch(err){
    res.status(400).send("something went wrong while editing the profile:  " + err.message);
 }
});

profileRouter.patch("/profile/password" , userauth , async (req, res) =>{
  try{
   const user = req.user;
  }
  catch(err){

  }
})
module.exports = profileRouter;