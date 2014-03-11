var express = require('express');
var app = express();
// app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT
var everyauth = require('everyauth');
var _ = require('underscore');
var routes = require("./routes");

// everyauth.twitter
//   .consumerKey('OExJ9lyDkQlaedNVB6QQ')
//   .consumerSecret('qDOXx67ArhbiA6fYeGOuxgbMYyph0hiJmMfEDtosc')
//   .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData) {
//     var promise = this.Promise();
//     users.findOrCreateByTwitterData(twitterUserData, accessToken, accessTokenSecret, promise);
//     return promise;
//   })
//   .redirectPath('/');

everyauth.google
  .appId('YOUR CLIENT ID HERE')
  .appSecret('YOUR CLIENT SECRET HERE')
  .scope('https://www.google.com/m8/feeds') // What you want access to
  .handleAuthCallbackError( function (req, res) {
    // If a user denies your app, Google will redirect the user to
    // /auth/facebook/callback?error=access_denied
    // This configurable route handler defines how you want to respond to
    // that.
    // If you do not configure this, everyauth renders a default fallback
    // view notifying the user that their authentication failed and why.
  })
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, googleUserMetadata) {
    var promise = this.Promise();
    console.log(googleUserMetadata);
    return promise;
    // find or create user logic goes here
    // Return a user or Promise that promises a user
    // Promises are created via
    //     var promise = this.Promise();
  })
  .redirectPath('/');

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "90ndsj9dfdsf"}));
  app.use(everyauth.middleware());
  // app.use(app.router);
  // app.set('view engine', 'jade');
  // app.use(express.static(__dirname + '/public'));
  // app.use(express.errorHandler());
  // everyauth.helpExpress(app);
});

routes(app);

app.listen(process.env.PORT || 8000);