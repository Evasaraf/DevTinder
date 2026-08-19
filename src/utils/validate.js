const validator = require("validator");
const validateSignupData = (req)=>{
const {firstname, lastname, emailId, password} = req.body;
    if(!firstname || !lastname){
        throw new Error("firstname and lastname are required");
    }

    else if(firstname.length<3 || firstname.length > 10){
        throw new Error("firstname must be between 3 and 10 characters");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong enough");
    }
};

const validateEditProfileData = (req)=>{
    const allowedUpdates = ["firstname", "lastname", "age", "gender", "profileUrl", "about", "skills"];
    const isupdateallowed = Object.keys(req.body).every((field)=> allowedUpdates.includes(field));
    return isupdateallowed;
};
module.exports = {validateSignupData, validateEditProfileData};