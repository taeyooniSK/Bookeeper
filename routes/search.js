const express = require("express");
const router = express.Router();
const db = require("../db/db");





router.get("/", (req, res, next) => {


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

    console.log(req.params);
    console.log(req.query);
    const q = `SELECT name, created_at FROM products WHERE DATE(created_at) = '${req.params.year}-${req.query.month}-${req.query.day}'`; // req로 들어온 값들을 스트링으로 처리해줘야한다.
    // const q1 = `SELECT name, created_at FROM products WHERE YEAR(created_at) = ${req.params.year}`;
   //const q2 = "SELECT name, price, amount, total_price, created_at, COUNT(*) AS numberOfItems FROM products";
    
  
   db.query(q, (err, result) => {
        if(err){
            res.json({msg: err.message });
        }
        if(result === undefined){
            console.log("there is no such data in database!");
        } else {
            res.render("result", { result });
        }
            //console.log(result[0]);

        // const data = result[0].name;
        // const created_at = result[0].created_at;
        // res.render("search");
        //res.json(result); // it works

        
        
        
    });
   
    res.redirect("/"); // db 조회가 끝나고 redirect

});


module.exports = router;
