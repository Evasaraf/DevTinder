 const adminauth = (req, res, next)=>{
    //LOGIC OF CHECKING IF REQUEST IS AUTHORIZED
    console.log("admin auth is getting checked")
    const token = "xyz";
    const isadminauthorized = token === "xyz";
    if(!isadminauthorized){
        res.status(401).send("user can access the data");
    }
    else{
        next();
    }
}

module.exports = {adminauth}