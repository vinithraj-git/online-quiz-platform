const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/result", (req, res) => {

    const { email, score } = req.body;

    const sql = "INSERT INTO results(email, score) VALUES (?, ?)";

    db.query(sql, [email, score], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Failed");
        }

        res.send("Result Saved");

    });

});

module.exports = router;