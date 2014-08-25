var express = require('express');
var session = require('express-session');
var app = express();
var _ = require('underscore');
var routes = require("./routes");
var auth = require("./auth");

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  // to disable security disable these lines
  app.use(session({ secret: 'chat_Monkey', cookie: { maxAge: 60000 },resave: true,saveUninitialized: true,}));
  app.use(express.session({secret: "90ndsj9dfdsf"}));
  app.use("/auth",auth.verifyGoogleToken);
  app.use(auth.verifyClientToken);
  // add login page
  app.use("/login",auth.loginFn);
  app.use("/dashboard",auth.dashboardFn);
  // to disable security disable these lines
  app.use(app.router);
  // app.set('view engine', 'jade');
  // app.use(express.static(__dirname + '/public'));
  // app.use(express.errorHandler());
  // everyauth.helpExpress(app);
});

routes(app);

// Using NODE_ENV to decide if running as dev or prod
// http://grokbase.com/t/gg/nodejs/123j6pswdg/where-is-node-env-documented
if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT || 8001);
} else {
  app.listen(process.env.PORT || 8000);
}
