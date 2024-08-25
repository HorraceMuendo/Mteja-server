// // daraja.js
// const axios = require('axios');

// const consumerKey = wIuzPXCrn1QE9xc8unvw7J33PIZJBLGJiHEk6Sr67Z9amtBd
// const consumerSecret = p9fOXDHVxK12KIRvrTr8tlUGfhUKeeXGeQiHAPbRDJICbFdbxY8jry4UmCVhbwzy
// const shortCode = 174379
// const passkey = bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
                

// async function getOAuthToken() {
//     const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
//     const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
//         headers: {
//             Authorization: `Basic ${auth}`
//         }
//     });
//     return response.data.access_token;
// }

// async function initiatePayment(amount, phone) {
//     const token = await getOAuthToken();
//     const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
//     const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

//     const data = {
//         BusinessShortCode: 174379,
//         Password: password,
//         Timestamp: timestamp,
//         TransactionType: 'CustomerPayBillOnline',
//         Amount: amount,
//         PartyA: phone,
//         PartyB: shortCode,
//         PhoneNumber: phone,
//         CallBackURL: 'https://your-callback-url.com/callback',
//         AccountReference: 'Clubnexa',
//         TransactionDesc: 'Payment for goods'
//     };

//     try {
//         const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', data, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// }

// module.exports = { initiatePayment };

