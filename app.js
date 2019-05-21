const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");


// Passport config
require("./passport_config/passport")(passport);

// DB

const config = require("./db/config");
const db = require("./db/db");



// view engine
app.use('/static', express.static(__dirname + "public"));
app.set("view engine", "ejs");



// routes

const index = require("./routes/index");
const products = require("./routes/products");
const search = require("./routes/search");


// Express Session

app.use(require("express-session")({
    secret: "Something secret!",
    resave: true, // 이 property 무슨 역할하는지 알아낼것
    saveUninitialized: true // 이 property 무슨 역할하는지 알아낼것
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());


// Global variable 만들기 -res.locals는 request의 scope에서 response의 지역변수들을 포함하고 있음 
app.use((req, res, next) => {  
    //res.locals.user = req.user; // Dashboard (다른 템플릿도 포함, view 단에서 변수로 쓸 수 있음 그런데 굳이 여기서 할 필요 없고 dashboard 라우터에서 req.user로 전달하는게 낫다.
    res.locals.error = req.flash("error");
    res.locals.error1 = req.flash("error1"); // login passport error
    res.locals.success = req.flash("success");
    next();
});

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