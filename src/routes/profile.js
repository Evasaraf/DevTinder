const express = require("express");
const profileRouter = express.Router();
const {userauth} = require("../middleware/auth");

profileRouter.get("/profile",  userauth, async (req, res)=>{
    try{
  const user = req.user;
  res.send(user);
}
catch(err){
  res.send("something went wrong while fetching the profile data" + err.message);
}
});

module.exports = profileRouter;