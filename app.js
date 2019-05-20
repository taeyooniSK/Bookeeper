const express = require("express");
const app = express();
const mysql = require("mysql");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const config = require("./db/config");
const db = require("./db/db");

// view engine
app.use('/static', express.static(__dirname + "public"));
app.set("view engine", "ejs");
app.use(flash());

// routes

const index = require("./routes/index");
const products = require("./routes/products");
const search = require("./routes/search");


// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Something secret!",
    resave: false,
    saveUninitialized: false
}));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
app.use('/', index);
app.use('/products', products);
app.use('/search', search);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`);
})