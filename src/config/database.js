const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://evasaraf:baalbaalbache9691@namastenode.z6veqq3.mongodb.net/namastenode");
};

connectDB()
 .then(()=>{
    console.log("database connection established");
 })
.catch((err)=>{
    console.log("database connection is not established")
})