const express = require('express')
const router = express.Router()
const db =require('../db/dbConfig')

router.post("/signup", (req, res) => {
    const sql = "INSERT INTO users(`firstname`,`lastname`,`email`,`password` Values (?))"
    const Values = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, [Values], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            res.json(data)
        }
    })
})