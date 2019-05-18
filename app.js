const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");

const mysql = require("mysql");
const config = require("./db/config");
const db = require("./db/db");

// view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routes

const index = require("./routes/index");
const products = require("./routes/products");


app.use('/', index);
app.use('/products', products);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`);
})