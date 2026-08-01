const mongoose = require("mongoose");
// creating a user schema 
const userschema = mongoose.Schema({
    firstname : {
        type : String
},
    secondname : {
        type: String
    },
    
    password: {
        type : String
    },

    age:{
        type: Number
    },

    gender:{
        type: String
    }


})
// creating a user model
module.exports = mongoose.model("user" , userschema)
