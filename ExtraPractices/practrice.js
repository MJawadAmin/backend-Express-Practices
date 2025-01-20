const express = require('express')
const app = express() 

app.set("view engine" , "ejs");  
app.use(express.static('./public'));
app.use(function (req, res ,next ){
    console.log("Middleware first are running ");
    next();
})
app.get('/' , (req, res )=>{
   res.render('css')
})

app.listen(4000, ()=>{
    console.log("server is running on port 4000");
})