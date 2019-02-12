const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//
//
//
// take text from and endpoing and put it in the real time database.
// // Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
  	//Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console
  	return res.redirect(303, snapshot.ref.toString());
  });
});


exports.update_database = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const path = req.query.path;
  const data = req.query.data;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  var updates = {}
  updates[path]=data;
  res.send();
  return admin.database().ref('/test/').update(updates)
 
});

