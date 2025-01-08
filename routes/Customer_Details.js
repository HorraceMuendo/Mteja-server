const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // or 'bcryptjs' if using bcryptjs
const db = require('../db/dbConfig');

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



//  const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// const db = require('./db'); // Assuming you have this set up for DB interaction

// const saltRounds = 10;  // Set the desired salt rounds for bcrypt

// // Create a transporter for sending emails
// let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'your.email@gmail.com', // Your email address
//         pass: 'yourpassword' // Your email password or app password
//     }
// });

// // Define a function to send a welcome email
// const sendWelcomeEmail = (userEmail) => {
//     const mailOptions = {
//         from: 'your.email@gmail.com',
//         to: userEmail,
//         subject: 'Welcome to our platform!',
//         text: 'Thank you for registering with us!',
//         html: '<p>Thank you for <b>registering</b> with us!</p>',
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email:', error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// };

// // Route to handle user signup
// router.post('/signup', (req, res) => {
//     const { firstname, lastname, email, password } = req.body;

//     // Hash the password
//     bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
//         if (err) {
//             console.error('Error hashing password:', err);
//             return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//         }

//         const sql = 'INSERT INTO customer_details (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)';
//         const values = [firstname, lastname, email, hashedPassword];

//         db.query(sql, values, (err, data) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//             } else {
//                 // Send a welcome email to the new user
//                 sendWelcomeEmail(email);

//                 res.status(201).json({ message: 'User successfully registered', data });
//             }
//         });
//     });
// });




// // Create a transporter for sending emails
// let transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//       user: 'mtejacrm@gmail.com', // Your email address
//       pass: 'mtejacrm001' // Your email password or app password
//   }
// });

// const sendWelcomeEmail = (userEmail, userName, loyaltyPoints) => {
//   const mailOptions = {
//       from: 'mtejacrm@gmail.com',
//       to: userEmail,
//       subject: 'Welcome to our platform!',
//       text: `Hi ${userName},\n\nThank you for signing up! You have earned ${loyaltyPoints} loyalty points.`,
//       html: `
//           <html>
//               <body>
//                   <h2>Welcome to our platform, ${userName}!</h2>
//                   <p>Thank you for joining us. As a welcome gift, you have earned <b>${loyaltyPoints}</b> loyalty points!</p>
//                   <p>Use your points to get discounts on future purchases or special offers.</p>
//                   <p>We look forward to serving you!</p>
//                   <a href="https://www.yourwebsite.com/shop">Shop Now</a>
//                   <p>If you wish to unsubscribe from future emails, <a href="https://www.yourwebsite.com/unsubscribe">click here</a>.</p>
//               </body>
//           </html>`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           console.error('Error sending welcome email:', error);
//       } else {
//           console.log('Welcome email sent to ' + userEmail + ': ' + info.response);
//       }
//   });
// };



// // Number of salt rounds for bcrypt
// const saltRounds = 10;
// // post req for signup

// router.post('/signup', (req, res) => {
//   const { firstname, lastname, email, password } = req.body;

//   // Hash the password
//   bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
//       if (err) {
//           console.error('Error hashing password:', err);
//           return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//       }

//       const loyaltyPoints = 100; // Points for signing up

//       const sql = 'INSERT INTO customer_details (firstname, lastname, email, password, loyalty_points) VALUES ($1, $2, $3, $4, $5)';
//       const values = [firstname, lastname, email, hashedPassword, loyaltyPoints];

//       db.query(sql, values, (err, data) => {
//           if (err) {
//               console.error('Database error:', err);
//               return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//           } else {
//               // Send a welcome email to the new user with their loyalty points info
//               sendWelcomeEmail(email, firstname, loyaltyPoints);

//               res.status(201).json({ message: 'User successfully registered', data });
//           }
//       });
//   });
// });
