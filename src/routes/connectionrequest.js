const express = require("express");
const connectionrequestRouter = express.Router();
const {userauth} = require("../middleware/auth");

connectionrequestRouter.post("/sendconnectionrequest", userauth, async (req, res)=>{
  console.log("sending connection request");
  const user = req.user;
  res.send(user.firstname +"  sent the connection request");

});

module.exports = connectionrequestRouter;