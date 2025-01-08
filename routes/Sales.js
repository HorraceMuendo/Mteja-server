const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');


// Get all leads
router.get("/leads", async (req, res) => {
  const sql = 'SELECT * from leads'

  db.query(sql, (err,result)=>{
    if (err) {
        console.log('Database error:', err)
        return res.status(500).json({error: 'Internal server error plaease try again later  '})
    }
    res.json(result.rows)
})
});

// Add a new lead
router.post("/leads", async (req, res) => {
  const { name, email, phone, status } = req.body;

  const sql = 'INSERT INTO leads (name, email, phone, status) VALUES ($1, $2, $3, $4)';
    const values = [name, email, phone, status];

    // Adding the contacts to db
    db.query(sql, values, (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
          res.status(201).json({ message: 'leads successfully added', data });
        }
    });
});

// // Update lead status
// router.put("/leads/:id", async (req, res) => {
//   const { status } = req.body;
//   try {
//     const updatedLead = await Lead.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.json(updatedLead);
//   } catch (error) {
//     res.status(500).send("Error updating lead status");
//   }
// });


router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM leads WHERE id = $1';
  const values = [id];

  db.query(sql, values, (err, data) => {
      if (err) {
          console.error('Database error: ', err);
          return res.status(500).json({ error: 'Internal server error. Please try again later.' });
      }
      res.status(204).send(); // No content to return on successful delete
  });
});




router.post("/add", async (req, res) => {
  const { date, amount, category } = req.body;

  const sql = 'INSERT INTO sales (date, amount, category) VALUES ($1, $2, $3)';
    const values = [date, amount, category];

    // Adding the contacts to db
    db.query(sql, values, (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
          res.status(201).json({ message: 'Sales successfully added', data });
        }
    });
});



// GET route to fetch all sales data
router.get("/list", async (req, res) => {
  const sql = 'SELECT * from sales'

  db.query(sql, (err,result)=>{
    if (err) {
        console.log('Database error:', err)
        return res.status(500).json({error: 'Internal server error plaease try again later  '})
    }
    res.json(result.rows)
})
});







router.get("/performance", async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM leads');

    const totalLeads = rows.length;
    const closedWon = rows.filter((lead) => lead.status === 'Closed Won').length;
    const winRate = totalLeads === 0 ? 0 : (closedWon / totalLeads) * 100;

    res.json({ totalLeads, closedWon, winRate });
  } catch (error) {
    res.status(500).send("Error fetching performance data");
  }
});


module.exports = router;
