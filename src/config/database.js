const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://evasaraf:baalbaalbache9691@namastenode.z6veqq3.mongodb.net/devTinder");

};

module.exports = connectDB;

