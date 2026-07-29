const express = require("express");
const app = express();
const {adminauth} = require("./middleware/auth.js");

//app.use("/", (req, res, next)=>{
    //res.send("handling routes and middleware");
  //  next();
//});
app.get("/admin", adminauth);

app.get("/admin/getAllData", (req, res)=>{
  res.send("send all data");
})
app.use("/admin/deleteAllData", (req,res)=>{
    res.send("delete all data");
})

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

app.use("/greet" ,(req, res) => {
    res.send("hello mam");
});
/*app.use((req, res) => {
    res.send("hello from the server");
});*/
// if therse a question mark then it means it can also work without that particular word like ab?c -> /ac, /abc
// /ab+c => /abbbbbbc, /abbc, 
// /ab*cd => abcd, /abEVAcd, /abXYZcd
app.use("/abc", (req, res)=> {
    res.send("lets explore more");
});

app.get("/noresponse", (req, res)=>{

})

app.use("/tworesponse" , 
    (req, res)=> {
    res.send("1st request is sending a response");

    (req, res)=>{
       res.send( "2nd request is sending a response")
    }
})



app.use("/", (req, res, next)=>{
    //res.send("handling routes and middleware");
    next();
});



app.use("/nextresponse", (req, res, next)=>{
    console.log("agar first request ke pass koi response nahi hoga to ye second print karega using next")
    next();
},
    (req,res,next)=> {
        //res.send("2nd request can finally respond using next")
    next();
},
    
     (req,res,next)=> {
        res.send("3rdd request can finally respond using next")
    
    }

)

app.listen(7777, ()=> {
    console.log("server is successfully litening on port 7777")
});