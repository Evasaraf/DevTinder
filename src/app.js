const express = require("express");
//const app = express();
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json());// in postman request body is in json format so we need to use this middleware to
// parse the json data to javascript object so that we can use it in our code

// code to add a data in database
app.post("/signup", async (req, res)=>{

 
// creating a new instance of my user model
// gettin the data from the request body and creating a new user with that data
    const newUser = new User(req.body);// creating a new user with above data

    try{
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
