const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.get("/", (req, res, next) => {
    res.render('home');
});

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


router.get("/", (req, res, next) => {
    const query = "SELECT * FROM products";
    db.query(query, (err, result) => {
    if(err) console.log(err);
    console.log(result);
});
});

// const query = "DELETE FROM products WHERE name = 'cell phone'";



module.exports = router;

