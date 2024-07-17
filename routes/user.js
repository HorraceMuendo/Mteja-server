const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.post("/signup", (req, res) => {
const sql = 'INSERT INTO signup (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)';
const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.password, // Assuming password hashing is done elsewhere
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: "Internal server error. Please try again later." }); // Informative error message
    } else {
      res.status(201).json({ message: "User successfully registered", data });
    }
  });
});

module.exports = router; // Assuming this is exported for use in your main server file

