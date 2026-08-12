const express = require("express");
//const app = express();
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const {validateSignupData} = require("./utils/validate")
const bcrypt = require("bcrypt");

app.use(express.json());// in postman request body is in json format so we need to use this middleware to
// parse the json data to javascript object so that we can use it in our code

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
