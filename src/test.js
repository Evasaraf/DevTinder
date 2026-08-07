const mongoose = require("mongoose");

mongoose
  .connect("")
  .then(() => {
    console.log("✅ Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Failed");
    console.error(err);
    process.exit(1);
  });