const express = require("express");
const connectionrequestRouter = express.Router();
const {userauth} = require("../middleware/auth");
const user = require("../models/user");
const connectionRequest = require("../models/connectionrequest");
const { isAbaRouting } = require("validator");


connectionrequestRouter.post("/sendconnectionrequest", userauth, async (req, res)=>{
  console.log("sending connection request");
  const user = req.user;
  res.send(user.firstname +"  sent the connection request");

});

connectionrequestRouter.post("/request/send/:status/:toUserId", userauth, async(req, res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

   const allowedstatus = ["ignore" , "interested"];
   if(!allowedstatus.includes(status)){
    return res.status(400).json({message: "invalid status type " + status});
   }
   // if a has sent a connection request to b once, it should not be allowed to send it again, and also b can not send request to a then
   const existingconnectionRequest = await connectionRequest.findOne({
    $or:[
       {fromUserId, toUserId},
       {fromUserId : toUserId, toUserId : fromUserId},
    ],
   })
   if(existingconnectionRequest)
   {
    return res.status(400).send("connection request already exists");
   }
    const newconnectionRequest =  new connectionRequest({
      fromUserId, toUserId, status
    });

    const data = await newconnectionRequest.save();

    res.json({
      message: "connection request sent successfully",
      data,
    })

  }
  catch(err){
    res.status(400).send("error: " +  err.message);
  }

})
module.exports = connectionrequestRouter;