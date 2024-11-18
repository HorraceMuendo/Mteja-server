const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');


router.get('/api/analytics', (req, res) => {
    // Sample data: in a real-world app, you'd fetch this from a database
    const analyticsData = {
        customerBehavior: [
            { month: 'January', visits: 120, signups: 15 },
            { month: 'February', visits: 135, signups: 18 },
            { month: 'March', visits: 200, signups: 22 },
            // more data...
        ],
        salesTrends: [
            { month: 'January', sales: 15000 },
            { month: 'February', sales: 17000 },
            { month: 'March', sales: 21000 },
            // more data...
        ],
    };
    
    res.json(analyticsData);
});
