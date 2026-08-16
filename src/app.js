const express = require("express");
//const app = express();
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const {validateSignupData} = require("./utils/validate")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {adminauth, userauth} = require("./middleware/auth")

app.use(express.json());// in postman request body is in json format so we need to use this middleware to
// parse the json data to javascript object so that we can use it in our code
app.use(cookieParser());// to parse the cookies from the request header and set it in the response header
app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});
// code to add a data in database
app.post("/signup", async (req, res)=>{
 // creating a new instance of my user model
// gettin the data from the request body and creating a new user with that data
    const newUser = new User(req.body);// creating a new user with above data

    try{
      // validate the user
      validateSignupData(req);

      // encrypt the password before saving it to the database
      const {password} = req.body;
   const passwordHash = await bcrypt.hash(password, 10);// hashing the password with 10 rounds of salt
   newUser.password = passwordHash;// replacing the plain text password with the hashed password


    await newUser.save();
    res.send("User added successfully");
  } 
  catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

//login api
app.post("/login" , async(req,res)=>{

  try{
    const{emailId, password} = req.body;// if we want to login , then first get the email and password from the request body
    const user = await User.findOne({emailId});// then verify the emailid , if emailid is present in the database then only go for 
    // password verification , if emailid is not present in the database then return an error message
    if(!user){
    throw new Error("invalid credentials");// if user is not found then throw an error
    
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // if user is found then compare the password with the hashed password in the database

    if(isPasswordValid){// if password is valid then send a success message
      const user = await user.getJWT();// calling the getJWT method of user model to generate a token
      const token = jwt.sign({_id:user._id}, "Dev@tinder9090",{expiresIn: "7d"});// creating a token with user id and secret key and setting the expiry time to 7 days
      res.cookie("token", token,{expires: new Date(Date.now() + 7  * 60 * 60 * 1000)});//it will set a cookie in the browser with the name "token" and value "token"
      res.send("login successful");
    }
    else{// if password is not valid then throw an error
      throw new Error("invalid login  credentials");
    }
  }
  catch(err){// if any error occurs then send a error message
    res.status(400).send("something went wrong while logging in" + err.message);
  }
})



app.get("/profile",  userauth, async (req, res)=>{
    try{
  const user = req.user;
  res.send(user);
}
catch(err){
  res.send("something went wrong while fetching the profile data" + err.message);
}
});

app.post("/sendconnectionrequest", userauth, async (req, res)=>{
  console.log("sending connection request");
  const user = req.user;
  res.send(user.firstname +"  sent connection request");

});

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
