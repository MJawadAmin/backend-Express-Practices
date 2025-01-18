const express = require ('express');
const app = express();

app.use(function (req ,res , next){
    console.log("Middleware are working")
    next()
})
app.get('/',(req,res)=>{
    res.send("<h1>Home Page </h1> <p>This is home page </p>")
})

app.get('/about',(req,res)=>{
    res.send("<h1>about Page </h1> <p>This is about page </p>")
})

app.get('/contact',(req,res)=>{
    res.send("<h1>Contact Page </h1> <p>This is contact page do you need my contact </p>")
})
app.listen(3000, ()=>{
    console.log("Server is running")
})