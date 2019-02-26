import * as functions from 'firebase-functions';
const FieldValue = require("firebase-admin").firestore.FieldValue;
const {db} = require('./admin');
const express = require('express');
const cors = require('cors');
const appProcessOrder = express();

const allowedOrigins = ['http://localhost:3000', 'https://realreba-c557f.firebaseapp.com'];


function processorder(req, res) {
    const body = req.body;
    const processOrders = body.processOrders;

    Promise.all(processOrders.map(async (order) => {
        const {orderId, result} = order;
        const updateOrderCall = db.collection("orders").doc(orderId).update({status: "processed"});
        const createProcessedCall = db.collection("processedOrders").doc(orderId).set({
            legit: result,
            processedAt: FieldValue.serverTimestamp()
        });
        return Promise.all([updateOrderCall,createProcessedCall]);
    })
    ).then(value => {
        send(res, 200, {
            message: 'Success'
        });
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