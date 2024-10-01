const express = require('express')
const router =  express.Router()
const db = require('../db/dbConfig')

// fetch all products endpoint
router.get('/list',(req,res)=>{
    const sql = 'SELECT * from reports';

    db.query(sql,(err,result)=>{
        if (err) {
            console.log('Database  error: ' ,err);
            return res.status(500).json({error : 'Internal server error. Please try again later.'})
        }
        res.json(result.rows);
    });
});

// add reports

router.post('/add',(req,res) => {
    
})