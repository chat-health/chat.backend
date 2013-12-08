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
  { _id : 1, name : "B1 Household (Re)Assessment - Checklist (Staff Only)", type : "Material Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 2, name : "B2 Emergency Food parcel/voucher provision", type : "Material Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 3, name : "B3 Household Equipment provision", type : "Material Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 4, name : "B4 Clothing distribution", type : "Material Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 5, name : "B5 Blanket / Bedding Distribution", type : "Material Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 6, name : "B6 Household Maintenance", type : "Material Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 7, name : "B7 Monitoring - Grant Usage", type : "Material Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 8, name : "C1 Advise/Assistance in applying for a School Fee Exemption", type : "Cognitive Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 9, name : "C2 School Uniform Provision", type : "Cognitive Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 10, name : "C3 School Stationary Provision", type : "Cognitive Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 11, name : "C4 Monitoring - School Attendance & Performance (School Visits Only)", type : "Cognitive Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 13, name : "D2 Memory Box Workshop Completed by Caregiver", type : "Emotional Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 14, name : "D3 Memory Box Process Started", type : "Emotional Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 15, name : "D4 Memory Box Process Completed", type : "Emotional Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 16, name : "D5 Monitoring - Emotional Well-being", type : "Emotional Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 17, name : "D6 Referral to TCF Welfare Services", type : "Emotional Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 19, name : "E1 Monitoring – General Health & Nutrition", type : "Physical Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 20, name : "E2 Accompanied Clinic Visit", type : "Physical Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 21, name : "E3 Referral – Local Health facility", type : "Physical Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 22, name : "E4 Referral – TCF Health Services", type : "Physical Well Being", role : "Home Care Volunteer", instructions : null },
  { _id : 23, name : "S2 Advise/Assistance in applying for a Identity Document", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 24, name : "S2 Advise/Assistance in applying for a Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 25, name : "S3 Advise/Assistance in applying for a Full Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 26, name : "S4 Advise/Assistance in applying for a Sexual Offences Clearance Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 27, name : "S5 Advise/Assistance in applying for a Pension", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 28, name : "S6 Advise/Assistance in applying for a Care Dependency Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 29, name : "S7 Advise/Assistance in applying for a Child Support Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 30, name : "S8 Advise/Assistance in applying for a Disability Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 31, name : "T1 Documents Received - Identity Document", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 32, name : "T2 Documents Received - Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 33, name : "T3 Documents Received - Full Birth Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 34, name : "T4 Documents Received - Sexual Offences Clearance Certificate", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 35, name : "T5 Other Grants Received - Pension", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 36, name : "T6 Other Grants Received - Care Dependency", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 37, name : "T7 Other Grants Received - Child Support Grants", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 38, name : "T8 Other Grants Received - Disability Grant", type : "Documents, Grants and Status", role : "Home Care Volunteer", instructions : null },
  { _id : 100, name : "D1 Caregiver / Family Consultation on Memory Work", type : "Other", role : "Home Care Volunteer", instructions : "A=Accepted or D=Declined" },
  { _id : 101, name : "O1 - Other", type : "Other", role : "Home Care Volunteer", instructions : "Specify" },
  { _id : 39, name : "HA1- Child Immunization Card", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 40, name : "HA2- Clinic Card", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 41, name : "HB1- Ear Discharge / Aches", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 42, name : "HB2- Regular Nose Bleed", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 43, name : "HB4- Significant Weight Loss", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 44, name : "HB4- Poor Appetite", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 45, name : "HB5- Persistent Diarrhoea", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 46, name : "HB6- Skin Rashes", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 47, name : "HB7- Regular & Severe Headaches", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 48, name : "HB8- Persistent Tiredness", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 49, name : "HB9- Night Sweats", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 50, name : "HB10- Regular Coughing (for more than 3 weeks)", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 51, name : "HB11- Regular Coughing (for more than 24 hrs if HIV+)", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 52, name : "HB12- Coughing up spit with blood", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 53, name : "HB15- Swelling Of Limbs", type : "Symptoms", role : "Lay Counsellor", instructions : null },
  { _id : 54, name : "HC1- TB", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 55, name : "HC1B – Previously tested for HIV (NO=N YES = Y)", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 56, name : "HC2- HIV+ But Not On ARV’s", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 57, name : "HC5- HIV+ And On ARV’s", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 58, name : "HC4-1Blood Sugar", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 59, name : "HC5- High or Low Blood Pressure", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 60, name : "HC6- Arthritis", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 61, name : "HC7- Asthma", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 62, name : "HC8- Heart Disease / Disorders", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 63, name : "HC9- Kidney Diseases / Disorders", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 64, name : "HC10- Stiff Joints (Gout)", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 65, name : "HC11- Ulcers", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 66, name : "HC12- Pregnancy / Child Birth", type : "Illnesses", role : "Lay Counsellor", instructions : null },
  { _id : 67, name : "HE1- Physical Health Assessment Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 68, name : "HE2- BP Screening & Testing Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 69, name : "HE6- Sugar screening & testing Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 70, name : "HE4- General Health Education Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 71, name : "HE5- MMC Education Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 72, name : "HE6- SRH Education Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 73, name : "HE7- PMTCT Education Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 74, name : "HE8- HIV Counselling & Testing Offered (if declined ASK *)", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 75, name : "HE9- Pre-Test Counselling Completed (Individuals)", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 76, name : "HE10- Pre-Test Counselling Completed (Couple)", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 77, name : "HE11- Testing Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 78, name : "HE12- Test Results (+/- or Discordant)", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 79, name : "HE13- Post-Test Counselling Completed", type : "Testing and Education", role : "Lay Counsellor", instructions : null },
  { _id : 80, name : "HE14- Referral for Elisa", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 81, name : "HE15- Referral For CD 4 Count (If referred for CD4 count ASK *)", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 82, name : "HE16- Referral For PCR (Children)", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 83, name : "HE17- Referral To Support Group", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 84, name : "HE18- Referral For TB Screening", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 85, name : "HE19- Referral For MMC", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 86, name : "HE20- Referral For SRH", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 87, name : "HE21- Referral For PMTCT", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 88, name : "HE22- Referral for BP/Sugar or Other general health Concerns", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 89, name : "HE28- Referral to TCF Health Staff", type : "Referrals", role : "Lay Counsellor", instructions : null },
  { _id : 90, name : "HE24- Started on prophylaxis", type : "Treatment and Monitoring", role : "Lay Counsellor", instructions : null },
  { _id : 91, name : "HE25- Started on ARV’s", type : "Treatment and Monitoring", role : "Lay Counsellor", instructions : null },
  { _id : 92, name : "HE26- Treatment Compliance Monitoring", type : "Treatment and Monitoring", role : "Lay Counsellor", instructions : null },
  { _id : 102, name : "HB14 - Other symptoms", type : "Other", role : "Lay Counsellor", instructions : "Specify" },
  { _id : 103, name : "HC1B – Previously tested for HIV", type : "Other", role : "Lay Counsellor", instructions : "(NO = N or YES = Y)" },
  { _id : 104, name : "HC1C - If previously tested, WHEN?", type : "Other", role : "Lay Counsellor", instructions : "In last 6 months = < or More than 6 months ago = +" },
  { _id : 105, name : "HC1D - If previously tested, RESULTS?", type : "Other", role : "Lay Counsellor", instructions : "Positive = + or Negative = - or Unknown = U" },
  { _id : 106, name : "HC13 - Other illness or treatment", type : "Other", role : "Lay Counsellor", instructions : "Specify" },
  { _id : 107, name : "HD1 - Rate the overall health of the individual", type : "Other", role : "Lay Counsellor", instructions : "G = good; A = Average; P = Poor" },
  { _id : 108, name : "HE8 - HIV Counselling & Testing Offered and Declined", type : "Other", role : "Lay Counsellor", instructions : "Ask reason for delining" },
  { _id : 109, name : "HE12 - Test Results", type : "Other", role : "Lay Counsellor", instructions : "+/- or Discordant" },
  { _id : 110, name : "HE15 - Referral For CD 4 Count", type : "Other", role : "Lay Counsellor", instructions : "Ask if they would have preferred to have their CD4 count tested at home" },
  { _id : 111, name : "HE27 - Other", type : "Other", role : "Lay Counsellor", instructions : "Specify" }
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

  _.each(req.body, function (v) {
    var reqKeys = _.keys(v);
    var newVisit = {};

    _.each(reqKeys, function(k) {
      newVisit[k] = v[k];
    });

    visits.push(newVisit);
    console.log(visits);  
  });

  

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
