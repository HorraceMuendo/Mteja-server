const express = require('express');
const router = express.Router();
const db = express('../db/dbConfigure');

router.get('/enquirires', (res,req)=>{
    const sql = 'SELECT * from enquirires'

    db.query(sql, (err,result)=>{
        if (err) {
            console.log('Database error:', err)
            return res.status(500).json({error: 'Internal server error plaease try again later  '})
        }
        res.json(result.rows)
    })

})
