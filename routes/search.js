const express = require("express");
const router = express.Router();
const db = require("../db/db");

const { isLoggedIn } = require("../middleware"); 





router.get("/", isLoggedIn, (req, res, next) => {
    const user_id = req.user.id;
    const today = new Date().toISOString().slice(0, 10); 
    // const q1 = `SELECT * FROM products WHERE user_id = ?`;
    const q = "SELECT id, user_id, name, price, amount, total_price, description, DATE_FORMAT(created_at, '%Y-%c-%d %H:%i:%s') AS created_at FROM products WHERE user_id = ? && DATE_FORMAT(created_at, '%Y-%c-%d') = CAST(? AS DATETIME)";
    db.query(q, [user_id, today], (err, result) => {
        console.log(result);

        res.render("search", { result });
    });
});


// After seraching, get results from DB using params and query
router.get("/:year", isLoggedIn, (req, res, next) => {
    const { year } = req.params;
    const { month, day, year2, month2, day2 } = req.query;
    console.log(req.params);
    console.log(req.query);

    const start = `${year}-${month}-${day}`;
    const end = `${year2}-${month2}-${day2}`;
    const q = "SELECT * FROM products WHERE created_at >= ? AND created_at <= ?";
    
    db.query(q, [start, end],(err, result) => {
        // if(err){
        //     res.json({msg: err.message });
        // }
        // if(result === undefined){
        //     res.json("there is no such data in database!");
        // } 
        console.log(result);
        
        res.render("search", { result });

    });
    
});


module.exports = router;
