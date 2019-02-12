const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
//global.XMLHttpRequest = require("xhr2");
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
  var updates = {};
  updates[path]=data;
  res.send();
  return admin.database().ref('/test/').update(updates);
 
});

exports.call_yelp = functions.https.onRequest((req, res) => {


    const options = {
        url: 'https://api.yelp.com/v3/businesses/search?term=meatballs&latitude=40.7106795&longitude=-74.0087278&limit=1',
        method: 'GET',
        headers: {
            'Authorization':'Bearer 8ZenU1STmxat_twXqcd6wQ9IDKMwVv-UPZINBafEv6t1KPkZKoYk3pgqKDyQFDu692Hg1g_fLzmYLTkX3Pp1njdmsbGN883CTg498J3kC7EL7y217To4ShuIEYNfXHYx'
        }
    };
    
    console.log(options);
    
    function record_response(err,response,body){
        //console.log(error);
        //console.log(response);
        console.log(body);
        
        var updates ={};
        updates['yelp']=JSON.parse(body);
        
        console.log(JSON.parse(body));
        return admin.database().ref('/test/').update(updates);

        
        
    }
    
    request(options,record_response);
    res.send();

    
    
});   


