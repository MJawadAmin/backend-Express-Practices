const express = require ('express');
const app = express();

app.set("view engine" , "ejs");
app.use(express.static('./public'));

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/error', (req, res , next )=>{
  throw Error("Somthing went wrong")
})
app.get('/about', (req, res)=>{
    res.render('about')
})
app.get('/contact', (req, res)=>{
    res.render('contact')
})


app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})