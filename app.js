var express = require('express');
var app = express();
var _ = require('underscore');
var routes = require("./routes");
var auth = require("./auth");  


app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "90ndsj9dfdsf"}));
  app.use("/auth",auth.verfiyGoogleToken);
  app.use(auth.verifyClientToken);
  app.use(app.router);
  // app.set('view engine', 'jade');
  // app.use(express.static(__dirname + '/public'));
  // app.use(express.errorHandler());
  // everyauth.helpExpress(app);
});

routes(app);

app.listen(process.env.PORT || 8000);