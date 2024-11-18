// const express = require('express');
// const router = express.Router();
// const db = require('../db/dbConfig');

// router.post('/add', (req,res)=>{
//     const {taskname} = req.body;

//     const sql = 'INSERT INTO task(taskname) values ($1)';
//     const values = [taskname]

//     db.query(sql,values, (err,data)=>{
//         if (err) {
//             console.error('Database error: ',err)
//             return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//         } else {
//             res.status(201).json({ message: 'Task successfully added', data });

//         }
//     })

// })

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../db/dbConfig');

// router.post('/add', (req, res) => {
//     const { taskname, deadline } = req.body; // Accept deadline from request body

//     // SQL query to insert both task name and deadline
//     const sql = 'INSERT INTO task (taskname, deadline) VALUES ($1, $2) RETURNING *';
//     const values = [taskname, deadline]; // Include deadline in values array

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error('Database error: ', err);
//             return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//         } else {
//             res.status(201).json({ message: 'Task successfully added', data: data.rows[0] }); // Send back the newly created task
//         }
//     });
// });

// module.exports = router;


// modified backend


const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

// Route to add a task
router.post('/add', (req, res) => {
    const { taskname, deadline } = req.body; // Ensure you're capturing the deadline

    const sql = 'INSERT INTO task (taskname, deadline) VALUES ($1, $2)';
    const values = [taskname, deadline]; // Include the deadline in the values

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
            res.status(201).json({ message: 'Task successfully added', data: data.rows[0] }); // Send back the newly created task
        }
    });
});

// Route to fetch all tasks
router.get('/list', (req, res) => {
    const sql = 'SELECT * FROM task'; // Adjust this query to match your table structure

    db.query(sql, (err, data) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        }
        res.status(200).json(data.rows); // Return the list of tasks
    });
});

// // Route to update task status (Optional)
// router.put('/update/:id', (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     const sql = 'UPDATE task SET status = $1 WHERE id = $2 RETURNING *';
//     const values = [status, id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error('Database error: ', err);
//             return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//         }
//         res.status(200).json({ message: 'Task status updated', data: data.rows[0] });
//     });
// });

// Route to delete a task
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM task WHERE id = $1';
    const values = [id];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        }
        res.status(204).send(); // No content to return on successful delete
    });
});

module.exports = router;
