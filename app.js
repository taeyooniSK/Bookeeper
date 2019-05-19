const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");

const mysql = require("mysql");
const config = require("./db/config");
const db = require("./db/db");

// view engine
app.use('/static', express.static(__dirname + "public"));
app.set("view engine", "ejs");

// routes

const index = require("./routes/index");
const products = require("./routes/products");
const search = require("./routes/search");




app.use('/', index);
app.use('/products', products);
app.use('/search', search);

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`);
})