const express = require("express");
//const app = express();
require("./config/database")
const app = express();
app.listen(7777, ()=> {
    console.log("server is successfully litening on port 7777")
});