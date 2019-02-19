const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
admin.firestore().settings( { timestampsInSnapshots: true });

const db = admin.firestore();

const storage = admin.storage();

module.exports = {
    db, storage
}