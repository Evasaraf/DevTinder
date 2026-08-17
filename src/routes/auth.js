const express = require("express");
const authRouter = express.Router;

authRouter.post("/signup" , async(req, res)=>{
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


authRouter.post("/login" , async(req,res)=>{

  try{
    const{emailId, password} = req.body;// if we want to login , then first get the email and password from the request body
    const user = await User.findOne({emailId});// then verify the emailid , if emailid is present in the database then only go for 
    // password verification , if emailid is not present in the database then return an error message
    if(!user){
    throw new Error("invalid credentials");// if user is not found then throw an error
    
    }
    const isPasswordValid = await user.validatepassword(password);// calling the validatepassword method of user model to compare the password with the hashed password in the database
    // if user is found then compare the password with the hashed password in the database

    if(isPasswordValid){// if password is valid then send a success message
      const token = await user.getJWT();// calling the getJWT method of user model to generate a token
    //  const token = jwt.sign({_id:user._id}, "Dev@tinder9090",{expiresIn: "7d"});// creating a token with user id and secret key and setting the expiry time to 7 days
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
});

module.exports = {authRouter};