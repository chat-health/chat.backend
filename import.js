// grab information from user to be more specific
var argv = require('optimist')
  .usage('Usage:\n\t$0 <collection to populate>')
  .demand(1)
  .argv;

var COLLECTION = argv._[0];

// Via http://isolasoftware.it/2012/05/28/call-rest-api-with-node-js/
var https = require('http');
var fs = require('fs');
var jsonObject;


// To add a new COLLECTION please put in a if else that reads the json into jsonObject
if (COLLECTION === "services") {
    jsonObject = fs.readFileSync('./test_data/services.json', 'utf8');
} else if (COLLECTION === "clients") {
    jsonObject = fs.readFileSync('./test_data/clients.json', 'utf8');    
} else if (COLLECTION === "workers") {
    jsonObject = fs.readFileSync('./test_data/workers.json', 'utf8');
} else if (COLLECTION === "households") {
    jsonObject = fs.readFileSync('./test_data/households.json', 'utf8');
} else {
    console.warn("A unknown collection <"+COLLECTION+"> was choosen.");
    console.error("Exit with error");
    process.exit(1);
}

// prepare the header
var postheaders = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
};

// the post options
var optionspost = {
    host : '0.0.0.0',
    port : 8000,
    path : '/'+COLLECTION,
    method : 'POST',
    headers : postheaders
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST calls');


var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    console.log("headers: ", res.headers);

    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
});

// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});