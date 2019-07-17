const express = require("express");
const router = express.Router();
const db = require("../db/db");
const passport = require("passport");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");

// Middleware for Authentication 
const { isLoggedIn } = require("../middleware"); 



router.get("/", isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.user.id ? true : false;
    res.render("home", { isLoggedIn });
});



// Login route


function usernameToLowerCase(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    next();
};

router.get("/login", (req, res, next) => {
    res.render("login");
})

router.post("/login", usernameToLowerCase, passport.authenticate("local",
    { 
      successRedirect : "/",
      failureRedirect: "/login",
      failureFlash: true
    }),(req, res, next) => {
        req.flash("success", "You are successfully logged in");
  });


  router.get("/logout", (req, res, next) => {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/login");
});


// Signup- GET route

router.get("/signup", (req, res) => {
    res.render("signup");
});


// Signup- POST route : username and password validation checkup

router.post("/signup", (req, res, next) => {
    const { username, password }  = req.body;

    let errors = [];
    // Check required fields
    if (!username || !password) {
        errors.push({msg: "Please fill in all fields"});
    }

    // Check password length

    if(password.length < 6) {
        errors.push({msg: "Password should be at least 6 characters"});
    }

    if(errors.length > 0) {
        res.render("signup", {
            errors,
            username,
            password
        });
    } else {
        db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
            // if the username is already taken
            console.log("index.js result", result);
            if(result.length > 0) {
                console.log("when there is already the same username", result);
                errors.push({msg: "Your username is already registered"});
                res.render("signup", {
                    errors,
                    username,
                    password
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hashedPassword) => {
                        db.query("INSERT INTO users (username, password) VALUES ( ?, ? )", [username, hashedPassword], (err, result) => {
                            console.log("here?", result);
                            if (err){
                                req.flash("error", err.message);
                                return res.render("signup");
                            }
                            req.flash("success", "You signed up so you can login now");
                            return res.redirect("login");
                        });
                    })
                });

            }
        })
    }
    
});

module.exports = router;

