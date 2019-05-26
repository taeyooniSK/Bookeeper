const express = require("express");
const router = express.Router();
const db = require("../db/db");

const { isLoggedIn } = require("../middleware"); 





router.get("/", isLoggedIn, (req, res, next) => {
    const user_id = req.user.id;
    const today = formatDate();

    function formatDate(){
        let year, month, day;
            year = new Date().getFullYear();
            month = new Date().getMonth() + 1;
            day = new Date().getDate();
         return [year, month, day].join("-");
     }
    // const q1 = `SELECT * FROM products WHERE user_id = ?`;
    const q = "SELECT id, user_id, name, price, amount, total_price, type, description, DATE_FORMAT(created_at, '%Y-%c-%d %H:%i:%s') AS created_at FROM products WHERE user_id = ? && DATE_FORMAT(created_at, '%Y-%c-%d') = CAST(? AS DATETIME)";
    db.query(q, [user_id, today], (err, result) => {
        console.log(result);

        res.render("search", { result });
    });
});


// After seraching, get results from DB using params and query
router.get("/:year", isLoggedIn, (req, res, next) => {
    const user_id = req.user.id;
    const { year } = req.params;
    const { month, day, year2, month2, day2, type } = req.query;
    console.log(req.params);
    console.log(req.query);

    const start = `${year}-${month}-${day}`;
    const end = `${year2}-${month2}-${day2+1}`; // 만약 created_at <= 5월 23일 로 해버리면 23일 0시를 기준으로 되기때문에 정작 23일에 추가한 데이터는 볼 수 없음 그래서 1 플러스해서 24시 0시로 맞춤
    
    let q;
    let queryArgs;

    if ( type === "Both"){
        q = "SELECT * FROM products WHERE user_id = ? && created_at >= ? && created_at <= ?";
        queryArgs = [user_id, start, end];
    } else {
        q = "SELECT * FROM products WHERE user_id = ? && type= ? && created_at >= ? && created_at <= ?";
        queryArgs = [user_id, type, start, end];
    }
    
    db.query(q, queryArgs, (err, result) => {
        if(err){
            res.json({msg: err.message });
        }
        // if(result === undefined){
        //     res.json("there is no such data in database!");
        // } 
        console.log(result);
        
        res.render("search", { result });

    });
    
});


module.exports = router;
