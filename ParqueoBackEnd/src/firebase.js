require('dotenv').config();

const {initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
 
initializeApp({
    credential: applicationDefault()
    // cerdential: admin.credential.cert('../Firebase.json')
});

const db = getFirestore();

module.exports = {
    db,
}