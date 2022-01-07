var express = require('express');
const main = require('../handlers/main')

const multer  = require('multer')

const passport = require('passport')
var LocalStrategy   = require('passport-local').Strategy;

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })

var router = express.Router();

var mysql = require('mysql2')
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'leaf-db'
})

connection.connect()

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM employees WHERE id = ? ",[id], function(err, rows){
        done(err, rows[0]);
    });
});

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
    console.log(email)
    console.log(password)
     connection.query("SELECT * FROM `employees` WHERE `email` = '" + email + "'",function(err,rows){
        if (err) {
            console.log(err)
            return done(err)
        }
         if (!rows.length) {
            console.log("no user found")
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        } 
        
        // if the user is found but the password is wrong
        if (!( rows[0].password == password)) {
            console.log("wrong password")
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        }
        
        // all is well, return successful user
        console.log("logged in")
        return done(null, rows[0]);			
    
    });
}));

/* GET home page. */
router.get('/', main.main)

router.get('/employee', isAuthorized, main.employee)

router.get('/emp-form', isAuthorized, main.emp_form)

router.get('/leave', isLoggedIn, main.leave)

router.get('/leave-form', isLoggedIn, main.leave_form)

router.get('/approval', isAuthorized, main.approval)

router.get('/login', main.login)

router.get('/logout', main.logout)

router.get('/notauthorized', function(req, res, next) {
    res.render('notauthorized');
})

router.post('/login', 
  passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
      console.log("hello")

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
    res.redirect('/');
  });

router.post('/employee-submit', upload.single('pfp'), main.employee_submit)

router.post('/leave-submit', main.leave_submit)

router.post('/approve', main.approve)

router.post('/decline', main.decline)

router.post('/upload', upload.single('avatar'), (req, res) =>{
    try {
        res.send(req.file);
    } catch(error) {
          console.log(error);
          res.send(400);
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

function isAuthorized(req, res, next) {
    if (req.user && (req.user.position == "Manager" || req.user.position == "HR")) {
        next();
    } else {
        //show display and restrict access
        res.redirect("/notauthorized");
    }
}