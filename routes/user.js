const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // or 'bcryptjs' if using bcryptjs
const db = require('../db/dbConfig');

// Number of salt rounds for bcrypt
const saltRounds = 10;
// post req for signup
router.post('/signup', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }

    const sql = 'INSERT INTO signup (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)';
    const values = [firstname, lastname, email, hashedPassword];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
      } else {
        res.status(201).json({ message: 'User successfully registered', data });
      }
    });
  });
});

//post req for login
router.post("/login", (req, res) => {
  const { email, password } = req.body
  const sql = 'SELECT * FROM signup WHERE email=$1'
  const values =[email]

  db.query(sql, values,(err, data)=> {
    if(err) {
      console.error("Database error", err)
      return res.status(500).json({error:'internal server error please try again'})
    }
    if (data.rows.length === 0) {
      return res.status(401).json({error:'Invalid email or password'})
    }
    const user = data.rows[0]
    //comparison
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords: ", err);
        return res.status(500).json({error:'internal server error. Please try again later'})
      }
      if (result) {
        res.status(200).json({message:'Login succesful',user})
      } else {
        res.status(401).json({ error: 'Invalid email or password.' });
      }
    })
  })
})

// Update User Profile
router.put('/update-profile', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
});


 module.exports = router