const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');
const nodemailer = require('nodemailer');


// Create a transporter
let transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like 'Yahoo', 'Outlook', etc.
    auth: {
        user: 'your.email@gmail.com', // Your email address
        pass: 'yourpassword' // Your email password or app password
    }
});

// Define the email options for bulk mailing
const sendBulkEmail = (recipientEmails) => {
    let mailOptions = {
        from: 'your.email@gmail.com', // Sender address
        to: recipientEmails, // List of recipients (array of emails)
        subject: 'Hello from Nodemailer', // Subject line
        text: 'This is a bulk email sent from a Node.js application!', // Plain text body
        html: '<p>This is a <b>bulk email</b> sent from a <i>Node.js</i> application!</p>' // HTML body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Bulk email sent: %s', info.messageId);
    });
};

 // Get all user emails from the database for bulk mailing
 const getEmailsSql = 'SELECT email FROM customer_details';
 db.query(getEmailsSql, (err, result) => {
     if (err) {
         console.error('Error fetching emails:', err);
         return res.status(500).json({ error: 'Internal server error. Please try again later.' });
     } else {
         const emails = result.rows.map(row => row.email); // Extract emails from database
         sendBulkEmail(emails); // Send the bulk email
     }
 });


