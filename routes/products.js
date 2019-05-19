const express = require("express");
const router = express.Router();
const db = require("../db/db");


router.get("/", (req, res, next) => {
    res.render("products");
});



module.exports = router;
