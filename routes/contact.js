const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.get('/list', (req,res)=>{
    const sql = 'SELECT * from contact'

    db.query(sql, (err,result)=>{
        if (err) {
            console.log('Database error:', err)
            return res.status(500).json({error: 'Internal server error plaease try again later  '})
        }
        res.json(result.rows)
    })

})

router.post('/add', (req, res) => {
    const { name, email, subject,message } = req.body; // Use object destructuring

    const sql = 'INSERT INTO contact (name, email, subject, message) VALUES ($1, $2, $3, $4)';
    const values = [name, email, subject,message];

    // Adding the contacts to db
    db.query(sql, values, (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
          res.status(201).json({ message: 'Contacts successfully added', data });
        }
    });
});

module.exports = router;
