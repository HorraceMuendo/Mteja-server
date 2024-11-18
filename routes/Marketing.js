const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

// Create a new campaign
router.post('/', async (req, res) => {
    const { name, startDate, endDate, targetAudience, budget, message, performanceMetrics } = req.body;
    try {
        const newCampaign = new Campaign({ name, startDate, endDate, targetAudience, budget, message, performanceMetrics });
        await newCampaign.save();
        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(500).json({ message: 'Error creating campaign', error });
    }
});

// Get all campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching campaigns', error });
    }
});

// Get a specific campaign by ID
router.get('/:id', async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching campaign', error });
    }
});

// Update a campaign
router.put('/:id', async (req, res) => {
    try {
        const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCampaign);
    } catch (error) {
        res.status(500).json({ message: 'Error updating campaign', error });
    }
});

// Delete a campaign
router.delete('/:id', async (req, res) => {
    try {
        const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Campaign deleted', deletedCampaign });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting campaign', error });
    }
});

module.exports = router;




/////////////////////campaign model
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    targetAudience: { type: String, required: true },
    budget: { type: Number, required: true },
    message: { type: String, required: true },
    performanceMetrics: {
        type: Map,
        of: Number,
        default: {}
    },
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
