const express = require ('express')
const app = express()

app.use( function(req, res , next){
    console.log("Middleware is running ")
    next()
})

app.get('/profile/:username', function (req , res ){
    res.send(`<h1>Home Page </h1> <p>Hello this is User page </p> ${req.params.username}`)
})
app.listen(3000,()=> {
    console.log("Server 3000 are running ")
})