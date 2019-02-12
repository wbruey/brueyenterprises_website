
const request = require('request');

const options = {  
    url: 'https://api.yelp.com/v3/businesses/search?term=meatballs&latitude=40.7106795&longitude=-74.0087278&limit=1',
    method: 'GET',
    headers: {
        'Authorization':'Bearer 8ZenU1STmxat_twXqcd6wQ9IDKMwVv-UPZINBafEv6t1KPkZKoYk3pgqKDyQFDu692Hg1g_fLzmYLTkX3Pp1njdmsbGN883CTg498J3kC7EL7y217To4ShuIEYNfXHYx'
    }
};

function record_response(err,response,body){
    //console.log(err);
    //console.log(response);
    console.log(body);
    console.log(JSON.parse(body));

    
}

request(options,record_response);


