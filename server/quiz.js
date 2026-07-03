const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/quiz", (req, res) => {
    db.query("SELECT * FROM quizzes", (err, result) => {
        if (err) {
            return res.send(err);
        }

        res.json(result);
    });
});

module.exports = router;