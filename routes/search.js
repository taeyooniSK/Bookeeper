const express = require("express");
const router = express.Router();
const db = require("../db/db");

const { isLoggedIn } = require("../middleware"); 





router.get("/", isLoggedIn, (req, res, next) => {
    const user_id = req.user.id;
    const today = new Date().toISOString().slice(0, 10); 
    const q = "SELECT id, user_id, name, price, amount, total_price, description, DATE_FORMAT(created_at, '%Y-%c-%d %H:%i:%s') AS created_at FROM products WHERE user_id = ? && DATE_FORMAT(created_at, '%Y-%c-%d') = CAST(? AS DATETIME)";
    db.query(q, [user_id, today], (err, result) => {
        console.log(result);
        
        res.render("search", { result });
    });

});


// After seraching, get results from DB using params and query
router.get("/:year", isLoggedIn, (req, res, next) => {

    console.log(req.params);
    console.log(req.query);
    const q = `SELECT id, user_id, name, price, amount, total_price, description, DATE_FORMAT(created_at, '%Y-%c-%d %H:%i:%s') AS created_at FROM products WHERE DATE(created_at) = '${req.params.year}-${req.query.month}-${req.query.day}'`; // req로 들어온 값들을 스트링으로 처리해줘야한다.
  
   db.query(q, (err, result) => {
        if(err){
            res.json({msg: err.message });
        }
        if(result === undefined){
            res.json("there is no such data in database!");
        } 
        
        res.render("search", { result });
 

    });

});


module.exports = router;
