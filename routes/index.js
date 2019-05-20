const express = require("express");
const router = express.Router();
const db = require("../db/db");
const passport = require("passport");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");






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
/*
// Login handle
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


router.get("/signup", (req, res) => {
    res.render("signup");
});


router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});





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
                            // res.send("you signed up");
                            // passport.authenticate("local")(req, res, () => {
                            //     req.flash("success", `Wecome to Bookeeping ${result[0].username}`);
                            //     res.redirect("/");
                            // });
                        });
                    })
                });

            }
        })
    }
    
});



router.get("/", (req, res, next) => {

    // const q = "SELECT COUNT(*) AS total FROM products";
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



router.get("/", (req, res, next) => {

        console.log(req.query);
        const q1 = `SELECT name, created_at FROM products WHERE YEAR(created_at) = ${req.query.year}`;
       //const q2 = "SELECT name, price, amount, total_price, created_at, COUNT(*) AS numberOfItems FROM products";
        db.query(q1, (err, result) => {
            console.log(result);
            res.send(result);
        });
        // res.send(req.query.year);
  
});



// router.get("/", (req, res, next) => {
//     //const q = "SELECT COUNT(*) AS total FROM products";
//     // console.log(req);
//     console.log(req.query);
//     const q = `SELECT name, created_at FROM products WHERE YEAR(created_at) = ${req.query.year}`;
//     db.query(q, (err, result) => {
//         //console.log(req);
//         // if (err) console.log(err);
//         console.log(result)
//         res.send(`<p>${result}</p>`);
//     });
// });









// var product = {
//     name: "cell phone",
//     price: 10000,
//     amount: 14,
//     description: "This is a cell phone from Samsung"
// };

// db.query("INSERT INTO products SET ?", product, (err, results) => {
//     if (err) console.log(err);
//     console.log(results);
// })


// router.get("/", (req, res, next) => {
//     const query = "SELECT * FROM products";
//     db.query(query, (err, result) => {
//     if(err) console.log(err);
//     console.log(result);
// });
// });

// const query = "DELETE FROM products WHERE name = 'cell phone'";





module.exports = router;

