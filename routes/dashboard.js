const express = require("express");
const router = express.Router();
const db = require("../db/db");

const { isLoggedIn } = require("../middleware"); 

// Show whole info of user


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
    
    // if there is a data, products will be shown. Otherwise, "No data" shows up in the template
    const q = "SELECT * FROM products WHERE user_id = ?;" +
              "SELECT MIN(price) AS min_price FROM products WHERE user_id = ? && DATE_FORMAT(created_at, '%Y-%m-%d') = ?;" +
              "SELECT SUM(total_price) AS total_price FROM products WHERE user_id = ? && DATE_FORMAT(created_at, '%Y-%m-%d') = ?;" +
              "SELECT SUM(total_price) AS total_price FROM products WHERE user_id = ? && DATE(NOW()) >= DATE_SUB(DATE(NOW()), INTERVAL 7 DAY);" +
              "SELECT MIN(price) AS min_price FROM selling_products WHERE user_id = ? &&  DATE_FORMAT(created_at, '%Y-%m-%d') = ?;" +
              "SELECT SUM(total_price) AS total_selling_price FROM selling_products WHERE user_id = ? && DATE_FORMAT(created_at, '%Y-%m-%d') = ?;" +
              "SELECT SUM(total_price) AS total_selling_price FROM selling_products WHERE user_id = ? && DATE(NOW()) >= DATE_SUB(DATE(NOW()), INTERVAL 7 DAY);" 
    db.query(q, [user_id, user_id, today, user_id, today, user_id, user_id, today, user_id, today, user_id], (err, result) => {
        if (err) console.log(err);
            console.log(result);
            res.render("dashboard", {
                name: req.user.username,
                products: result
            });
            req.flash("success", "You are successfully logged in");
    });
});

// Create product in DB
router.post("/", isLoggedIn, (req, res) => {
    const { name, price, amount, total_price, description } = req.body;
    const user_id = req.user.id;
    const query = "INSERT INTO products (name, user_id, price, amount, total_price, description) VALUES(?, ?, ?, ?, ?, ?)";
    db.query(query, [name, user_id, price, amount, total_price, description], (err, result) => {
        console.log(result);
        if (err) console.log(err);
            req.flash("success", "The data is successfully saved in DB");
            res.redirect("/dashboard");
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
                product_id,
                name,
                price,
                amount,
                total_price,
                description
            });
        
    });
});


// Update 
router.put("/products/:product_id", isLoggedIn, (req, res) => {
    const { name, price, amount, total_price, description } = req.body;
    const user_id = req.user.id;
    const product_id = req.params.product_id;
    const query = "UPDATE products SET name = ?, price = ?, amount = ?, total_price = ?, description = ? WHERE id = ? && user_id = ?";
    db.query(query, [name, price, amount, total_price, description, product_id, user_id], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        req.flash("success", "The data is updated");
        res.redirect("/dashboard");
    });
});


// Delete  
router.delete("/products/:product_id", isLoggedIn, (req, res) => {
    const product_id = req.params.product_id;
    const user_id = req.user.id;
    const query = "DELETE from products WHERE id = ? && user_id = ?";
    db.query(query, [product_id, user_id], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        req.flash("success", "The data is deleted");
        res.redirect("/dashboard");
    });
});


module.exports = router;