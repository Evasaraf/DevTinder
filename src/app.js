const express = require("express");
const app = express();

app.use("/user" , (req, res) => {
    res.send("since we have used use of /user above get and post of/user so every api call will give the use wale ka reponse")
});

// this will only handle a get call to the /user
app.get("/user", (req, res) => {
  res.send({"firstname" : "eva", "lastname" : "soni"})
});
   
// this will only handle a post call from /user
app.post("/user" , (req, res)=>{
    console.log("saving data to the database")
    res.send(" user data recieved in get will be saved")
})
// this use will handle all the calls get post patch fetch from the /intro
app.use("/intro" ,(req, res) => {
    res.send("hi eva ");
});

/*app.use("/greet" ,(req, res) => {
    res.send("hello mam");
});
app.use((req, res) => {
    res.send("hello from the server");
});*/

app.listen(7777, ()=> {
    console.log("server is successfully litening on port 7777")
});