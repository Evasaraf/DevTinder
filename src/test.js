const mongoose = require("mongoose");

mongoose
  .connect("mongodb://evasaraf:baalbaalbache9691@ac-yugxtsy-shard-00-00.z6veqq3.mongodb.net:27017,ac-yugxtsy-shard-00-01.z6veqq3.mongodb.net:27017,ac-yugxtsy-shard-00-02.z6veqq3.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-gbfbrx-shard-0&authSource=admin&appName=Namastenode")
  .then(() => {
    console.log("✅ Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Failed");
    console.error(err);
    process.exit(1);
  });