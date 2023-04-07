const admin = require('firebase-admin');
const credentials = require("./credentials.json");

//Firbase credentials certificate
admin.initializeApp({
    credential : admin.credential.cert(credentials)
});

const db = admin.firestore();

//Collections
const Cars = db.collection("cars");

module.exports = {Cars}
