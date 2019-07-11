const express = require("express");
const router = express.Router();
const db = require("../db/db");
const helperFunctions = require("../public/scripts/helperFunctions");


const { isLoggedIn } = require("../middleware"); 

router.get("/", isLoggedIn, (req, res) => {
    helperFunctions.yyyymmdd();

    const user_id = req.user.id;
    const date = new Date();
    const today = date.yyyymmdd(); 
    // show items that you sold today
    const q = "SELECT * FROM products WHERE user_id = ? && type = 'S' && DATE_FORMAT(created_at, '%Y-%m-%d') = CURDATE();";

    db.query(q, user_id, (err, result) => {
        console.log(result);
        res.render("sales", {
            products : result
        });
    });
});

router.post("/", isLoggedIn, (req, res) => {
    const { name, price, amount, total_price, type, description } = helperFunctions.trim(req.body);
    const user_id = req.user.id;
    const query = "INSERT INTO products (name, user_id, price, amount, total_price, type, description) VALUES(?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [name, user_id, price, amount, total_price, type, description], (err, result) => {
        console.log(result);
        if (err) {
            req.flash("error", "Please enter data correctly");
            res.redirect("/sales");
            console.log(err);
        }
            req.flash("success", "The data is successfully saved in DB");
            res.redirect("/sales");
    });
});



// Show a product edit form
router.get("/products/:product_id/edit", isLoggedIn, (req, res) => {
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
router.put("/products/:product_id/edit", isLoggedIn, (req, res) => {
    const { name, price, amount, total_price, type, description } = helperFunctions.trim(req.body);
    const user_id = req.user.id;
    const product_id = req.params.product_id;
    // simple validation just in case a user enters no value in each input
    if( name.length === 0 || price.value <= 0 || amount.value <= 0 || description.length === 0 ){
        req.flash("error", "You should enter all data");
        res.redirect(`/sales/products/${product_id}/edit`);
        return;
    }
    const query = "UPDATE products SET name = ?, price = ?, amount = ?, total_price = ?, type = ?, description = ? WHERE id = ? && user_id = ?";
    db.query(query, [name, price, amount, total_price, type, description, product_id, user_id], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        req.flash("success", "The data is updated");
        res.redirect("/sales");
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
        res.redirect("/sales");
    });
});





module.exports = router;