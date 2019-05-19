const express = require("express");
const router = express.Router();
const db = require("../db/db");





router.get("/", (req, res, next) => {

    console.log(req.query);

    res.render("search");
   //const q = "SELECT name, price, amount, total_price, created_at, COUNT(*) AS numberOfItems FROM products";
    // db.query(q, (err, result) => {
    //     console.log(result);

    //     // res.render("search", {data: result});
    // });
    // // res.send(req.query.year);

});

// search?year=2019 
// /search 라우트에서 데이터를 받아서 



router.get("/:year", (req, res, next) => {

    console.log(req.body);
    const q1 = `SELECT name, created_at FROM products WHERE YEAR(created_at) = ${req.params.year}`;
   //const q2 = "SELECT name, price, amount, total_price, created_at, COUNT(*) AS numberOfItems FROM products";
    db.query(q1, (err, result) => {
        console.log(result[0]);

        const data = result[0].name;
        const created_at = result[0].created_at;
        // res.render("search");
        //res.json(result); // it works

        res.render("result", { result });
    });


});


module.exports = router;
