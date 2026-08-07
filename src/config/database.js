const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb://evasaraf:baalbaalbache9691@ac-yugxtsy-shard-00-00.z6veqq3.mongodb.net:27017,ac-yugxtsy-shard-00-01.z6veqq3.mongodb.net:27017,ac-yugxtsy-shard-00-02.z6veqq3.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-gbfbrx-shard-0&authSource=admin&appName=Namastenode");
   // mongodb+srv://evasaraf:baalbaalbache9691@namastenode.z6veqq3.mongodb.net/
};

module.exports = connectDB;