var express = require('express');
var app = express();
app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT
var _ = require('underscore');
var routes = require("./routes");

routes(app);

app.listen(process.env.PORT || 8000);