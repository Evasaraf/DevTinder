const mongoose = require("mongoose");

const connectDB = async() => {
    console.log(process.env.DB_CONNECTION_SECRET);
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);
   // mongodb+srv://evasaraf:baalbaalbache9691@namastenode.z6veqq3.mongodb.net/
};

module.exports = connectDB;