const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://evasaraf:baalbaalbache9691@namastenode.z6veqq3.mongodb.net/devTinder")
  .then(() => {
    console.log("✅ Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Failed");
    console.error(err);
    process.exit(1);
  });