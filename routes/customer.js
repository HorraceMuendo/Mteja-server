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


module.exports = router;
