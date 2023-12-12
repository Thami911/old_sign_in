var express = require("express");
var router = express.Router();

const credentials = {
    email: "adminUser1@gmail.com",
    password: "admin123"
};

//SIGNIN USER
router.post('/signin', (req,res)=>{
    if(req.body.email == credentials.email && req.body.password == credentials.password) {
       req.session.user = req.body.email;
       res.redirect('/route/dashboard');
       res.end("Sign in Complete");
    }else{
        res.end("Incorrect Username")
    }
});

//DASHBOARD ROUTE
router.get('/dashboard', (req, res)=> {
    if(req.session.user) {
        res.render('dashboard', {user : req.session.user})
    }else{
        res.send('Unknown User')
    }
})

//LOGOUT ROUTE
router.get('/logout', (req, res)=> {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', {title: "Express", logout: "Logout Successfully"})
        }
    })
})

module.exports = router;