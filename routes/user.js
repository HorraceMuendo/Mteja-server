const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // or 'bcryptjs' if using bcryptjs
const db = require('../db/dbConfig');

// Number of salt rounds for bcrypt
const saltRounds = 10;

router.post('/signup', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }

    const sql = 'INSERT INTO signup (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)';
    const values = [firstname, lastname, email, hashedPassword];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
      } else {
        res.status(201).json({ message: 'User successfully registered', data });
      }
    });
  });
});

module.exports = router;
