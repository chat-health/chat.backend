var express = require('express');
var app = express();
var _ = require('lodash');
app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT

// int id, String first_name, String last_name, int hh_id, String gender
var clients = [
  {_id: 1, first_name: "John", last_name: "Doe", hh_id: 1, gender: "male"},
  {_id: 2, first_name: "Jane", last_name: "Jacobs", hh_id: 1, gender: "female"},
  {_id: 3, first_name: "Davey", last_name: "Jones", hh_id: 1, gender: "male"}
];

var households = [
  { _id : 1, hh_name : "John Doe", community : "snathing", worker_id : 1 },
  { _id : 2, hh_name : "Jason Dobosch", community : "snathing", worker_id : 1 }
];

var workers = [
  { _id : 1, first_name : "colin", last_name : "mccann", password : "chat", role_name : "councelor", assigned_community : "snathing" },
  { _id : 2, first_name : "Armin", last_name : "Krauss", password : "chat", role_name : "volunteer", assigned_community : "snathing" }
];

var services = [
  { _id : 1, name : "B1 Household (Re)Assessment - Checklist (Staff Only)", type : "Material Well Being", role : "Home Care Volunteer" },
  { _id : 2, name : "B2 Emergency Food parcel/voucher provision", type : "Material Well Being", role : "Home Care Volunteer" },
  { _id : 3, name : "B3 Household Equipment provision", type : "Material Well Being", role : "Home Care Volunteer" },
  { _id : 4, name : "B4 Clothing distribution", type : "Material Well Being", role : "Home Care Volunteer" },
  { _id : 5, name : "B5 Blanket / Bedding Distribution", type : "Material Well Being", role : "Home Care Volunteer" },
  { _id : 6, name : "B6 Household Maintenance", type : "Material Well Being", role : "Home Care Volunteer" },
  { _id : 7, name : "B7 Monitoring - Grant Usage", type : "Material Well Being", role : "Home Care Volunteer" },
  { _id : 8, name : "C1 Advise/Assistance in applying for a School Fee Exemption", type : "Cognitive Well Being", role : "Home Care Volunteer" },
  { _id : 9, name : "C2 School Uniform Provision", type : "Cognitive Well Being", role : "Home Care Volunteer" },
  { _id : 10, name : "C3 School Stationary Provision", type : "Cognitive Well Being", role : "Home Care Volunteer" },
  { _id : 11, name : "C4 Monitoring - School Attendance & Performance (School Visits Only)", type : "Cognitive Well Being", role : "Home Care Volunteer" },
  { _id : 12, name : "D1 Caregiver / Family Consultation on Memory Work (A=Accepted or D=Declined)", type : "Emotional Well Being", role : "Home Care Volunteer" },
  { _id : 13, name : "D2 Memory Box Workshop Completed by Caregiver", type : "Emotional Well Being", role : "Home Care Volunteer" },
  { _id : 14, name : "D3 Memory Box Process Started", type : "Emotional Well Being", role : "Home Care Volunteer" },
  { _id : 15, name : "D4 Memory Box Process Completed", type : "Emotional Well Being", role : "Home Care Volunteer" },
  { _id : 16, name : "D5 Monitoring - Emotional Well-being", type : "Emotional Well Being", role : "Home Care Volunteer" },
  { _id : 17, name : "D6 Referral to TCF Welfare Services", type : "Emotional Well Being", role : "Home Care Volunteer" },
  { _id : 19, name : "E1 Monitoring – General Health & Nutrition", type : "Physical Well Being", role : "Home Care Volunteer" },
  { _id : 20, name : "E2 Accompanied Clinic Visit", type : "Physical Well Being", role : "Home Care Volunteer" },
  { _id : 21, name : "E3 Referral – Local Health facility", type : "Physical Well Being", role : "Home Care Volunteer" },
  { _id : 22, name : "E4 Referral – TCF Health Services", type : "Physical Well Being", role : "Home Care Volunteer" },
  { _id : 23, name : "S2 Advise/Assistance in applying for a Identity Document", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 24, name : "S2 Advise/Assistance in applying for a Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 25, name : "S3 Advise/Assistance in applying for a Full Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 26, name : "S4 Advise/Assistance in applying for a Sexual Offences Clearance Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 27, name : "S5 Advise/Assistance in applying for a Pension", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 28, name : "S6 Advise/Assistance in applying for a Care Dependency Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 29, name : "S7 Advise/Assistance in applying for a Child Support Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 30, name : "S8 Advise/Assistance in applying for a Disability Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 31, name : "T3 Documents Received - Identity Document", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 32, name : "T3 Documents Received - Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 33, name : "T3 Documents Received - Full Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 34, name : "T4 Documents Received - Sexual Offences Clearance Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 35, name : "T5 Other Grants received - Pension", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 36, name : "T6 Other Grants received - Care Dependency", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 37, name : "T7 Other Grants received - Child Support Grants", type : "Documents, Grants and Status", role : "Home Care Volunteer" },
  { _id : 38, name : "T8 Other Grants received - Disability Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer" }
];

var visits = [];


app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('This will be the API used by the CHAT Android app for data syncing.\n Add /workers to retrieve all worker records. More to come');
});

app.get('/clients', function(req, res) {
  res.json(clients);
});

app.get('/client/:id', function(req, res) {
  var client = _.find(clients, function (c) {
    return c._id === parseInt(req.params.id, 10);
  });

  if (client) {
    res.json(client);
  } else {
    res.statusCode = 404;
    return res.send('Error 404: No client record found');
  }
});

app.get('/households', function(req, res) {
  res.json(households);
});

app.get('/household/:id', function(req, res) {
  var household = _.find(households, function (h) {
    return h._id === parseInt(req.params.id, 10);
  });

  if (household) {
    res.json(household);
  } else {
    res.statusCode = 404;
    return res.send('Error 404: No household record found');
  }
});

app.get('/workers', function(req, res) {
  res.json(workers);
});

app.get('/worker/:id', function(req, res) {
  var worker = _.find(workers, function (w) {
    return w._id === parseInt(req.params.id, 10);
  });

  if (worker) {
    res.json(worker);
  } else {
    res.statusCode = 404;
    return res.send('Error 404: No worker record found');
  }
  // if(workers.length <= req.params.id || req.params.id < 0) {
  //   res.statusCode = 404;
  //   return res.send('Error 404: No worker record found found');
  // }

  // var q = workers[req.params.id];
  // res.json(q);
});

app.get('/services', function(req, res) {
  res.json(services);
});

app.get('/service/:id', function(req, res) {
  var service = _.find(services, function (h) {
    return h._id === parseInt(req.params.id, 10);
  });

  if (service) {
    res.json(service);
  } else {
    res.statusCode = 404;
    return res.send('Error 404: No service record found');
  }
});

app.get('/visits', function(req, res) {
  res.json(visits);
});

// app.get('/visits/:id', function(req, res){
//   var visit = _.find(visits, function (v) {
//     return v._id === parseInt(req.params.id, 10);
//   });

//   if (visit) {
//     res.json(visit);
//   } else {
//     res.statusCode = 404;
//     return res.send('Error 404: No visit record found');
//   }
// });

app.post('/visits', function(req, res) {
  // console.log(req);
  // if(!req.body.hasOwnProperty('worker_id') || 
  //    !req.body.hasOwnProperty('hh_id')) {
  //   res.statusCode = 400;
  //   return res.send('Error 400: Post syntax incorrect.');
  // }

  var reqKeys = _.keys(req.body);
  var newVisit = {};

  _.each(reqKeys, function(k) {
    newVisit[k] = req.body[k];
  });

  visits.push(newVisit);
  console.log(visits);

  res.json(true);

  // var newVisit = {
  //   hh_id: req.body.hh_id,
  //   date: req.body.date,
  //   worker_id: 123 (should be an int, right?),
  //   lon: 43.343543,
  //   lat: 79.94949,
  //   start_time: {$date: "2013-11-28 14:00:00"},
  //   start_time: {$date: "2013-11-28 14:00:00"},
  //   resource_accessed: true,
  //   service_accessed: false,
  //   video_accessed: true,
  //   type: "What is the type of a visit?",
  //   resources_accessed: [1, 8, 9],
  //   services_accessed: [],
  //   video_accessed: [1, 5, 39]

  //   author : req.body.author,
  //   text : req.body.text
  // };
  // // console.log(newQuote);
  // quotes.push(newQuote);
  // // console.log(quotes);
  // res.json(true);
});

// app.post('/quote', function(req, res) {
//   // console.log(req);
//   if(!req.body.hasOwnProperty('author') || 
//      !req.body.hasOwnProperty('text')) {
//     res.statusCode = 400;
//     return res.send('Error 400: Post syntax incorrect.');
//   }

//   var newQuote = {
//     author : req.body.author,
//     text : req.body.text
//   };
//   // console.log(newQuote);
//   quotes.push(newQuote);
//   // console.log(quotes);
//   res.json(true);
// });

app.listen(process.env.PORT || 8000);
