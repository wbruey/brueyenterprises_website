const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const language = require('@google-cloud/language');
const cors = require('cors')({
  origin: true,
});
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
    
    const user_count = req.query.user_count;
    const latitude= req.query.latitude;
    const longitude= req.query.longitude;
    

    const options = {
        url: 'https://api.yelp.com/v3/businesses/search?term=meatballs&latitude='+latitude+'&longitude='+longitude+'&limit=1',
        //url: 'https://api.yelp.com/v3/businesses/search?term=meatballs&latitude='+latitude+'&longitude='+longitude+'&limit=1&radius=40000',
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
        return admin.database().ref('/meatball_finder/'+user_count+'/').update(updates);

        
        
    }
    
    request(options,record_response);
    res.send();
           
    
});   

exports.call_google_place = functions.https.onRequest((req, res) => {
    
	return cors(req,res,() => {
	
	const user_count = req.query.user_count;
    const place_name = req.query.place_name;
    const place_address = req.query.place_address;
	var updates ={};
	
	uri_search_string= encodeURIComponent(place_name+ ' '+place_address);
    
	const options = {
        url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+uri_search_string+'&inputtype=textquery&fields=place_id,rating&key=AIzaSyDp-BQoC9wgo6SGya39L81ab09Nz1flUjk',
        //url: 'https://api.yelp.com/v3/businesses/search?term=meatballs&latitude='+latitude+'&longitude='+longitude+'&limit=1&radius=40000',
        method: 'GET',
    };
    
    console.log(options);
    
    function record_response(err,response,body){
        //console.log(error);
        //console.log(response);
        console.log(body);
        
        
        updates['google_place_search']=JSON.parse(body);
		res.send(updates);
        
        console.log(JSON.parse(body));
        return admin.database().ref('/meatball_finder/'+user_count+'/').update(updates);

		
        
    }
    
    request(options,record_response);
	
    });       
    
});   

exports.call_google_details = functions.https.onRequest((req, res) => {
    
	return cors(req,res,() => {
		
		const place_id = req.query.place_id;
		var updates ={};
		const user_count = req.query.user_count;
		
		
		const options = {
			url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+place_id+'&fields=reviews,rating&key=AIzaSyDp-BQoC9wgo6SGya39L81ab09Nz1flUjk',
			//url: 'https://api.yelp.com/v3/businesses/search?term=meatballs&latitude='+latitude+'&longitude='+longitude+'&limit=1&radius=40000',
			method: 'GET',
		};
		
		console.log(options);
		
		function record_response(err,response,body){
			//console.log(error);
			//console.log(response);
			console.log(body);
			updates['reviews']=JSON.parse(body);
			updates['reviews']['sentiments']=[];
			updates['reviews']['passions']=[];
			
			const client = new language.LanguageServiceClient();
			
			var document ={}
			
			for (i =0; i < updates.reviews.result.reviews.length; i++){
				text=updates.reviews.result.reviews[i].text;
				var document = {
				  content: text,
				  type: 'PLAIN_TEXT',
				};
				
				client
				  .analyzeSentiment({document: document})
				  .then(results => {
					const sentiment = results[0].documentSentiment;
					updates.reviews.sentiments.push(sentiment.score);
					updates.reviews.passions.push(sentiment.magnitude);
					console.log(`Text: ${text}`);
					console.log(`Sentiment score: ${sentiment.score}`);
					console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
					
					
				  })
				  .catch(err => {
					console.error('ERROR:', err);
				  });
				
			}
			
		
			
			res.send(updates);
			
			
			console.log(JSON.parse(body));
			return admin.database().ref('/meatball_finder/'+user_count+'/google_place_details/').update(updates);

			
			
		}
		
		request(options,record_response);
	
    });       
    
});   
