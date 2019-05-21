const express = require("express");
const router = express.Router();
const db = require("../db/db");
const passport = require("passport");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");

// Middleware for Authentication 
const { isLoggedIn } = require("../middleware"); 



// Login route

router.get("/login", (req, res, next) => {
    res.render("login");
})

router.post("/login", passport.authenticate("local",
   { 
      successRedirect : "/dashboard",
      failureRedirect: "/login",
      failureFlash: true
    }),(req, res, next) => {

  });


  router.get("/logout", (req, res, next) => {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/login");
});








/*
// Login handle  original
router.post("/login", (req, res, next) => {
    
    
    passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);

    
    // db.query("SELECT * FROM users WHERE username = ?", req.body.user, (err, result) => {
    //     if (err) console.log(err);
    //     if(!result){
    //         console.log("There is no data");
    //     }
        
    // });
});

*/

// Signup- GET route

router.get("/signup", (req, res) => {
    res.render("signup");
});


// router.get("/dashboard", isLoggedIn, (req, res) => {
//     res.render("dashboard", {
//         name: req.user.username
//     });
// });



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
            if(result.length > 0) {
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
                            console.log(result);
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

// Test route: it's going to be changed

router.get("/", (req, res, next) => {

    const q = "SELECT name, price, amount, total_price, created_at, COUNT(*) AS numberOfItems FROM products";
    db.query(q, (err, result) => {
        if (err) console.log(err);
         const name = result[0].name;
         const price = result[0].price;
         const amount = result[0].amount;
         const total_price = result[0].total_price;
         const numOfItems = result[0].numberOfItems;
    
        console.log(result);
        
        
        res.render('home', {result, numOfItems});
        
    });
    
});



// router.get("/", (req, res, next) => {

//         console.log(req.query);
//         const q1 = `SELECT name, created_at FROM products WHERE YEAR(created_at) = ${req.query.year}`;
//         db.query(q1, (err, result) => {
//             console.log(result);
//             res.send(result);
//         });

// });


module.exports = router;

