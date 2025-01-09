const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');



router.get('/complains/list', (req,res)=>{
    const sql = 'SELECT * from complain'

    db.query(sql, (err,result)=>{
        if (err) {
            console.log('Database error:', err)
            return res.status(500).json({error: 'Internal server error plaease try again later  '})
        }
        res.json(result.rows)
    })

})

router.post('/complains/add', (req, res) => {
    const { name, email, complain } = req.body; // Use object destructuring

    const sql = 'INSERT INTO complain (name, email, complain) VALUES ($1, $2, $3)';
    const values = [name, email, complain];

    // Adding the products to db
    db.query(sql, values, (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
          res.status(201).json({ message: 'Complain successfully sent', data });
        }
    });
});


//compliments section

router.get('/compliments/list', (req,res)=>{
    const sql = 'SELECT * from compliment'

    db.query(sql, (err,result)=>{
        if (err) {
            console.log('Database error:', err)
            return res.status(500).json({error: 'Internal server error plaease try again later  '})
        }
        res.json(result.rows)
    });

});

router.post('/compliments/add', (req, res) => {
    const { name, email, compliment } = req.body; // Use object destructuring

    const sql = 'INSERT INTO compliment (name, email, compliment) VALUES ($1, $2, $3)';
    const values = [name, email, compliment];

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


router.get("/compliments/count", (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM compliment';  // SQL query to count rows in the "enquiries" table
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log('Database error:', err);
        return res.status(500).json({ error: 'Internal server error, please try again later' });
      }
      // Return the count from the result
      res.json({ count: result.rows[0].count });
    });
  });

  router.get("/complains/count", (req, res) => {
    const sql = 'SELECT COUNT(*) AS count FROM complain';  // SQL query to count rows in the "enquiries" table
  
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
