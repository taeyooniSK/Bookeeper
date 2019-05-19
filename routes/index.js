const express = require("express");
const router = express.Router();
const db = require("../db/db");

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

