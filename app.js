var express = require('express');
var app = express();
app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT
var routes = require("./routes")(app);

// Objects pushed by tablet
var visits = [];
var attendance = [];


app.listen(process.env.PORT || 8000);
