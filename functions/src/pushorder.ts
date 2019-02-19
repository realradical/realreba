import * as functions from 'firebase-functions';
const sendgridemail = require('@sendgrid/mail');
const express = require('express');
const cors = require('cors');
const appPushOrder = express();

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const MY_SENDGRID_API_KEY = functions.config().sendgrid.apikey;
sendgridemail.setApiKey(MY_SENDGRID_API_KEY);

const allowedOrigins = ['http://localhost:3000', 'https://realreba-c557f.firebaseapp.com'];


function pushorder(req, res) {
    const body = req.body;
    const orderId = body.orderId;
    const fileDownloadURL = body.fileDownloadURL;

    const fileHyperlink = fileDownloadURL.map(item => "<a href=\"" + item + "\">fileDownloadURL</a>");
    const fileDownloadURLString = fileHyperlink.join(" <br> ");

    const msg = {
        to: 'jacob.z.shao@gmail.com',
        from: 'noreply@authwork.com',
        subject: 'Payment Success - OrderID: ' + orderId,
        html: fileDownloadURLString,
    };

    sendgridemail.send(msg).then( () => {
            send(res, 200, {
                message: 'Success',
            });
        }
    ).catch(err => {
        console.log("SendEmail: " + err);
        send(res, 500, {
            error: err.message,
        });
    });
}

function send(res, code, body) {
    res.status(code).json({
        statusCode: code,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: body,
    });
}



appPushOrder.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

appPushOrder.post('/', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        pushorder(req, res);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});

module.exports = functions.https.onRequest(appPushOrder);