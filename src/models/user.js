const mongoose = require("mongoose");
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
        type: [String]
    }

})
// creating a user model
module.exports = mongoose.model("user" , userschema)
