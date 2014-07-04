var express = require('express');
var app = express();
var _ = require('underscore');
var routes = require("./routes");
var auth = require("./auth");


app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  // to disable security disable these lines
  app.use(express.session({secret: "90ndsj9dfdsf"}));
  app.use("/auth",auth.verifyGoogleToken);
  app.use(auth.verifyClientToken);
  // to disable security disable these lines
  app.use(app.router);
  // app.set('view engine', 'jade');
  // app.use(express.static(__dirname + '/public'));
  // app.use(express.errorHandler());
  // everyauth.helpExpress(app);
});

routes(app);

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT || 8001);
} else {
  app.listen(process.env.PORT || 8000);
}
