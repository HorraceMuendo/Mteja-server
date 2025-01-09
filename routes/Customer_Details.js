const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // or 'bcryptjs' if using bcryptjs
const db = require('../db/dbConfig');
const nodemailer = require("nodemailer");


const saltRounds = 10;  // Set the desired salt rounds for bcrypt

router.post('/signup', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
      const loyaltyPoints = 100; // Points for signing up

      const sql = 'INSERT INTO customer_details (firstname, lastname, email, password, loyalty_points) VALUES ($1, $2, $3, $4, $5)';
      const values = [firstname, lastname, email, hashedPassword, loyaltyPoints];


    // const sql = 'INSERT INTO customer_details (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)';
    // const values = [firstname, lastname, email, hashedPassword];

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
  const sql = 'SELECT * FROM customer_details WHERE email=$1'
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


router.get('/emails', (req, res) => {
  const sql = 'SELECT email FROM customer_details';  // Query to fetch emails

  db.query(sql, (err, result) => {
    if (err) {
      console.log('Database error:', err);  // Log error if it occurs
      return res.status(500).json({
        error: 'Internal server error, please try again later.'
      });
    }
    res.json(result.rows);  // Send the result (emails) as JSON
  });
});

// router.post("/email/send", async (req, res) => {
//   const { subject, body, recipients } = req.body;

//   // Create a transporter for nodemailer (using Gmail for this example)
//   let transporter = nodemailer.createTransport("SMTP",{
//     service: "gmail",
//     auth: {
//       user: "crmmteja@gmail.com",
//       pass: "mTeja001*#", // Use environment variables for security
//     },
  
//   });

//   // Define email options
//   const mailOptions = {
//     from: "crmmteja@gmail.com",
//     to: recipients.join(", "), // Join all email addresses with a comma
//     subject: subject,
//     text: body,
//   };

//   try {
//     // Send email
//     await transporter.sendMail(mailOptions);
//     res.json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email", error);
//     res.status(500).send("Error sending email");
//   }
// });


router.post("/email/send", async (req, res) => { const { subject, body, recipients } = req.body; // Create a transporter for nodemailer (using Gmail for this example)
 let transporter = nodemailer.createTransport({ 
  service: "gmail", 
  auth: { user: "crmmteja@gmail.com", pass: "mTeja001*#",  }, 
  secure: true,
   port: 465, });
   // Define email options
    const mailOptions = {
       from:"crmmteja@gmail.com", 
      to: recipients.join(", "), // Join all email addresses with a comma 
      subject: subject, 
      text: body, }; 
      try { // Send email 
        await transporter.sendMail(mailOptions); res.json({ message: "Email sent successfully!" }); } catch (error) { console.error("Error sending email", error); res.status(500).send("Error sending email"); } });


 module.exports = router


