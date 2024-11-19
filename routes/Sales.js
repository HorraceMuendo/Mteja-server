const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');





// Get all leads
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).send("Error fetching leads");
  }
});

// Add a new lead
app.post("/leads", async (req, res) => {
  const { name, email, phone, status, value } = req.body;
  const newLead = new Lead({ name, email, phone, status, value });
  try {
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).send("Error adding lead");
  }
});

// Update lead status
app.put("/leads/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedLead);
  } catch (error) {
    res.status(500).send("Error updating lead status");
  }
});

// Delete a lead
app.delete("/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error deleting lead");
  }
});

// Sales Performance Metrics
app.get("/api/sales/performance", async (req, res) => {
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


