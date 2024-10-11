router.get('/list', (res,req)=>{
    const sql = 'SELECT * from complain'

    db.query(sql, (err,result)=>{
        if (err) {
            console.log('Database error:', err)
            return res.status(500).json({error: 'Internal server error plaease try again later  '})
        }
        res.json(result.rows)
    })

})

router.post('/add', (req, res) => {
    const { name, price, category } = req.body; // Use object destructuring

    const sql = 'INSERT INTO complain (name, email, productcategory) VALUES ($1, $2, $3)';
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


//compliments section

router.get('/list', (res,req)=>{
    const sql = 'SELECT * from compliment'

    db.query(sql, (err,result)=>{
        if (err) {
            console.log('Database error:', err)
            return res.status(500).json({error: 'Internal server error plaease try again later  '})
        }
        res.json(result.rows)
    })

})

router.post('/add', (req, res) => {
    const { name, price, category } = req.body; // Use object destructuring

    const sql = 'INSERT INTO compliment (name, email, productcategory) VALUES ($1, $2, $3)';
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
