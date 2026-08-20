const express = require("express");
const connectionrequestRouter = express.Router();
const {userauth} = require("../middleware/auth");
const user = require("../models/user");
const connectionRequest = require("../models/connectionrequest")


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