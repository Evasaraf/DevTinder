const mongoose = require("mongoose");
const validator = require("validator");
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
        lowercase : true,
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
        type: String
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
// creating a user model
module.exports = mongoose.model("user" , userschema)
