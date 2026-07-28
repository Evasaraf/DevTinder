const express = require("express");
const app = express();

app.use("/" ,(req, res) => {
    res.send("hi eva ");
});
app.use("/greet" ,(req, res) => {
    res.send("hello mam");
});
app.use((req, res) => {
    res.send("hello from the server");
});

app.listen(7777, ()=> {
    console.log("server is successfully litening on port 7777")
});