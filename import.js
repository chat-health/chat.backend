var _ = require('underscore');
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


// To add a new COLLECTION please put in an if else that reads the json into jsonObject
if (COLLECTION === "services") {
    jsonObject = fs.readFileSync('./test_data/services.json', 'utf8');
} else if (COLLECTION === "clients") {
    jsonObject = fs.readFileSync('./test_data/clients.json', 'utf8');    
} else if (COLLECTION === "workers") {
    jsonObject = fs.readFileSync('./test_data/workers.json', 'utf8');
} else if (COLLECTION === "households") {
    jsonObject = fs.readFileSync('./test_data/households.json', 'utf8');
} else if (COLLECTION === "health_themes") {
    jsonObject = fs.readFileSync('./test_data/healthThemes.json', 'utf8');
} else if (COLLECTION === "videos") {
    jsonObject = fs.readFileSync('./test_data/videos.json', 'utf8');
} else if (COLLECTION === "videos_accessed") {
    jsonObject = fs.readFileSync('./test_data/videosAccessed.json', 'utf8');
} else if (COLLECTION === "resources") {
    jsonObject = fs.readFileSync('./test_data/resources.json', 'utf8');
} else if (COLLECTION === "resources_accessed") {
    jsonObject = fs.readFileSync('./test_data/resourcesAccessed.json', 'utf8');
} else if (COLLECTION === "health_selects") {
    jsonObject = fs.readFileSync('./test_data/healthSelects.json', 'utf8');
} else if (COLLECTION === "page_assessment1") {
    jsonObject = fs.readFileSync('./test_data/pageAssessment1.json', 'utf8');
} else if (COLLECTION === "vaccines") {
    jsonObject = fs.readFileSync('./test_data/vaccines.json', 'utf8');
} else if (COLLECTION === "vaccines_recorded") {
    jsonObject = fs.readFileSync('./test_data/vaccinesRecorded.json', 'utf8');
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


var array = JSON.parse(jsonObject);

var date = new Date();

_.each(array, function(doc){
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

    // set current dates (created_at and modified_at)
    doc.created_at = date;
    doc.modified_at = date;
    
    // write the json data
    var jsonObj = JSON.stringify(doc);
    reqPost.write(jsonObj);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });
});
