// Via http://isolasoftware.it/2012/05/28/call-rest-api-with-node-js/

var https = require('http');
var fs = require('fs');

var services = fs.readFileSync('./test_data/services.json', 'utf8');
var clients = fs.readFileSync('./test_data/clients.json', 'utf8');

// jsonObject = JSON.stringify(services);


// prepare the header
var postheaders = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
};

// the post options
var optionspost = {
    host : '0.0.0.0',
    port : 8000,
    path : '/services',
    method : 'POST',
    headers : postheaders
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST calls');


// =============== do the POST call to write SERVICES ===============
jsonObject = services;

var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);

    res.on('data', function(d) {
        console.info('POST result:\n');
        process.stdout.write(d);
        console.info('\n\nPOST completed');
    });
});

// write the json data
// reqPost.write(jsonObject);
// reqPost.end();
// reqPost.on('error', function(e) {
//     console.error(e);
// });


// =============== do the POST call to write CLIENTS ===============
var optionspost = {
    host : '0.0.0.0',
    port : 8000,
    path : '/clients',
    method : 'POST',
    headers : postheaders
};

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST calls');


// =============== do the POST call to write SERVICES ===============
jsonObject = clients;

var reqPost = https.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);

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
