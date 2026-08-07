const express = require("express");
//const app = express();
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

// code to add a data in database
app.post("/signup", async (req, res)=>{
    try {
    const userobj = {
        firstname: "trisha",
        lastname: " aggarwal",
        password: "abcdef",
        age: "21"
    }
// creating a new instance of my user model
    const newUser = new User(userobj);// creating a new user with above data

    await newUser.save();
    res.send("User added successfully");
  } 
  catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});



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
/*app.listen(7777, ()=> {
    console.log("server is successfully litening on port 7777")
  });*/
