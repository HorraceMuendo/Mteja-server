// daraja.js
const axios = require('axios');

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const shortCode = process.env.SHORT_CODE;
const passkey = process.env.PASSKEY;

async function getOAuthToken() {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${auth}`
        }
    });
    return response.data.access_token;
}

async function initiatePayment(amount, phone) {
    const token = await getOAuthToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const data = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: 'https://your-callback-url.com/callback',
        AccountReference: 'Clubnexa',
        TransactionDesc: 'Payment for goods'
    };

    try {
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

module.exports = { initiatePayment };

