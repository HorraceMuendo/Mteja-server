// const express = require('express');
// const router = express.Router();
// const db = require('../db/dbConfig');
// const nodemailer = require('nodemailer');


// // Create a transporter
// let transporter = nodemailer.createTransport({
//     service: 'Gmail', // You can use other services like 'Yahoo', 'Outlook', etc.
//     auth: {
//         user: 'your.email@gmail.com', // Your email address
//         pass: 'yourpassword' // Your email password or app password
//     }
// });

// // Define the email options for bulk mailing
// const sendBulkEmail = (recipientEmails) => {
//     let mailOptions = {
//         from: 'your.email@gmail.com', // Sender address
//         to: recipientEmails, // List of recipients (array of emails)
//         subject: 'Hello from Nodemailer', // Subject line
//         text: 'This is a bulk email sent from a Node.js application!', // Plain text body
//         html: '<p>This is a <b>bulk email</b> sent from a <i>Node.js</i> application!</p>' // HTML body
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Bulk email sent: %s', info.messageId);
//     });
// };

//  // Get all user emails from the database for bulk mailing
//  const getEmailsSql = 'SELECT email FROM customer_details';
//  db.query(getEmailsSql, (err, result) => {
//      if (err) {
//          console.error('Error fetching emails:', err);
//          return res.status(500).json({ error: 'Internal server error. Please try again later.' });
//      } else {
//          const emails = result.rows.map(row => row.email); // Extract emails from database
//          sendBulkEmail(emails); // Send the bulk email
//      }
//  });


const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');
const nodemailer = require('nodemailer');

// Create a transporter
let transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like 'Yahoo', 'Outlook', etc.
    auth: {
        user: 'crmmteja@gmail.com', // Your email address
        pass: 'yourpassword' // Your email password or app password
    }
});

// Define the email options for bulk mailing
const sendBulkEmail = (recipientEmails) => {
    let mailOptions = {
        from: 'crmmteja@gmail.com', // Sender address
        to: recipientEmails, // List of recipients (array of emails)
        subject: 'Hello from Nodemailer', // Subject line
        text: 'This is a bulk email sent from a Node.js application!', // Plain text body
        html: '<p>This is a <b>bulk email</b> sent from a <i>Node.js</i> application!</p>' // HTML body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return { success: false, message: error };
        }
        console.log('Bulk email sent: %s', info.messageId);
        return { success: true, message: 'Bulk email sent successfully!' };
    });
};

// Route to trigger bulk email
router.post('/send-bulk-email', (req, res) => {
    // Get all user emails from the database for bulk mailing
    const getEmailsSql = 'SELECT email FROM customer_details';
    
    db.query(getEmailsSql, (err, result) => {
        if (err) {
            console.error('Error fetching emails:', err);
            return res.status(500).json({ error: 'Internal server error. Please try again later.' });
        } else {
            const emails = result.rows.map(row => row.email); // Extract emails from database
            const emailResult = sendBulkEmail(emails); // Send the bulk email

            if (emailResult.success) {
                return res.status(200).json({ message: emailResult.message });
            } else {
                return res.status(500).json({ message: emailResult.message });
            }
        }
    });
});

module.exports = router;


// // Function to send bulk emails to all users
// const sendBulkEmails = () => {
//     const sql = 'SELECT email FROM customer_details';  // Adjust the query to get all emails
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.error('Error fetching users:', err);
//             return;
//         }

//         const emails = result.rows.map(row => row.email);  // Assuming result.rows contains email data

//         // Loop over each email and send the email
//         emails.forEach(email => {
//             const mailOptions = {
//                 from: 'your.email@gmail.com',
//                 to: email,
//                 subject: 'Hello from our platform!',
//                 text: 'This is a notification from our platform.',
//                 html: '<p>This is a <b>notification</b> from our platform.</p>',
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error('Error sending email:', error);
//                 } else {
//                     console.log('Email sent to ' + email + ': ' + info.response);
//                 }
//             });
//         });
//     });
// };

// // Call this function to send emails
// sendBulkEmails();
