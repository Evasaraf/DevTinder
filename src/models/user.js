const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// creating a user schema 
const userschema = mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        minlength : 3,
},
    lastname : {
        type: String
    },
    
    password: {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong enough");
            }
        }
        
    },

    age:{
        type: Number,
        min : 18,
    },

    gender:{
        type: String,
       validate(value){
            if(value!="male" && value!="female" && value!="other"){
                throw new Error("gender should be male, female or other");
            }
        }
    },

    profileUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL");
            }
    }
},
    about:{
        type: String
    },
    skills: {
        type: [String],
       /* validate(value){
            if(value.length>2){
                throw new Error("skills should not be more than 2");
            }   
    },*/
},
    emailId: {
        type: String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }

}    },

    {
        timestamps : true
    }

);

userschema.methods.getJWT = async function(){// creating a method to generate a JWT token for the user
    const user = this;
    const token = jwt.sign({_id:user._id}, "Dev@tinder9090",{expiresIn: "7d"});
    return token;}

userschema.methods.validatepassword = async function(passwordinputbyuser){// creating a method to validate the password of the user
    const user = this;
    const passwordhash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordinputbyuser, passwordhash);
    return isPasswordValid;
}
// creating a user model
module.exports = mongoose.model("user" , userschema)
