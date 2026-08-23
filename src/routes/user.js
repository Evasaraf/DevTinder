const express = require("express");
const userRouter = express.Router();
const {userauth} = require("../middleware/auth");
const connectionRequest = require("../models/connectionrequest");

userRouter.get("/user/requests/received", userauth, async (req, res) => {
    try{
     const loggedInUser = req.user;
     const connectionRequests= await connectionRequest.find({
      toUserId: loggedInUser._id, 
      status: "interested",
     });
     res.json({message: "data fetched successfully",
        data : connectionRequests,
     })
    }
    catch(err){
        return res.send("error:", err.message)
    }
})

module.exports = userRouter;