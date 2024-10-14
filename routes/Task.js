const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.post('/add', (req,res)=>{
    const {taskname} = req.body;

    const sql = 'INSERT INTO task(taskname) values ($1)';
    const values = [taskname]

    db.query(sql,values, (err,data)=>{
        if (err) {
            console.error('Database error: ',err)
            return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
            res.status(201).json({ message: 'Contacts successfully added', data });

        }
    })

})

module.exports = router;
