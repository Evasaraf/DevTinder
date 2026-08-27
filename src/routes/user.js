const express = require("express");
const userRouter = express.Router();
const {userauth} = require("../middleware/auth");
const connectionRequest = require("../models/connectionrequest");
const { set } = require("mongoose");
const User = require("../models/user");

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
   const  User_Safe_Data = ["firstname", "lastname", "age", "gender", "skills"]// data of auser that others can see 
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest.find({// see the loggedin users connections request sent + received
    $or:[
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id}
    ],
    }).select("fromUserId toUserId")
   // .populate("fromUserId", "firstname").populate("toUserId","firstname");
// then to hide the users mentioned above 1,2,3,4
     const hideUsersFromFeed = new Set();
     connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
     })
     console.log("hidden users from feed");
     console.log(hideUsersFromFeed);
    

     const users = await User.find({
        $and:[
            {_id: {$nin: Array.from(hideUsersFromFeed)}}, //nin - not in 
            {_id: {$ne: loggedInUser._id}} // ne - not equals to 
        ],
     }).select(User_Safe_Data);
     res.send(users);
    }
    catch(err){
        res.status(404).send("error:", err.message);
    }
})
module.exports = userRouter;