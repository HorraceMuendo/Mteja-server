const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.get('/list', (req,res)=>{
    const sql = 'SELECT * from enquiries'

    db.query(sql, (err,result)=>{
        if (err) {
            console.log('Database error:', err)
            return res.status(500).json({error: 'Internal server error plaease try again later  '})
        }
        res.json(result.rows)
    })

})

router.post('/add', (req, res) => {
    const { name, email, productdetails } = req.body; // Use object destructuring

    const sql = 'INSERT INTO enquiries (name, email, productdetails) VALUES ($1, $2, $3)';
    const values = [name, email, productdetails];

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
  
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params; // Extract the id from the URL parameters

    const sql = 'DELETE FROM enquiries WHERE id = $1';
    const values = [id];

    // Deleting the product from the database
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        }

        if (data.rowCount === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product successfully deleted' });
    });
});



// Get the count of enquiries
router.get("/count", (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM enquiries';  // SQL query to count rows in the "enquiries" table
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log('Database error:', err);
        return res.status(500).json({ error: 'Internal server error, please try again later' });
      }
      // Return the count from the result
      res.json({ count: result.rows[0].count });
    });
  });
  
  


module.exports = router;


