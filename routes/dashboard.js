const express = require("express");
const router = express.Router();
const db = require("../db/db");

const { isLoggedIn } = require("../middleware"); 

// Show whole info of user

router.get("/", isLoggedIn, (req, res) => {
    // if there is a data, products will be shown. Otherwise, "No data" shows up in the template
    db.query("SELECT * FROM products WHERE user_id = ?", [req.user.id], (err, result) => {
        if (err) console.log(err);
            res.render("dashboard", {
                name: req.user.username,
                products: result
            });
        
    
    });
});
// Show a product edit form
router.get("/products/:product_id/edit", isLoggedIn, (req, res) => {
    const product_id = req.params.product_id;
    const user_id = req.user.id;
    db.query("SELECT * FROM products WHERE id = ? && user_id = ?", [product_id, user_id], (err, result) => {
        const { name, price, amount, total_price, description } = result[0];
        if (err) console.log(err);
            res.render("product_edit", {
                name,
                price,
                amount,
                total_price,
                description
            });
        
    });
});

// Update 

router.put("/:product_id/edit", isLoggedIn, (req, res) => {
    
});

module.exports = router;
