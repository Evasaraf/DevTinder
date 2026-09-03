const express = require("express");
//const app = express();
const connectDB = require("./config/database")
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {adminauth, userauth} = require("./middleware/auth");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionrequestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionrequestRouter);
app.use("/", userRouter);

app.get("/user", async (req, res) => {
  const userage = req.body.age;
  try{
    const user = await User.find({ age: userage });
    if(user.length === 0){
      res.status(404).send("No user found with the specified age");
    }
    else{
      res.send(user);
    }
  }catch(err){
    console.log("smthing went wrong while fetching the data");
    console.error(err);
  }
});

// Feed API - GET/ feed to fetch all the users from the database
app.get("/feed", async  (req, res)=> {
  try{
    const user = await User.find({});
    res.send(user);
  }catch(err){
    console.log("smthing went wrong while fetching the data");
    console.error(err);
  }
});

app.delete("/user", async (req, res)=>{
   const userId = req.body.userId;

  try{
    const user = await User.findByIdAndDelete({_id:userId});
    if(!user){
      res.status(404).send("User not found");
    }
    else{
      res.send("User deleted successfully");
    }
  }
  catch(err){
    console.log("smthing went wrong while deleting the data");
  }
});


app.patch("/user/:userId", async (req,res)=>{

  const userId = req.params.userId;
  const data = req.body;

  try{
    // check if the update request is valid or not
  const ALLowedUpdates = ["firstname", "lastname", "age", "gender", "profileUrl", "about", "skills"];
  const isUpdateAllowed = Object.keys(data).every((update)=> ALLowedUpdates.includes(update));// check if all the keys in the request body are present in the allowed updates array
  if(!isUpdateAllowed){
    return res.status(400).send("Invalid update request");// if the update request is not valid then return a 400 status code with an error message
  }

  if(data?.skills.length> 3){
    throw new Error("skills should not be more than 3");
  }
   const user = await User.findByIdAndUpdate({_id: userId} , data, );
   if(!user)
{
  console.log("user not found to update the data");

}
else{
  res.send("user data updated successfully"); 
}  }
  catch(err){
  console.log("smthing went wrong while updating the data");
  }
})


connectDB()
 .then(()=>{
    console.log("database connection established");

    app.listen(7777, ()=> {
    console.log("server is successfully litening on port 7777")
  });

   
})
.catch((err)=>{
    console.log("databse connection failed")
    console.error(err)
     
})
