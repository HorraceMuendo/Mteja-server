const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/salesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: { type: String, default: "New" },
  value: Number,
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.model("Lead", leadSchema);

// Routes

// Get all leads
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).send("Error fetching leads");
  }
});

// Add a new lead
app.post("/api/leads", async (req, res) => {
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
app.put("/api/leads/:id", async (req, res) => {
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
app.delete("/api/leads/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
