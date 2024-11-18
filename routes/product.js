const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');


//get all products
router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM products';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
      }
      res.json(result.rows);
    });
  });

router.post('/add', (req, res) => {
    const { name, price, category } = req.body; // Use object destructuring

    const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3)';
    const values = [name, price, category];

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



// update and delete endpoints

// router.put('/update/:id', (req, res) => {
//   const productId = req.params.id;
//   const { name, price, category } = req.body;

//   const sql = 'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4';
//   const values = [name, price, category, productId];

//   db.query(sql, values, (err, result) => {
//       if (err) {
//           console.error('Database error:', err);
//           return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//       }
//       if (result.rowCount === 0) {
//           return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json({ message: 'Product successfully updated' });
//   });
// });

// // Delete a product by ID
// router.delete('/delete/:id', (req, res) => {
//   const productId = req.params.id;

//   const sql = 'DELETE FROM products WHERE id = $1';
//   const values = [productId];

//   db.query(sql, values, (err, result) => {
//       if (err) {
//           console.error('Database error:', err);
//           return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//       }
//       if (result.rowCount === 0) {
//           return res.status(404).json({ error: 'Product not found' });
//       }
//       res.json({ message: 'Product successfully deleted' });
//   });
// });