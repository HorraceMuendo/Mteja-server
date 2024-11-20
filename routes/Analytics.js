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
/////////////////////////////////////////////////////////////////////////////////////
// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100),
//     email VARCHAR(100) UNIQUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE visits (
//     id SERIAL PRIMARY KEY,
//     user_id INT REFERENCES users(id),
//     visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     page_url VARCHAR(255),
//     visit_type VARCHAR(50)  -- e.g., 'signup', 'page_view'
// );

// TRACKING VISITS 

// app.post('/api/track-visit', (req, res) => {
//     const { userId, pageUrl, visitType } = req.body;
//     const query = `
//         INSERT INTO visits (user_id, page_url, visit_type) 
//         VALUES ($1, $2, $3) RETURNING *;
//     `;
//     const values = [userId, pageUrl, visitType];
    
//     db.query(query, values, (err, result) => {
//         if (err) {
//             console.error('Error tracking visit:', err);
//             return res.status(500).json({ error: 'Failed to track visit.' });
//         }
//         res.status(201).json({ message: 'Visit tracked successfully', visit: result.rows[0] });
//     });
// });


// Whenever a user performs an action like visiting a page or signing up, make a POST request to this endpoint.

// Example POST request to track visit:
// const trackVisit = async (userId, pageUrl, visitType) => {
//     try {
//         await axios.post('/api/track-visit', {
//             userId,
//             pageUrl,
//             visitType
//         });
//     } catch (error) {
//         console.error('Error tracking visit:', error);
//     }
// };

////////////////////////////////////Fetching real-time analytics 

// app.get('/api/analytics', async (req, res) => {
//     try {
//         // Fetch the total visits and signups per month
//         const customerBehaviorQuery = `
//             SELECT 
//                 TO_CHAR(visit_time, 'Month') AS month,
//                 COUNT(*) FILTER (WHERE visit_type = 'page_view') AS visits,
//                 COUNT(*) FILTER (WHERE visit_type = 'signup') AS signups
//             FROM visits
//             WHERE visit_time >= NOW() - INTERVAL '3 months'  -- Get last 3 months data
//             GROUP BY TO_CHAR(visit_time, 'Month')
//             ORDER BY TO_CHAR(visit_time, 'Month');
//         `;
        
//         const salesTrendsQuery = `
//             SELECT 
//                 TO_CHAR(visit_time, 'Month') AS month,
//                 SUM(sale_amount) AS sales
//             FROM sales
//             WHERE visit_time >= NOW() - INTERVAL '3 months'
//             GROUP BY TO_CHAR(visit_time, 'Month')
//             ORDER BY TO_CHAR(visit_time, 'Month');
//         `;
        
//         const customerBehavior = await db.query(customerBehaviorQuery);
//         const salesTrends = await db.query(salesTrendsQuery);
        
//         res.json({
//             customerBehavior: customerBehavior.rows,
//             salesTrends: salesTrends.rows
//         });
//     } catch (err) {
//         console.error('Error fetching analytics data:', err);
//         res.status(500).json({ error: 'Failed to fetch analytics data.' });
//     }
// });
