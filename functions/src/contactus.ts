import * as functions from 'firebase-functions';
const sendgridemail = require('@sendgrid/mail');
const express = require('express');
const cors = require('cors');
const appContactUs = express();
const axios = require('axios');

// TODO: Remember to set api key using >> firebase functions:config:set sendgrid.apikey="SECRET_SENDGRID_APIKEY_HERE"
const MY_SENDGRID_API_KEY = functions.config().sendgrid.apikey;
sendgridemail.setApiKey(MY_SENDGRID_API_KEY);
// TODO: Remember to set secret using >> firebase functions:config:set recapatcha.secret="SECRET_RECAPATCHA_HERE"
const MY_reCAPATCHA_SECRET = functions.config().recapatcha.secret;

const allowedOrigins = ['http://localhost:3000', 'https://realreba-c557f.firebaseapp.com'];

function contactus(req, res) {
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const message = body.message;
    const orderid = body.orderid;
    const recaptchaToken = body.recaptchaToken;

    axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
        params: {
            secret: MY_reCAPATCHA_SECRET,
            response: recaptchaToken
        }
    }).then(response => {
        if (response.data.success && response.data.score > 0.5) {
            let subject = '';
            orderid === '' ? subject = 'Email Received - ' + name : subject = 'Email Received - ' + name + " - OrderID: "
                + orderid;

            const msg = {
                to: 'contact@authwork.com',
                from: {email,name},
                subject: subject,
                text: message
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
        } else {
            send(res, 500, {
                error: "reCAPTCHA finds bots with no user interaction",
            });
        }
    }).catch(err => {
        console.log("reCAPTCHA verification: " + err);
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



appContactUs.use(cors({
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

appContactUs.post('/', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        contactus(req, res);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});

module.exports = functions.https.onRequest(appContactUs);
