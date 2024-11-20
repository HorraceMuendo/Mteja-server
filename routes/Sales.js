const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');


// Get all leads
router.get("/leads", async (req, res) => {
  const sql = 'SELECT * from contact'

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

  const sql = 'INSERT INTO sales (name, email, phone, status) VALUES ($1, $2, $3, $4)';
    const values = [name, email, phone, status];

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

// // Delete a lead
// router.delete("/leads/:id", async (req, res) => {
//   try {
//     await Lead.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).send("Error deleting lead");
//   }
// });

// Sales Performance Metrics
router.get("/performance", async (req, res) => {
  try {
    const leads = await Lead.find();
    const totalLeads = leads.length;
    const closedWon = leads.filter((lead) => lead.status === "Closed Won").length;
    const winRate = (closedWon / totalLeads) * 100 || 0;

    res.json({ totalLeads, closedWon, winRate });
  } catch (error) {
    res.status(500).send("Error fetching performance data");
  }
});


module.exports = router;
