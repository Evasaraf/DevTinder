const mongoose = require("mongoose");

const connectDB = async() => {
    // ps: add this credentials in the .env , and update .gitignore to exclude all .env variants from version control
    await mongoose.connect("mongodb://evasaraf:baalbaalbache9691@ac-yugxtsy-shard-00-00.z6veqq3.mongodb.net:27017,ac-yugxtsy-shard-00-01.z6veqq3.mongodb.net:27017,ac-yugxtsy-shard-00-02.z6veqq3.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-gbfbrx-shard-0&authSource=admin&appName=Namastenode");
   // mongodb+srv://evasaraf:baalbaalbache9691@namastenode.z6veqq3.mongodb.net/

    // ps: also add .env.example template for onboarding other developers
};

module.exports = connectDB;
