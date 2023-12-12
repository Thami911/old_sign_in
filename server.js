const express = require('express');
const path = require('path');
const bodyparser =require("body-parser");
const session = require('express-session');
const { v4: uuidv4 } = require("uuid");

const router = require('./router');

const app = express();


const port = process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//LOAD STATIC
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

//HOME ROUTE
app.get('/', (req, res) =>{
    res.render('base', {title : "Sign In"});
})

app.listen(port, ()=>{ console.log("Listening to server on http://localhost:3000")});
