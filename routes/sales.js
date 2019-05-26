const express = require("express");
const router = express.Router();
const db = require("../db/db");


const { isLoggedIn } = require("../middleware"); 

router.get("/", isLoggedIn, (req, res) => {
    Date.prototype.yyyymmdd = function (){
        const yyyy = this.getFullYear(); 
        const mm = this.getMonth() + 1; // getMonth() is 0 based
        const dd = this.getDate();

        return [yyyy, (mm > 9 ? "" : "0" ) + mm, (dd > 9 ? "" : "0" ) + dd].join("-");
    };

    const user_id = req.user.id;
    const date = new Date();
    const today = date.yyyymmdd(); 

    const q = "SELECT * FROM products WHERE user_id = ? && type = 'S';";

    db.query(q, user_id, (err, result) => {
        console.log(result);
        res.render("sales", {
            products : result
        });
    });
});

router.post("/", isLoggedIn, (req, res) => {
    const { name, price, amount, total_price, type, description } = req.body;
    const user_id = req.user.id;
    const query = "INSERT INTO products (name, user_id, price, amount, total_price, type, description) VALUES(?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [name, user_id, price, amount, total_price, type, description], (err, result) => {
        console.log(result);
        if (err) console.log(err);
            req.flash("success", "The data is successfully saved in DB");
            res.redirect("/sales");
    });
});



// Show a product edit form
router.get("/:product_id/edit", isLoggedIn, (req, res) => {
    const product_id = req.params.product_id;
    const user_id = req.user.id;
    db.query("SELECT * FROM products WHERE id = ? && user_id = ?", [product_id, user_id], (err, result) => {
        const { name, price, amount, total_price, type, description } = result[0];
        if (err) console.log(err);
            res.render("sales_edit", {
                product_id,
                name,
                price,
                amount,
                total_price,
                type,
                description
            });
        
    });
});


// Update 
router.put("/:product_id", isLoggedIn, (req, res) => {
    const { name, price, amount, total_price, type, description } = req.body;
    const user_id = req.user.id;
    const product_id = req.params.product_id;
    const query = "UPDATE products SET name = ?, price = ?, amount = ?, total_price = ?, type = ?, description = ? WHERE id = ? && user_id = ?";
    db.query(query, [name, price, amount, total_price, type, description, product_id, user_id], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        req.flash("success", "The data is updated");
        res.redirect("/sales");
    });
});


// Delete  
router.delete("/:product_id", isLoggedIn, (req, res) => {
    const product_id = req.params.product_id;
    const user_id = req.user.id;
    const query = "DELETE from products WHERE id = ? && user_id = ?";
    db.query(query, [product_id, user_id], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        req.flash("success", "The data is deleted");
        res.redirect("/sales");
    });
});





module.exports = router;