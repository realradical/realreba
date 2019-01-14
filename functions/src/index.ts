const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://realreba-c557f.firebaseapp.com'];
// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require('stripe')(functions.config().stripe.token);

admin.firestore().settings( { timestampsInSnapshots: true });

async function charge(req, res) {
    const body = req.body;
    const uid = body.uid;
    const token = body.token;
    const itemname = body.itemName;
    const description = body.itemDescription;
    const amount = 500;
    const currency = 'usd';

    try {
        const orderRef = await admin.firestore().collection("orders").doc();
        // const orderRef = await admin.firestore().collection('orders').add({
        //     uid: uid,
        //     createdAt: admin.firestore.FieldValue.serverTimestamp(),
        //     status: 'created'
        // });
        //JSH:Debug EndTime

        // Charge card
        stripe.charges.create({
            amount,
            currency,
            description: 'Authentication Service',
            source: token.id,
            metadata: {orderId: orderRef.id},
        },{
            idempotency_key: orderRef.id
        }).then(async chargeItem => {
            try {
                const updateOrderCall = admin.firestore().collection('orders').doc(orderRef.id).set({
                    uid: uid,
                    status: 'paid',
                    itemName: itemname,
                    description: description,
                }, {merge: true});

                const updatePaymentCall = admin.firestore().collection('payments').doc(orderRef.id).set({
                    uid: uid,
                    charge: chargeItem,
                    token: token,
                });
                await updateOrderCall;
                await updatePaymentCall;
                send(res, 200, {
                    message: 'Success',
                    orderId: orderRef.id
                });
            } catch (err) {
                console.log("Firestore-UpdateOrder&Payment: " + err);
                send(res, 500, {
                    error: err.message,
                });
            }
        }).catch(err => {
            console.log("Stripe-Charge: " + err);
            send(res, 500, {
                error: err.message,
            });
        });

    } catch (err) {
        console.log("Firestore-CreateOrder: " + err);
        send(res, 500, {
            error: err.message,
        });
    }
}

function send(res, code, body) {
    res.status(code).json({
        statusCode: code,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: body,
    });
}

app.use(cors({
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

app.post('/', async (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        await charge(req, res);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});

exports.charge = functions.https.onRequest(app);