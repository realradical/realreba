import * as functions from 'firebase-functions';
const FieldValue = require("firebase-admin").firestore.FieldValue;
const {db} = require('./admin');
const express = require('express');
const cors = require('cors');
const appProcessOrder = express();
const sendgridemail = require('@sendgrid/mail');

// TODO: Remember to set api key using >> firebase functions:config:set sendgrid.apikey="SECRET_SENDGRID_APIKEY_HERE"
const MY_SENDGRID_API_KEY = functions.config().sendgrid.apikey;
sendgridemail.setApiKey(MY_SENDGRID_API_KEY);

const allowedOrigins = ['http://localhost:3000', 'https://realreba-c557f.firebaseapp.com', 'https://authwork.com'];

function processorder(req, res) {
    const body = req.body;
    const processOrders = body.processOrders;
    let emailList = [];

    Promise.all(processOrders.map(async (order) => {
        const {orderId, result} = order;
        const updateOrderCall = db.collection("orders").doc(orderId).update({status: "processed"});
        const createProcessedCall = db.collection("processedOrders").doc(orderId).set({
            legit: result,
            processedAt: FieldValue.serverTimestamp()
        });

        db.collection("orders").doc(orderId).get()
            .then(doc => {
               emailList.push({
                   email: doc.data().userEmail,
                   orderid: orderId
               });
            });

        return Promise.all([updateOrderCall,createProcessedCall]);
    })
    ).then(() => {
        Promise.all(emailList.map(async (email) => {
            const msg = {
                to: email.email,
                from: 'noreply@authwork.com',
                subject: 'Your authentication report - OrderID: ' + email.orderid,
                html: "<p>Hello,</p>\n" +
                    "<p>Follow this link to see your authentication report.</p>\n" +
                    "<p><a href=\"https://authwork.com/report/" + email.orderid + "\">Please click HERE</a></p>\n" +
                    "<p>Thanks,</p>\n" +
                    "<p>AuthWork</p>"
            };
            const sendEmail = sendgridemail.send(msg);
            return sendEmail;
            })
        ).then( value => {
                send(res, 200, {
                    message: 'Success'
                });
            }
        ).catch(err => {
            console.log("SendEmail: " + err);
            send(res, 500, {
                error: err.message,
            });
        })
    }).catch(err => {
        console.log("Firestore-UpdateOrder&ProcessedOrder: " + err);
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



appProcessOrder.use(cors({
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

appProcessOrder.post('/', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        processorder(req, res);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});

module.exports = functions.https.onRequest(appProcessOrder);