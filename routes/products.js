const express = require("express");
const router = express.Router();
const db = require("../db/db");


router.get("/", (req, res, next) => {
    res.send("This is Products route!");
});


module.exports = router;
