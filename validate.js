// clients and households need to have their _ids changed to strings. Can be copied to the server like that

var _ = require('underscore');
var fs = require('fs');

var clientsJson = fs.readFileSync('./test_data/clients.json', 'utf8');
var householdsJson = fs.readFileSync('./test_data/households.json', 'utf8');
var workersJson = fs.readFileSync('./test_data/workers.json', 'utf8');

// check if json is valid
var clientsArray = JSON.parse(clientsJson);
var householdsArray = JSON.parse(householdsJson);
var workersArray = JSON.parse(workersJson);


// check if each client belongs to a household (ie each hh_id referenced in client obj is present in the household collection)
console.log("Validating clients...");
_.each(clientsArray, function(c) {
    if ( !(_.findWhere(householdsArray, {'_id': c.hh_id})) ) {
        console.log("No household found for client id: " + c._id);
    }
});

// check if each household belongs to a worker (ie each worker_id referenced in household obj is present in the workers collection)
console.log("Validating households...");
_.each(householdsArray, function(h) {
    if ( !(_.findWhere(workersArray, {'_id': h.worker_id})) ) {
        console.log("No worker found for household id: " + h._id);
    }
});

// expand me as appropriate...
