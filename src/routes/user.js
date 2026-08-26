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
     }).populate("fromUserId", ["firstname", "lastname"])
     res.json({message: "data fetched successfully",
        data : connectionRequests,
     })
    }
    catch(err){
        return res.send("error:", err.message)
    }
})

userRouter.get("/user/connections/accepted", userauth, async(req, res)=>{
    try{
      const loggedInUser = req.user;
      const connectionRequests = await connectionRequest.find({
        $or:
        [{toUserId: loggedInUser._id, status:"accepted" },// ab kisi user ke connection stoh wahi honege na jo request vo accept karga

         {fromUserId: loggedInUser._id, status:"accepted"},
        ]
      }).populate("fromUserId", ["firstname", "lastname"])
       .populate("toUserId", ["firstname", "lastname"])
    const data = connectionRequests.map((row)=>row.fromUserId);

       res.json({data});
    }catch(err){
                 return res.send("error:", err.message)
    }
})


userRouter.get("/feed", userauth, async(req,res)=>{
    try{
    // users should see all the users card except
    //1. his own card
    //2. his connections
    //3. ignored people
    //4. his friends who are already connected

    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest.find({
    $or:[
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id}
    ],
    }).select("fromUserId toUserId");
     res.send(connectionRequests);
    }
    catch(err){
        res.status(404).send("error:", err.message);
    }
})
module.exports = userRouter;