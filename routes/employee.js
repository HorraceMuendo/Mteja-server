const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');


//get all products
router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM employee';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
      }
      res.json(result.rows);
    });
  });

router.post('/add', (req, res) => {
    const { name, email} = req.body; // Use object destructuring

    const sql = 'INSERT INTO employee (name, email) VALUES ($1, $2)';
    const values = [name, email];

    // Adding the products to db
    db.query(sql, values, (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
          res.status(201).json({ message: 'Product successfully added', data });
        }
    });
});
  
module.exports = router;